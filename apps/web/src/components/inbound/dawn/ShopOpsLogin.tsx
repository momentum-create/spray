"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ShopOpsLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/shop-ops/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "認証に失敗しました");
        return;
      }
      router.refresh();
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm border border-[#e8e8e8] p-6">
      <h2 className="text-lg font-medium text-black">運用ページへのアクセス</h2>
      <p className="mt-2 text-sm text-black/60">パスワードを入力してください。</p>
      <label className="mt-4 block text-xs uppercase tracking-wide text-black/50">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full border border-[#e8e8e8] px-3 py-2 text-sm text-black"
          autoComplete="current-password"
          required
        />
      </label>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="dawn-btn-primary mt-4 w-full text-sm disabled:opacity-50"
      >
        {loading ? "確認中…" : "ログイン"}
      </button>
    </form>
  );
}
