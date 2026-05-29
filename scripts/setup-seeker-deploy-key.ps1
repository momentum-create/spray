# Seeker-x1/spray 用 Deploy Key を生成（Actions 用 SEEKER_DEPLOY_KEY の初回セットアップ）
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$keyDir = Join-Path $root ".seeker-keys"
$privatePath = Join-Path $keyDir "seeker_deploy"
$publicPath = "$privatePath.pub"

New-Item -ItemType Directory -Force -Path $keyDir | Out-Null

if (-not (Test-Path $privatePath)) {
  ssh-keygen -t ed25519 -f $privatePath -N '""' -C "momentum-create-mirror"
}

Write-Host ""
Write-Host "=== 1. Seeker-x1/spray に Deploy Key を登録 ==="
Write-Host "https://github.com/Seeker-x1/spray/settings/keys"
Write-Host "Add deploy key → Title: momentum-create-mirror → Allow write access: ON"
Write-Host ""
Write-Host "Public key (コピー):"
Write-Host "----------------------------------------"
Get-Content $publicPath
Write-Host "----------------------------------------"
Write-Host ""
Write-Host "=== 2. momentum-create/spray の Secret ==="
Write-Host "https://github.com/momentum-create/spray/settings/secrets/actions"
Write-Host "New secret: SEEKER_DEPLOY_KEY"
Write-Host "Value: 次のファイルの中身をすべてコピー"
Write-Host "  $privatePath"
Write-Host ""
Write-Host "=== 3. Actions を実行 ==="
Write-Host "Actions → Sync to Seeker (Vercel) → Run workflow"
Write-Host ""
Write-Host "※ .seeker-keys/ は gitignore 済み。private key をコミットしないでください。"
