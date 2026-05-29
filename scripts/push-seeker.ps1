# Seeker-x1/spray へ main を push（Vercel 用）
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

$logPath = Join-Path $root "debug-05c1e9.log"
function Write-DebugLog {
  param([string]$HypothesisId, [string]$Message, [hashtable]$Data)
  $entry = @{
    sessionId    = "05c1e9"
    hypothesisId = $HypothesisId
    location     = "push-seeker.ps1"
    message      = $Message
    data         = $Data
    timestamp    = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    runId        = "push-seeker"
  } | ConvertTo-Json -Compress
  Add-Content -Path $logPath -Value $entry -Encoding utf8
}

$token = $env:SEEKER_PUSH_TOKEN
if (-not $token -and (Test-Path (Join-Path $root ".env.local"))) {
  Get-Content (Join-Path $root ".env.local") | ForEach-Object {
    if ($_ -match '^\s*SEEKER_PUSH_TOKEN\s*=\s*(.+)\s*$') {
      $token = $matches[1].Trim().Trim('"').Trim("'")
    }
  }
}

$deployKey = Join-Path $root ".seeker-keys\seeker_deploy"
if (Test-Path $deployKey) {
  Write-DebugLog "H-deploy-key" "push_via_ssh" @{ keyFile = ".seeker-keys/seeker_deploy" }
  $env:GIT_SSH_COMMAND = "ssh -i `"$deployKey`" -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"
  git push git@github.com:Seeker-x1/spray.git main
  $code = $LASTEXITCODE
  Write-DebugLog "H-deploy-key" "push_done" @{ exitCode = $code; method = "ssh" }
  if ($code -eq 0) {
    Write-Host "OK: Seeker-x1/spray updated via Deploy Key (Vercel will deploy)."
    exit 0
  }
  Write-Host "SSH push failed. Register the public key on Seeker-x1/spray Deploy keys, or use PAT in .env.local"
  exit $code
}

if (-not $token -or $token -eq "YOUR_TOKEN") {
  Write-Host ""
  Write-Host "SEEKER_PUSH_TOKEN が未設定です。"
  Write-Host "1) Seeker-x1 → Settings → Developer settings → Tokens (classic) → repo"
  Write-Host "2) リポジトリ直下に .env.local を作成:"
  Write-Host "   SEEKER_PUSH_TOKEN=ghp_xxxxxxxx"
  Write-Host "3) もう一度: pnpm run push:seeker"
  Write-Host ""
  Write-Host "または Deploy Key 方式: pnpm run setup:seeker-deploy"
  Write-DebugLog "H2" "abort_no_token" @{ hasToken = $false }
  exit 1
}

& (Join-Path $root "scripts\diagnose-seeker-auth.ps1")
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$env:GIT_TERMINAL_PROMPT = "0"
$header = "AUTHORIZATION: bearer $token"
Write-DebugLog "H1" "push_start" @{ method = "bearer_header" }

git -c "http.https://github.com/.extraheader=$header" push https://github.com/Seeker-x1/spray.git main
$code = $LASTEXITCODE
Write-DebugLog "H1" "push_done" @{ exitCode = $code }

if ($code -ne 0) {
  Write-Host ""
  Write-Host "push 失敗。Windows に別アカウントの GitHub 認証が残っている可能性があります:"
  Write-Host "  cmdkey /delete:git:https://github.com"
  Write-Host "その後もう一度 pnpm run push:seeker"
  exit $code
}

Write-Host "OK: Seeker-x1/spray の main を更新しました（Vercel がデプロイします）"
