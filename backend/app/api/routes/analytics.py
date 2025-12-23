from datetime import datetime, timedelta, timezone
import random

from fastapi import APIRouter, Depends
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user
from app.models import Order, Customer, Product, OrderItem, User
from app.schemas import StatsResponse, RevenueDataPoint, TopProductResponse

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/stats", response_model=StatsResponse)
async def get_dashboard_stats(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get overall dashboard statistics."""
    # Total revenue
    revenue_result = await db.execute(
        select(func.sum(Order.total)).where(Order.status != "cancelled")
    )
    total_revenue = revenue_result.scalar() or 0
    
    # Total orders
    orders_result = await db.execute(select(func.count(Order.id)))
    total_orders = orders_result.scalar() or 0
    
    # Average order value
    avg_order_value = total_revenue / total_orders if total_orders > 0 else 0
    
    # Total customers
    customers_result = await db.execute(select(func.count(Customer.id)))
    total_customers = customers_result.scalar() or 0
    
    # Total products
    products_result = await db.execute(select(func.count(Product.id)))
    total_products = products_result.scalar() or 0
    
    # Pending orders
    pending_result = await db.execute(
        select(func.count(Order.id)).where(Order.status == "pending")
    )
    pending_orders = pending_result.scalar() or 0
    
    # Delivered orders
    delivered_result = await db.execute(
        select(func.count(Order.id)).where(Order.status == "delivered")
    )
    delivered_orders = delivered_result.scalar() or 0
    
    return StatsResponse(
        total_revenue=round(total_revenue, 2),
        total_orders=total_orders,
        average_order_value=round(avg_order_value, 2),
        total_customers=total_customers,
        total_products=total_products,
        pending_orders=pending_orders,
        delivered_orders=delivered_orders,
    )


@router.get("/revenue", response_model=list[RevenueDataPoint])
async def get_revenue_data(
    days: int = 30,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get revenue data for the chart.
    
    Note: For now, returns sample data. In production, this would
    aggregate real order data by day.
    """
    # Generate sample data for demonstration
    # In production, you would query the database for actual revenue per day
    data = []
    base_revenue = 3000
    base_expenses = 1500
    
    for i in range(days, 0, -1):
        date = datetime.now(timezone.utc) - timedelta(days=i)
        # Add some randomness for realistic looking data
        revenue = base_revenue + random.uniform(-500, 1500)
        expenses = base_expenses + random.uniform(-300, 500)
        
        data.append(RevenueDataPoint(
            date=date.strftime("%Y-%m-%d"),
            revenue=round(revenue, 2),
            expenses=round(expenses, 2),
        ))
    
    return data


@router.get("/top-products", response_model=list[TopProductResponse])
async def get_top_products(
    limit: int = 5,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get top selling products."""
    # Get products with most order items
    query = (
        select(
            Product.id,
            Product.name,
            Product.price,
            Product.image_url,
            func.coalesce(func.sum(OrderItem.quantity), 0).label("sold"),
        )
        .outerjoin(OrderItem, Product.id == OrderItem.product_id)
        .group_by(Product.id)
        .order_by(func.sum(OrderItem.quantity).desc().nullslast())
        .limit(limit)
    )
    
    result = await db.execute(query)
    rows = result.all()
    
    return [
        TopProductResponse(
            id=row.id,
            name=row.name,
            price=row.price,
            sold=int(row.sold),
            image_url=row.image_url,
        )
        for row in rows
    ]
