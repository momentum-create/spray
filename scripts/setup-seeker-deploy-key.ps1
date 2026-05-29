# Generate Deploy Key for Seeker-x1/spray (Actions secret: SEEKER_DEPLOY_KEY)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$keyDir = Join-Path $root ".seeker-keys"
$privatePath = Join-Path $keyDir "seeker_deploy"
$publicPath = "$privatePath.pub"

New-Item -ItemType Directory -Force -Path $keyDir | Out-Null

if (-not (Test-Path $privatePath)) {
  & ssh-keygen -t ed25519 -f $privatePath -N '""' -C "momentum-create-mirror"
  if ($LASTEXITCODE -ne 0) { throw "ssh-keygen failed (exit $LASTEXITCODE)" }
}

Write-Host ""
Write-Host "=== Step 1: Add Deploy Key on Seeker-x1/spray ==="
Write-Host "https://github.com/Seeker-x1/spray/settings/keys"
Write-Host "Add deploy key | Title: momentum-create-mirror | Allow write access: ON"
Write-Host ""
Write-Host "Public key (copy all lines below):"
Write-Host "----------------------------------------"
Get-Content $publicPath
Write-Host "----------------------------------------"
Write-Host ""
Write-Host "=== Step 2: Add GitHub Actions secret on momentum-create/spray ==="
Write-Host "https://github.com/momentum-create/spray/settings/secrets/actions"
Write-Host "New secret name: SEEKER_DEPLOY_KEY"
Write-Host "Value: entire contents of this file:"
Write-Host "  $privatePath"
Write-Host ""
Write-Host "=== Step 3: Run workflow ==="
Write-Host "Actions > Sync to Seeker (Vercel) > Run workflow"
Write-Host ""
Write-Host "Note: .seeker-keys/ is gitignored. Do not commit the private key."
