#!/usr/bin/env bash
# Vercel "Ignored Build Step" — configure in Project Settings → Git:
#   bash scripts/vercel-should-build.sh
#
# Exit 0 = skip build (no deployment). Exit 1 = proceed with build.
# momentum-create/spray is source-only; production deploys from Seeker-x1/spray.

set -euo pipefail

owner="${VERCEL_GIT_REPO_OWNER:-}"
slug="${VERCEL_GIT_REPO_SLUG:-}"

if [ -z "$owner" ] || [ -z "$slug" ]; then
  echo "vercel-should-build: VERCEL_GIT_REPO_* unset; allowing build (CLI/manual deploy)."
  exit 1
fi

repo="${owner}/${slug}"

if [ "$repo" = "momentum-create/spray" ]; then
  echo "vercel-should-build: skip — ${repo} must not deploy to Vercel."
  echo "Push to main here; sync-to-seeker-vercel.yml mirrors to Seeker-x1/spray."
  exit 0
fi

if [ "$repo" = "Seeker-x1/spray" ]; then
  echo "vercel-should-build: build — ${repo} (production Git source)."
  exit 1
fi

echo "vercel-should-build: skip — unexpected repo ${repo}."
exit 0
