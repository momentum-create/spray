"use client";

import { useEffect, useMemo, useState } from "react";

type UpdateMode = "quick" | "full" | "images-only";
type UpdateState = "idle" | "running" | "success" | "failed";

type UpdateStatus = {
  state: UpdateState;
  mode: UpdateMode;
  startedAt?: string;
  endedAt?: string;
  pid?: number;
  command?: string;
  lastMessage?: string;
  lastExitCode?: number;
};

type Props = {
  initialStatus: UpdateStatus;
  initialLogLines: string[];
};

export function ShopUpdateCenter({ initialStatus, initialLogLines }: Props) {
  const [status, setStatus] = useState<UpdateStatus>(initialStatus);
  const [logLines, setLogLines] = useState<string[]>(initialLogLines);
  const [busyMode, setBusyMode] = useState<UpdateMode | null>(null);
  const running = status.state === "running";

  async function refreshStatus() {
    const [statusRes, logRes] = await Promise.all([
      fetch("/api/shop-ops/sync", { cache: "no-store" }),
      fetch("/api/shop-ops/sync/log", { cache: "no-store" }),
    ]);
    if (statusRes.ok) {
      setStatus((await statusRes.json()) as UpdateStatus);
    }
    if (logRes.ok) {
      const data = (await logRes.json()) as { lines: string[] };
      setLogLines(data.lines ?? []);
    }
  }

  async function runSync(mode: UpdateMode) {
    setBusyMode(mode);
    try {
      const res = await fetch("/api/shop-ops/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        alert(data.error ?? "Failed to start sync.");
      }
      await refreshStatus();
    } finally {
      setBusyMode(null);
    }
  }

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      void refreshStatus();
    }, 4000);
    return () => clearInterval(id);
  }, [running]);

  const statusLabel = useMemo(() => {
    if (status.state === "running") return "Running";
    if (status.state === "success") return "Success";
    if (status.state === "failed") return "Failed";
    return "Idle";
  }, [status.state]);

  return (
    <section className="mt-12 border border-[#e8e8e8] bg-[#fcfcfc] p-5">
      <h2 className="text-sm font-medium uppercase tracking-wide text-black">更新センター</h2>
      <p className="mt-2 text-sm text-black/65">
        商品データ更新をこの画面から実行できます。通常は「Quick Sync」、画像更新が必要な時だけ「Full Sync」を使ってください。
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <button
          type="button"
          onClick={() => void runSync("quick")}
          disabled={running || busyMode !== null}
          className="dawn-btn-primary text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busyMode === "quick" ? "Starting..." : "Quick Sync"}
        </button>
        <button
          type="button"
          onClick={() => void runSync("full")}
          disabled={running || busyMode !== null}
          className="dawn-btn-secondary text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busyMode === "full" ? "Starting..." : "Full Sync (+images)"}
        </button>
        <button
          type="button"
          onClick={() => void runSync("images-only")}
          disabled={running || busyMode !== null}
          className="dawn-btn-secondary text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busyMode === "images-only" ? "Starting..." : "Images Only"}
        </button>
        <button type="button" onClick={() => void refreshStatus()} className="dawn-btn-secondary text-sm">
          Refresh
        </button>
      </div>

      <div className="mt-4 grid gap-2 text-xs text-black/70 md:grid-cols-2">
        <p>
          <span className="font-medium">Status:</span> {statusLabel}
        </p>
        <p>
          <span className="font-medium">Mode:</span> {status.mode}
        </p>
        <p>
          <span className="font-medium">Started:</span> {status.startedAt ?? "-"}
        </p>
        <p>
          <span className="font-medium">Ended:</span> {status.endedAt ?? "-"}
        </p>
        <p>
          <span className="font-medium">PID:</span> {status.pid ?? "-"}
        </p>
        <p>
          <span className="font-medium">Message:</span> {status.lastMessage ?? "-"}
        </p>
      </div>

      <div className="mt-4 border border-[#e8e8e8] bg-white p-3">
        <p className="text-xs font-medium uppercase tracking-wide text-black/60">Latest logs</p>
        <pre className="mt-2 max-h-64 overflow-auto text-[11px] leading-relaxed text-black/75">
          {logLines.length ? logLines.join("\n") : "No logs yet."}
        </pre>
      </div>
    </section>
  );
}
