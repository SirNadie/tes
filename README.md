# NexusStore E-commerce Platform

Plataforma de e-commerce moderna con dashboard administrativo.

> **Nota:** Este proyecto usa [Bun](https://bun.sh) como gestor de paquetes y runtime. Ver [README-DEV.md](./README-DEV.md) para más detalles sobre el desarrollo.

## Estructura del Proyecto

```
tes/
├── api/                 # Entry point de Vercel (Python)
├── backend/             # FastAPI backend
│   ├── app/
│   │   ├── api/         # Rutas de la API
│   │   ├── core/        # Configuración y utilidades
│   │   ├── models/      # Modelos SQLAlchemy
│   │   └── schemas/     # Schemas Pydantic
│   └── requirements.txt
├── frontend/            # Next.js 16 frontend
│   ├── src/
│   │   ├── app/         # App Router pages
│   │   ├── components/  # Componentes React
│   │   └── lib/         # Utilidades y stores
│   └── package.json
└── vercel.json          # Configuración de Vercel
```

## Inicio Rápido

### Backend (FastAPI)
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend (Next.js con Bun)
```bash
cd frontend
bun install
bun run dev
```

**Nota:** Este proyecto usa [Bun](https://bun.sh) como gestor de paquetes. Si no lo tienes instalado:
```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

## API Endpoints

- **Auth**: `/api/auth/login`, `/api/auth/register`, `/api/auth/me`
- **Products**: `/api/products/` (CRUD)
- **Orders**: `/api/orders/` (CRUD)
- **Customers**: `/api/customers/` (CRUD)
- **Analytics**: `/api/analytics/stats`, `/api/analytics/revenue`, `/api/analytics/top-products`

## Documentación API

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
