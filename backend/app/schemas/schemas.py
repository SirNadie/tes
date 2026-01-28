from datetime import datetime
from typing import Optional, Generic, TypeVar, List
from pydantic import BaseModel, EmailStr

# Generic type for paginated responses
T = TypeVar('T')

class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    page_size: int
    total_pages: int

# ============ User Schemas ============
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: str = "admin"
    is_active: bool = True


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


# ============ Customer Schemas ============
class CustomerBase(BaseModel):
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None


class CustomerCreate(CustomerBase):
    pass


class CustomerResponse(CustomerBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ============ Category Schemas ============
class CategoryBase(BaseModel):
    name: str
    slug: Optional[str] = None
    description: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    id: int

    class Config:
        from_attributes = True


# ============ Product Schemas ============
class ProductBase(BaseModel):
    name: str
    slug: Optional[str] = None
    description: Optional[str] = None
    price: float
    compare_at_price: Optional[float] = None
    cost: Optional[float] = 0
    sku: Optional[str] = None
    stock: int = 0
    image_url: Optional[str] = None
    images: list[str] = []
    category_id: Optional[int] = None
    is_active: bool = True
    is_featured: bool = False


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    compare_at_price: Optional[float] = None
    cost: Optional[float] = None
    sku: Optional[str] = None
    stock: Optional[int] = None
    image_url: Optional[str] = None
    images: Optional[list[str]] = None
    category_id: Optional[int] = None
    is_active: Optional[bool] = None
    is_featured: Optional[bool] = None


class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime
    category: Optional[CategoryResponse] = None

    class Config:
        from_attributes = True


# ============ Order Item Schemas ============
class OrderItemBase(BaseModel):
    product_id: int
    quantity: int
    price: float


class OrderItemCreate(OrderItemBase):
    pass


class OrderItemResponse(OrderItemBase):
    id: int
    product: Optional[ProductResponse] = None

    class Config:
        from_attributes = True


# ============ Order Schemas ============
class OrderBase(BaseModel):
    customer_id: int
    status: str = "pending"
    subtotal: float
    tax: float = 0
    shipping_cost: float = 0
    total: float
    shipping_address: Optional[str] = None
    billing_address: Optional[str] = None
    notes: Optional[str] = None


class OrderCreate(OrderBase):
    items: list[OrderItemCreate]


class OrderUpdate(BaseModel):
    status: Optional[str] = None
    shipping_address: Optional[str] = None
    billing_address: Optional[str] = None
    notes: Optional[str] = None


class OrderResponse(OrderBase):
    id: int
    order_number: str
    created_at: datetime
    updated_at: datetime
    customer: Optional[CustomerResponse] = None
    items: list[OrderItemResponse] = []

    class Config:
        from_attributes = True


# ============ Analytics Schemas ============
class StatsResponse(BaseModel):
    total_revenue: float
    total_orders: int
    avg_order_value: float
    active_customers: int


class RevenueDataPoint(BaseModel):
    date: str
    revenue: float
    orders: int


class TopProductResponse(BaseModel):
    product_id: int
    product_name: str
    total_sold: int
    total_revenue: float
