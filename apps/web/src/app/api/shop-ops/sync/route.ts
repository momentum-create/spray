import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { spawn, type ChildProcess } from "node:child_process";
import fs from "node:fs";
import {
  SHOP_OPS_COOKIE,
  isShopOpsProtectionEnabled,
  isShopOpsSessionValid,
} from "@/lib/inbound/shop-ops-auth";
import {
  acquireUpdateLock,
  appendUpdateLog,
  clearUpdateLog,
  commandFromMode,
  getUpdateStatus,
  isProcessRunning,
  releaseUpdateLock,
  updateCenterPaths,
  writeUpdateStatus,
  type UpdateMode,
} from "@/lib/inbound/update-center";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

async function assertAuthorized(): Promise<boolean> {
  if (!isShopOpsProtectionEnabled()) return true;
  const cookieStore = await cookies();
  const token = cookieStore.get(SHOP_OPS_COOKIE)?.value;
  return isShopOpsSessionValid(token);
}

export async function GET() {
  if (!(await assertAuthorized())) return unauthorized();

  const status = getUpdateStatus();
  if (status.state === "running" && !isProcessRunning(status.pid)) {
    const fixed = {
      ...status,
      state: "failed" as const,
      endedAt: new Date().toISOString(),
      lastMessage: "Process exited unexpectedly.",
      lastExitCode: -1,
    };
    writeUpdateStatus(fixed);
    return NextResponse.json(fixed);
  }
  return NextResponse.json(status);
}

export async function POST(request: Request) {
  if (!(await assertAuthorized())) return unauthorized();

  let body: { mode?: UpdateMode };
  try {
    body = (await request.json()) as { mode?: UpdateMode };
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const mode: UpdateMode = body.mode ?? "quick";
  if (!["quick", "full", "images-only"].includes(mode)) {
    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  }

  const current = getUpdateStatus();
  if (current.state === "running" && isProcessRunning(current.pid)) {
    return NextResponse.json(
      { error: "A sync is already running.", status: current },
      { status: 409 },
    );
  }
  if (!acquireUpdateLock()) {
    return NextResponse.json({ error: "Another sync request is being prepared." }, { status: 409 });
  }

  const cmd = commandFromMode(mode);
  clearUpdateLog();
  appendUpdateLog(`[${new Date().toISOString()}] Starting ${cmd.display}`);
  const logStream = fs.createWriteStream(updateCenterPaths.logPath, { flags: "a" });
  const startedAt = new Date().toISOString();

  let child: ChildProcess;
  try {
    child = spawn("node", cmd.args, {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown spawn error";
    appendUpdateLog(`[${new Date().toISOString()}] Spawn failed: ${message}`);
    releaseUpdateLock();
    logStream.end();
    return NextResponse.json({ error: "Failed to start sync process." }, { status: 500 });
  }

  child.stdout?.pipe(logStream);
  child.stderr?.pipe(logStream);
  child.on("error", (err) => {
    const now = new Date().toISOString();
    appendUpdateLog(`[${now}] Spawn failed: ${err.message}`);
    writeUpdateStatus({
      state: "failed",
      mode,
      startedAt,
      endedAt: now,
      pid: child.pid,
      command: cmd.display,
      lastMessage: "Sync process could not start.",
      lastExitCode: -1,
      logPath: updateCenterPaths.logPath,
    });
    releaseUpdateLock();
    logStream.end();
  });
  child.on("close", (code) => {
    const success = code === 0;
    const now = new Date().toISOString();
    const latest = getUpdateStatus();
    appendUpdateLog(`[${now}] Finished with code ${code ?? -1}`);
    writeUpdateStatus({
      state: success ? "success" : "failed",
      mode,
      startedAt: latest.startedAt ?? now,
      endedAt: now,
      pid: child.pid,
      command: cmd.display,
      lastMessage: success ? "Sync completed." : "Sync failed. Check logs.",
      lastExitCode: code ?? -1,
      logPath: updateCenterPaths.logPath,
    });
    releaseUpdateLock();
    logStream.end();
  });

  writeUpdateStatus({
    state: "running",
    mode,
    startedAt,
    pid: child.pid,
    command: cmd.display,
    lastMessage: "Sync running...",
    logPath: updateCenterPaths.logPath,
  });

  return NextResponse.json({ ok: true, mode, pid: child.pid, command: cmd.display });
}
