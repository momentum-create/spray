# リポジトリルートで: pnpm push または .\scripts\push.ps1
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root
git push origin main
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
