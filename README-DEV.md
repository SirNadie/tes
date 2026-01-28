# Guía de Desarrollo - The Everyday Shop

## Requisitos Previos

- **Bun** (gestor de paquetes y runtime de JavaScript) - **REQUERIDO**
- **Python 3.8+** (para el backend)
- ~~**Node.js**~~ (ya no necesario, Bun lo reemplaza completamente)

## Instalación Inicial

### 1. Instalar Bun (si no está instalado)

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

### 2. Instalar Dependencias

#### Frontend
```powershell
cd frontend
bun install
```

#### Backend
```powershell
cd backend
python -m pip install -r requirements.txt
```

## Ejecutar en Desarrollo

### Opción 1: Script Automático (Recomendado)

Ejecuta ambos servicios (frontend + backend) con un solo comando:

```powershell
.\start-dev.ps1
```

Este script:
- ✅ Verifica e instala Bun si es necesario
- ✅ Instala dependencias faltantes
- ✅ Inicia el backend en http://localhost:8000
- ✅ Inicia el frontend en http://localhost:3000

### Opción 2: Manual

#### Terminal 1 - Backend
```powershell
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Terminal 2 - Frontend
```powershell
cd frontend
bun run dev
```

## URLs de Desarrollo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs (Swagger)**: http://localhost:8000/docs
- **API Docs (ReDoc)**: http://localhost:8000/redoc

## Comandos Útiles con Bun

### Frontend
```powershell
# Desarrollo
bun run dev

# Build de producción
bun run build

# Iniciar servidor de producción
bun run start

# Linting
bun run lint
```

### Backend
```powershell
# Desarrollo con recarga automática
python -m uvicorn app.main:app --reload

# Producción
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Ventajas de Usar Bun

- ⚡ **Más rápido**: Bun es significativamente más rápido que npm/yarn (hasta 10x más rápido)
- 🔄 **Sin problemas de caché**: No tiene restricciones de modo offline como npm
- 📦 **100% Compatible**: Funciona con todos los paquetes de npm sin cambios
- 🚀 **Mejor rendimiento**: Optimizado para desarrollo moderno con mejor rendimiento
- 🎯 **Todo-en-uno**: Runtime, bundler, test runner y gestor de paquetes
- 🔒 **Lockfile binario**: `bun.lockb` es más rápido y eficiente que `package-lock.json`

## Solución de Problemas

### Error: "Bun no encontrado"
Ejecuta: `powershell -c "irm bun.sh/install.ps1 | iex"`

### Error: "Dependencias no instaladas"
Ejecuta: `cd frontend && bun install`

### Error: "Puerto ya en uso"
- Frontend: Cambia el puerto con `bun run dev -- -p 3001`
- Backend: Cambia el puerto con `--port 8001`
