from fastapi import APIRouter

from app.api.routes import auth, products, orders, customers, analytics

api_router = APIRouter(prefix="/api")

api_router.include_router(auth.router)
api_router.include_router(products.router)
api_router.include_router(orders.router)
api_router.include_router(customers.router)
api_router.include_router(analytics.router)
