# SPRAY — Deploy routing (Vercel)

## Architecture

| Role | Repository | Vercel |
|------|------------|--------|
| **Source** (edit & push here) | `momentum-create/spray` | **Must not deploy** |
| **Production Git** | `Seeker-x1/spray` | **Connected** (`sukegawat-1170` team) |

Flow:

```
git push momentum-create/spray main
  → GitHub Actions: sync-to-seeker-vercel.yml
  → git push Seeker-x1/spray main
  → Vercel Production deploy
```

## One-time Vercel setup (required)

Do this in the Vercel project that serves `spray-one.vercel.app` / `www.spray166.com`.

### 1. Git — single repository only

**Settings → Git**

- **Connected repository:** `Seeker-x1/spray` only
- **Disconnect** `momentum-create/spray` if it appears (second connection or wrong repo)

### 2. Ignored Build Step (safety net)

Even if `momentum-create/spray` is re-connected by mistake, builds from that repo are skipped.

**Settings → Git → Ignored Build Step** → Custom command:

```bash
bash scripts/vercel-should-build.sh
```

Script: [`scripts/vercel-should-build.sh`](../scripts/vercel-should-build.sh)

### 3. Production branch

**Settings → Git → Production Branch:** `main`

## One-time GitHub setup (recommended)

On **momentum-create/spray** (organization or repo integrations):

1. **GitHub → momentum-create → Settings → Integrations → Vercel**
2. **Configure** → ensure **`momentum-create/spray` is not selected** (or remove Vercel access for this repo)

This stops Vercel from receiving push events from the source repo.

## CI guard

Workflow [`.github/workflows/verify-deploy-routing.yml`](../.github/workflows/verify-deploy-routing.yml) runs on `momentum-create/spray` only and tests `vercel-should-build.sh` logic.

## Do not

- Import / connect `momentum-create/spray` to the production Vercel project
- Add `git.deploymentEnabled: false` to root `vercel.json` (shared with Seeker mirror and would block production)
- Push to `Seeker-x1/spray` for routine changes (mirror handles it)

## Local mirror (optional)

```powershell
# From SPRAY repo root
.\scripts\push-seeker.ps1
```

Requires `.seeker-keys/seeker_deploy` or `SEEKER_PUSH_TOKEN` in `.env.local`.
