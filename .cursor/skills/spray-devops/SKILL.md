---
name: spray-devops
description: >-
  SPRAY Vercel・Seeker mirror・GitHub Actions。workflow 変更は implementer。
  公式: verification-loop。PR時は Cursor babysit。
---

# SPRAY — DevOps & Release

## エージェント定義

`.claude/agents/devops-release/agent.md`  
README: Vercel モノレポ・`momentum-create/spray` → `Seeker-x1/spray` mirror

## 主要パス

- `vercel.json`（Root = リポジトリルート）
- `.github/workflows/sync-to-seeker-vercel.yml`
- `scripts/push.ps1`

## 公式スキル

| スキル | パス |
|--------|------|
| verification-loop | `~/.claude/skills/verification-loop/SKILL.md` |

```bash
# 日常・CI: lockfile 厳守
pnpm install --frozen-lockfile
# または apps/web で npm ci（Vercel と同じ）

pnpm typecheck
pnpm build
```

`vercel.json` の `installCommand` は `npm ci`（`apps/web`）。CI/本番で `npm install` は使わない。

## Cursor 組み込み（PR・CI）

| スキル | パス |
|--------|------|
| babysit | `~/.cursor/skills-cursor/babysit/SKILL.md` |
| split-to-prs | `~/.cursor/skills-cursor/split-to-prs/SKILL.md` |

## 禁止

- Secret 値のコミット
- workflow / `vercel.json` のゲートなし編集
