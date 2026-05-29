import fs from "node:fs";
import path from "node:path";

export type UpdateMode = "quick" | "full" | "images-only";
export type UpdateState = "idle" | "running" | "success" | "failed";

export type UpdateStatus = {
  state: UpdateState;
  mode: UpdateMode;
  startedAt?: string;
  endedAt?: string;
  pid?: number;
  command?: string;
  lastMessage?: string;
  lastExitCode?: number;
  logPath: string;
};

const OPS_DIR = path.join(process.cwd(), ".ops");
const STATUS_PATH = path.join(OPS_DIR, "update-center-status.json");
const LOG_PATH = path.join(OPS_DIR, "update-center.log");
const LOCK_PATH = path.join(OPS_DIR, "update-center.lock");

function ensureOpsDir() {
  fs.mkdirSync(OPS_DIR, { recursive: true });
}

function getDefaultStatus(): UpdateStatus {
  return {
    state: "idle",
    mode: "quick",
    logPath: LOG_PATH,
    lastMessage: "No sync has been started yet.",
  };
}

export function getUpdateStatus(): UpdateStatus {
  ensureOpsDir();
  if (!fs.existsSync(STATUS_PATH)) return getDefaultStatus();
  try {
    const parsed = JSON.parse(fs.readFileSync(STATUS_PATH, "utf8")) as UpdateStatus;
    return { ...parsed, logPath: LOG_PATH };
  } catch {
    return { ...getDefaultStatus(), state: "failed", lastMessage: "Failed to read status file." };
  }
}

export function writeUpdateStatus(status: UpdateStatus) {
  ensureOpsDir();
  fs.writeFileSync(STATUS_PATH, JSON.stringify({ ...status, logPath: LOG_PATH }, null, 2));
}

export function appendUpdateLog(line: string) {
  ensureOpsDir();
  fs.appendFileSync(LOG_PATH, `${line}\n`);
}

export function clearUpdateLog() {
  ensureOpsDir();
  fs.writeFileSync(LOG_PATH, "");
}

export function getUpdateLogTail(maxLines = 120): string[] {
  ensureOpsDir();
  if (!fs.existsSync(LOG_PATH)) return [];
  const allLines = fs.readFileSync(LOG_PATH, "utf8").split(/\r?\n/).filter(Boolean);
  return allLines.slice(-maxLines);
}

export function isProcessRunning(pid: number | undefined): boolean {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

export function commandFromMode(mode: UpdateMode): { args: string[]; display: string } {
  const base = ["scripts/fetch-category-catalog.mjs"];
  if (mode === "quick") {
    return { args: [...base, "--all"], display: "node scripts/fetch-category-catalog.mjs --all" };
  }
  if (mode === "images-only") {
    return {
      args: [...base, "--all", "--images-only"],
      display: "node scripts/fetch-category-catalog.mjs --all --images-only",
    };
  }
  return {
    args: [...base, "--all", "--images"],
    display: "node scripts/fetch-category-catalog.mjs --all --images",
  };
}

export const updateCenterPaths = {
  statusPath: STATUS_PATH,
  logPath: LOG_PATH,
  lockPath: LOCK_PATH,
} as const;

export function acquireUpdateLock(): boolean {
  ensureOpsDir();
  try {
    fs.writeFileSync(LOCK_PATH, String(process.pid), { flag: "wx" });
    return true;
  } catch {
    return false;
  }
}

export function releaseUpdateLock() {
  if (fs.existsSync(LOCK_PATH)) {
    fs.unlinkSync(LOCK_PATH);
  }
}
