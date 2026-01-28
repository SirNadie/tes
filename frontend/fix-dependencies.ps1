# Script para instalar/verificar dependencias del frontend
# Ejecutar con: .\fix-dependencies.ps1

$bunPath = "$env:USERPROFILE\.bun\bin\bun.exe"

if (-not (Test-Path $bunPath)) {
    Write-Host "Bun no encontrado. Instalando Bun..." -ForegroundColor Yellow
    powershell -c "irm bun.sh/install.ps1 | iex"
    $bunPath = "$env:USERPROFILE\.bun\bin\bun.exe"
    Start-Sleep -Seconds 2
}

$env:PATH = "$env:USERPROFILE\.bun\bin;$env:PATH"

if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    & $bunPath install
} elseif (-not (Test-Path "node_modules\.bin\next.cmd")) {
    Write-Host "Dependencias incompletas. Reinstalando..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
    & $bunPath install
} else {
    Write-Host "Verificando integridad..." -ForegroundColor Cyan
    & $bunPath install --check
}

if ($LASTEXITCODE -eq 0 -or $LASTEXITCODE -eq $null) {
    Write-Host "✓ Dependencias listas!" -ForegroundColor Green
} else {
    Write-Host "⚠ Error al verificar dependencias. Ejecuta: bun install" -ForegroundColor Yellow
}
