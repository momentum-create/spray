# Seeker 認証の切り分け（トークン本体はログに出さない）
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

$logPath = Join-Path $root "debug-05c1e9.log"
function Write-DebugLog {
  param([string]$HypothesisId, [string]$Message, [hashtable]$Data)
  $entry = @{
    sessionId  = "05c1e9"
    hypothesisId = $HypothesisId
    location   = "diagnose-seeker-auth.ps1"
    message    = $Message
    data       = $Data
    timestamp  = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    runId      = "diagnose"
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

# H2: placeholder / empty
if (-not $token) {
  Write-Host "NG: SEEKER_PUSH_TOKEN 未設定（.env.local または環境変数）"
  Write-DebugLog "H2" "token_missing" @{ hasToken = $false }
  exit 1
}

$prefix = if ($token.Length -ge 4) { $token.Substring(0, [Math]::Min(8, $token.Length)) } else { "short" }
$isPlaceholder = $token -eq "YOUR_TOKEN" -or $token -match '^\s*YOUR'
Write-DebugLog "H2" "token_shape" @{
  hasToken      = $true
  length        = $token.Length
  prefix        = $prefix
  isPlaceholder = $isPlaceholder
  isClassic     = $token.StartsWith("ghp_")
  isFineGrained = $token.StartsWith("github_pat_")
}

if ($isPlaceholder) {
  Write-Host "NG: YOUR_TOKEN のままです。Seeker-x1 の classic PAT (ghp_...) を設定してください。"
  exit 1
}

# H3/H4: API access
try {
  $resp = Invoke-WebRequest -Uri "https://api.github.com/repos/Seeker-x1/spray" `
    -Headers @{ Authorization = "Bearer $token"; Accept = "application/vnd.github+json" } `
    -UseBasicParsing
  Write-DebugLog "H3" "api_ok" @{ statusCode = [int]$resp.StatusCode }
  Write-Host "OK: API で Seeker-x1/spray にアクセスできます (HTTP $($resp.StatusCode))"
  exit 0
}
catch {
  $status = $null
  if ($_.Exception.Response) { $status = [int]$_.Exception.Response.StatusCode }
  Write-DebugLog "H3" "api_fail" @{ statusCode = $status; error = $_.Exception.Message }
  if ($status -eq 401) {
    Write-Host "NG: トークン無効または期限切れ (HTTP 401)"
  }
  elseif ($status -eq 404) {
    Write-Host "NG: このトークンでは Seeker-x1/spray を読めません (HTTP 404)。Seeker-x1 で classic PAT (repo) を作り直してください。"
  }
  else {
    Write-Host "NG: API エラー (HTTP $status)"
  }
  exit 1
}
