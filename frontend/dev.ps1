# Script wrapper para ejecutar bun run dev
# Ejecutar con: .\dev.ps1

$bunPath = "$env:USERPROFILE\.bun\bin\bun.exe"

if (-not (Test-Path $bunPath)) {
    Write-Host "Bun no encontrado. Instalando..." -ForegroundColor Yellow
    powershell -c "irm bun.sh/install.ps1 | iex"
    $bunPath = "$env:USERPROFILE\.bun\bin\bun.exe"
    Start-Sleep -Seconds 2
}

# Agregar Bun al PATH de esta sesión
$env:PATH = "$env:USERPROFILE\.bun\bin;$env:PATH"

# Verificar que las dependencias están instaladas (múltiples formas para compatibilidad)
$nextAvailable = (Test-Path "node_modules\next") -or (Test-Path "node_modules\.bin\next.cmd") -or (Test-Path "node_modules\.bin\next")
if (-not $nextAvailable) {
    Write-Host "Dependencias no instaladas. Instalando..." -ForegroundColor Yellow
    & $bunPath install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error al instalar dependencias. Por favor ejecuta manualmente: bun install" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Iniciando servidor de desarrollo..." -ForegroundColor Green
& $bunPath run dev
