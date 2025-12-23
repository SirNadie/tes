# NexusStore Backend API

FastAPI backend for the NexusStore e-commerce dashboard.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

4. Run the server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/register` - Register new admin user
- `GET /api/auth/me` - Get current user info

### Products
- `GET /api/products/` - List products
- `GET /api/products/{id}` - Get product details
- `POST /api/products/` - Create product (auth required)
- `PATCH /api/products/{id}` - Update product (auth required)
- `DELETE /api/products/{id}` - Delete product (auth required)

### Orders
- `GET /api/orders/` - List orders (auth required)
- `GET /api/orders/{id}` - Get order details (auth required)
- `POST /api/orders/` - Create order
- `PATCH /api/orders/{id}` - Update order (auth required)

### Customers
- `GET /api/customers/` - List customers (auth required)
- `GET /api/customers/{id}` - Get customer details (auth required)
- `POST /api/customers/` - Create customer
- `PATCH /api/customers/{id}` - Update customer (auth required)
- `DELETE /api/customers/{id}` - Delete customer (auth required)

### Analytics
- `GET /api/analytics/stats` - Dashboard statistics (auth required)
- `GET /api/analytics/revenue` - Revenue chart data (auth required)
- `GET /api/analytics/top-products` - Top selling products (auth required)
