import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.core.security import get_current_user
from app.models import Order, OrderItem, User
from app.schemas import OrderCreate, OrderResponse, OrderUpdate

router = APIRouter(prefix="/orders", tags=["Orders"])


def generate_order_number() -> str:
    """Generate a unique order number."""
    return f"ORD-{uuid.uuid4().hex[:8].upper()}"


@router.get("/", response_model=list[OrderResponse])
async def list_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    status_filter: Optional[str] = Query(None, alias="status"),
    customer_id: Optional[int] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List all orders with optional filtering."""
    query = select(Order).options(selectinload(Order.items))
    
    if status_filter:
        query = query.where(Order.status == status_filter)
    if customer_id is not None:
        query = query.where(Order.customer_id == customer_id)
    
    query = query.order_by(Order.created_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/count")
async def count_orders(
    status_filter: Optional[str] = Query(None, alias="status"),
    db: AsyncSession = Depends(get_db),
):
    """Get total order count."""
    query = select(func.count(Order.id))
    if status_filter:
        query = query.where(Order.status == status_filter)
    result = await db.execute(query)
    return {"count": result.scalar()}


@router.get("/stats")
async def get_order_stats(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get order statistics."""
    # Total orders
    total_result = await db.execute(select(func.count(Order.id)))
    total = total_result.scalar() or 0
    
    # By status
    statuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
    stats = {"total": total}
    
    for status_name in statuses:
        result = await db.execute(
            select(func.count(Order.id)).where(Order.status == status_name)
        )
        stats[status_name] = result.scalar() or 0
    
    return stats


@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get a single order by ID."""
    result = await db.execute(
        select(Order)
        .options(selectinload(Order.items))
        .where(Order.id == order_id)
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    order_data: OrderCreate,
    db: AsyncSession = Depends(get_db),
):
    """Create a new order."""
    # Create order
    order = Order(
        order_number=generate_order_number(),
        customer_id=order_data.customer_id,
        status=order_data.status,
        total=order_data.total,
        subtotal=order_data.subtotal,
        tax=order_data.tax,
        shipping_cost=order_data.shipping_cost,
        shipping_address=order_data.shipping_address,
        billing_address=order_data.billing_address,
        notes=order_data.notes,
    )
    db.add(order)
    await db.flush()  # Get the order ID
    
    # Create order items
    for item_data in order_data.items:
        item = OrderItem(
            order_id=order.id,
            product_id=item_data.product_id,
            quantity=item_data.quantity,
            price=item_data.price,
        )
        db.add(item)
    
    await db.commit()
    
    # Refresh with items
    result = await db.execute(
        select(Order)
        .options(selectinload(Order.items))
        .where(Order.id == order.id)
    )
    return result.scalar_one()


@router.patch("/{order_id}", response_model=OrderResponse)
async def update_order(
    order_id: int,
    order_data: OrderUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update an order (status, notes)."""
    result = await db.execute(
        select(Order)
        .options(selectinload(Order.items))
        .where(Order.id == order_id)
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    update_data = order_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(order, field, value)
    
    await db.commit()
    await db.refresh(order)
    return order
