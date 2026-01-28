# Script para iniciar el proyecto completo (Frontend + Backend)
# Ejecutar con: .\start-dev.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Iniciando The Everyday Shop" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Bun está instalado
$bunPath = "$env:USERPROFILE\.bun\bin\bun.exe"
if (-not (Test-Path $bunPath)) {
    Write-Host "Bun no encontrado. Instalando Bun..." -ForegroundColor Yellow
    powershell -c "irm bun.sh/install.ps1 | iex"
    $bunPath = "$env:USERPROFILE\.bun\bin\bun.exe"
    Start-Sleep -Seconds 2
}

# Verificar si las dependencias del frontend están instaladas
if (-not (Test-Path "frontend\node_modules") -or -not (Test-Path "frontend\node_modules\.bin\next.cmd")) {
    Write-Host "Instalando dependencias del frontend..." -ForegroundColor Yellow
    Set-Location frontend
    Write-Host "Ejecutando: bun install" -ForegroundColor Cyan
    & $bunPath install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error al instalar dependencias. Por favor ejecuta manualmente:" -ForegroundColor Red
        Write-Host "  cd frontend" -ForegroundColor Yellow
        Write-Host "  bun install" -ForegroundColor Yellow
        Set-Location ..
        exit 1
    }
    Set-Location ..
}

# Verificar si las dependencias del backend están instaladas
Write-Host "Verificando dependencias del backend..." -ForegroundColor Yellow
Set-Location backend
python -m pip install -q -r requirements.txt 2>$null
Set-Location ..

Write-Host ""
Write-Host "Iniciando servicios..." -ForegroundColor Green
Write-Host ""

# Iniciar Backend en una nueva ventana
Write-Host "Backend: http://localhost:8000" -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host 'Iniciando Backend (FastAPI)...' -ForegroundColor Green; python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

# Esperar un poco para que el backend inicie
Start-Sleep -Seconds 3

# Iniciar Frontend
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Magenta
Set-Location frontend

# Verificar que next está disponible (múltiples formas para compatibilidad)
$nextAvailable = (Test-Path "node_modules\next") -or (Test-Path "node_modules\.bin\next.cmd") -or (Test-Path "node_modules\.bin\next")
if (-not $nextAvailable) {
    Write-Host "Error: Next.js no está instalado correctamente." -ForegroundColor Red
    Write-Host "Por favor ejecuta manualmente:" -ForegroundColor Yellow
    Write-Host "  cd frontend" -ForegroundColor Yellow
    Write-Host "  bun install" -ForegroundColor Yellow
    Set-Location ..
    exit 1
}

# Agregar Bun al PATH de esta sesión si no está
$env:PATH = "$env:USERPROFILE\.bun\bin;$env:PATH"

# Ejecutar con Bun
& $bunPath run dev
