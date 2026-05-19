# このリポジトリで post-push フックを有効化する（1回だけ実行）
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

git config core.hooksPath .githooks
git config branch.main.remote origin
git config branch.main.merge refs/heads/main
git config alias.Push "!git push origin main"

$hook = Join-Path $root ".githooks\post-push"
if (-not (Test-Path $hook)) {
  Write-Error "Missing $hook"
}

Write-Host "OK: core.hooksPath = .githooks"
Write-Host "OK: git Push = git push origin main (+ seeker via hook)"
Write-Host ""
Write-Host "Deploy: pnpm push  OR  git Push"
Write-Host "Seeker author: git config user.name Seeker-x1"
