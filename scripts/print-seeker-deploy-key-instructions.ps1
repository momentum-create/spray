# Print how to copy the private key for GitHub Secret (ASCII only)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$key = Join-Path $root ".seeker-keys\seeker_deploy"
if (-not (Test-Path $key)) {
  Write-Host "Run: pnpm run setup:seeker-deploy"
  exit 1
}
$bytes = (Get-Item $key).Length
Write-Host "Private key file: $key"
Write-Host "File size: $bytes bytes (expect about 400+ for ed25519)"
Write-Host ""
Write-Host "Open in Notepad, Ctrl+A, Ctrl+C, paste into GitHub Secret SEEKER_DEPLOY_KEY."
Write-Host "Must include lines:"
Write-Host "  -----BEGIN OPENSSH PRIVATE KEY-----"
Write-Host "  -----END OPENSSH PRIVATE KEY-----"
Write-Host ""
Write-Host "Public key for Seeker Deploy keys page:"
Get-Content "$key.pub"
