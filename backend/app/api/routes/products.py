import re
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user
from app.models import Product, User, Category
from app.schemas import ProductCreate, ProductResponse, ProductUpdate, PaginatedResponse

router = APIRouter(prefix="/products", tags=["Products"])


def generate_slug(name: str) -> str:
    """Generate a URL-friendly slug from a product name."""
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s_-]+', '-', slug)
    return slug.strip('-')


@router.get("/", response_model=list[ProductResponse])
async def list_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    category_id: Optional[int] = None,
    is_active: Optional[bool] = None,
    is_featured: Optional[bool] = None,
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
):
    """List all products with optional filtering."""
    query = select(Product)
    count_query = select(func.count(Product.id))
    
    # Apply filters to both queries
    if category_id is not None:
        query = query.where(Product.category_id == category_id)
        count_query = count_query.where(Product.category_id == category_id)
    if is_active is not None:
        query = query.where(Product.is_active == is_active)
        count_query = count_query.where(Product.is_active == is_active)
    if is_featured is not None:
        query = query.where(Product.is_featured == is_featured)
        count_query = count_query.where(Product.is_featured == is_featured)
    if search:
        search_lower = f"%{search}%"
        # Use outerjoin to include products without categories
        query = query.outerjoin(Category, Product.category_id == Category.id).where(
            (Product.name.ilike(search_lower)) |
            (Product.description.ilike(search_lower)) |
            (Category.name.ilike(search_lower))
        )
        count_query = count_query.outerjoin(Category, Product.category_id == Category.id).where(
            (Product.name.ilike(search_lower)) |
            (Product.description.ilike(search_lower)) |
            (Category.name.ilike(search_lower))
        )
    
    # Get total count
    total_result = await db.execute(count_query)
    total = total_result.scalar() or 0
    
    # Get paginated results
    query = query.order_by(Product.created_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    products = result.scalars().all()
    
    return products


@router.get("/paginated")
async def list_products_paginated(
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=100),
    category_id: Optional[int] = None,
    is_active: Optional[bool] = None,
    is_featured: Optional[bool] = None,
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
):
    """List products with pagination metadata."""
    skip = (page - 1) * page_size
    
    # Build base query
    query = select(Product)
    count_query = select(func.count(Product.id))
    
    # Apply filters to both queries
    if category_id is not None:
        query = query.where(Product.category_id == category_id)
        count_query = count_query.where(Product.category_id == category_id)
    if is_active is not None:
        query = query.where(Product.is_active == is_active)
        count_query = count_query.where(Product.is_active == is_active)
    if is_featured is not None:
        query = query.where(Product.is_featured == is_featured)
        count_query = count_query.where(Product.is_featured == is_featured)
    if search:
        search_lower = f"%{search}%"
        query = query.outerjoin(Category, Product.category_id == Category.id).where(
            (Product.name.ilike(search_lower)) |
            (Product.description.ilike(search_lower)) |
            (Category.name.ilike(search_lower))
        )
        count_query = count_query.outerjoin(Category, Product.category_id == Category.id).where(
            (Product.name.ilike(search_lower)) |
            (Product.description.ilike(search_lower)) |
            (Category.name.ilike(search_lower))
        )
    
    # Get total count
    total_result = await db.execute(count_query)
    total = total_result.scalar() or 0
    
    # Get paginated results
    query = query.order_by(Product.created_at.desc()).offset(skip).limit(page_size)
    result = await db.execute(query)
    products = result.scalars().all()
    
    total_pages = (total + page_size - 1) // page_size if total > 0 else 0
    
    return PaginatedResponse(
        items=products,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )


@router.get("/count")
async def count_products(
    db: AsyncSession = Depends(get_db),
):
    """Get total product count."""
    result = await db.execute(select(func.count(Product.id)))
    return {"count": result.scalar()}


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: int,
    db: AsyncSession = Depends(get_db),
):
    """Get a single product by ID."""
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_data: ProductCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a new product."""
    # Generate slug if not provided
    slug = product_data.slug or generate_slug(product_data.name)
    
    # Check if slug already exists
    result = await db.execute(select(Product).where(Product.slug == slug))
    if result.scalar_one_or_none():
        # Append a number to make it unique
        base_slug = slug
        counter = 1
        while True:
            slug = f"{base_slug}-{counter}"
            result = await db.execute(select(Product).where(Product.slug == slug))
            if not result.scalar_one_or_none():
                break
            counter += 1
    
    product = Product(
        **product_data.model_dump(exclude={"slug"}),
        slug=slug,
    )
    db.add(product)
    await db.commit()
    await db.refresh(product)
    return product


@router.patch("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: int,
    product_data: ProductUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update a product."""
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(product, field, value)
    
    await db.commit()
    await db.refresh(product)
    return product


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete a product."""
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    await db.delete(product)
    await db.commit()
