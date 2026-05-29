# Test Seeker PAT (token value is never logged)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

$logPath = Join-Path $root "debug-05c1e9.log"
function Write-DebugLog {
  param([string]$HypothesisId, [string]$Message, [hashtable]$Data)
  $entry = @{
    sessionId    = "05c1e9"
    hypothesisId = $HypothesisId
    location     = "diagnose-seeker-auth.ps1"
    message      = $Message
    data         = $Data
    timestamp    = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    runId        = "diagnose"
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

if (-not $token) {
  Write-Host "NG: SEEKER_PUSH_TOKEN not set (.env.local or env var)"
  Write-DebugLog "H2" "token_missing" @{ hasToken = $false }
  exit 1
}

$isPlaceholder = $token -eq "YOUR_TOKEN" -or $token -match '^\s*YOUR'
Write-DebugLog "H2" "token_shape" @{
  hasToken      = $true
  length        = $token.Length
  isPlaceholder = $isPlaceholder
  isClassic     = $token.StartsWith("ghp_")
  isFineGrained = $token.StartsWith("github_pat_")
}

if ($isPlaceholder) {
  Write-Host "NG: YOUR_TOKEN placeholder detected. Use real ghp_... from Seeker-x1."
  exit 1
}

try {
  $resp = Invoke-WebRequest -Uri "https://api.github.com/repos/Seeker-x1/spray" `
    -Headers @{ Authorization = "Bearer $token"; Accept = "application/vnd.github+json" } `
    -UseBasicParsing
  Write-DebugLog "H3" "api_ok" @{ statusCode = [int]$resp.StatusCode }
  Write-Host "OK: API can access Seeker-x1/spray (HTTP $($resp.StatusCode))"
  exit 0
}
catch {
  $status = $null
  if ($_.Exception.Response) { $status = [int]$_.Exception.Response.StatusCode }
  Write-DebugLog "H3" "api_fail" @{ statusCode = $status }
  if ($status -eq 401) { Write-Host "NG: invalid or expired token (HTTP 401)" }
  elseif ($status -eq 404) { Write-Host "NG: token cannot read Seeker-x1/spray (HTTP 404)" }
  else { Write-Host "NG: API error (HTTP $status)" }
  exit 1
}
