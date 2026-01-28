# Script para instalar dependencias del frontend
# Ejecutar con: .\install.ps1

$bunPath = "$env:USERPROFILE\.bun\bin\bun.exe"

if (-not (Test-Path $bunPath)) {
    Write-Host "Bun no encontrado. Instalando..." -ForegroundColor Yellow
    powershell -c "irm bun.sh/install.ps1 | iex"
    $bunPath = "$env:USERPROFILE\.bun\bin\bun.exe"
    Start-Sleep -Seconds 2
}

$env:PATH = "$env:USERPROFILE\.bun\bin;$env:PATH"
& $bunPath install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencias instaladas!" -ForegroundColor Green
} else {
    Write-Host "✗ Error al instalar dependencias" -ForegroundColor Red
}
