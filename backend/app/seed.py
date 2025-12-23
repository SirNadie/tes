import asyncio

from app.core.database import SessionLocal, init_db
from app.models import Product, Category, User
from app.core.security import get_password_hash
from sqlalchemy import select

# Data from frontend/src/lib/products.ts
products_data = [
    {
        "name": "Minimalist Ceramic Vase",
        "description": "A beautifully crafted ceramic vase with clean lines and a matte finish.",
        "price": 45.00,
        "image_url": "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&h=600&fit=crop",
        "category_name": "Home Decor",
        "stock": 50,
        "slug": "minimalist-ceramic-vase"
    },
    {
        "name": "Organic Cotton Throw Blanket",
        "description": "Soft, breathable throw blanket made from 100% organic cotton.",
        "price": 89.00,
        "image_url": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
        "category_name": "Textiles",
        "stock": 30,
        "slug": "organic-cotton-throw-blanket"
    },
    {
        "name": "Handwoven Storage Basket",
        "description": "Natural seagrass basket for stylish organization.",
        "price": 35.00,
        "image_url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop",
        "category_name": "Storage",
        "stock": 100,
        "slug": "handwoven-storage-basket"
    },
    {
        "name": "Scented Soy Candle",
        "description": "Hand-poured soy candle with natural essential oils.",
        "price": 28.00,
        "image_url": "https://images.unsplash.com/photo-1602607434266-18dd653d5f19?w=600&h=600&fit=crop",
        "category_name": "Candles",
        "stock": 200,
        "slug": "scented-soy-candle"
    },
    {
        "name": "Linen Table Runner",
        "description": "Elegant linen table runner for everyday dining.",
        "price": 42.00,
        "image_url": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&h=600&fit=crop",
        "category_name": "Textiles",
        "stock": 45,
        "slug": "linen-table-runner"
    },
    {
        "name": "Wooden Serving Board",
        "description": "Artisan-made acacia wood serving board.",
        "price": 55.00,
        "image_url": "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&h=600&fit=crop",
        "category_name": "Kitchen",
        "stock": 60,
        "slug": "wooden-serving-board"
    },
    {
        "name": "Ceramic Mug Set",
        "description": "Set of 4 handcrafted ceramic mugs.",
        "price": 48.00,
        "image_url": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop",
        "category_name": "Kitchen",
        "stock": 80,
        "slug": "ceramic-mug-set"
    },
    {
        "name": "Natural Reed Diffuser",
        "description": "Long-lasting fragrance with natural rattan reeds.",
        "price": 32.00,
        "image_url": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop",
        "category_name": "Home Fragrance",
        "stock": 150,
        "slug": "natural-reed-diffuser"
    }
]

async def seed():
    await init_db()
    async with SessionLocal() as session:
        # 1. Create Admin User
        print("Checking for admin user...")
        result = await session.execute(select(User).where(User.email == "admin@example.com"))
        user = result.scalar_one_or_none()
        if not user:
            print("Creating admin user...")
            admin_user = User(
                email="admin@example.com",
                hashed_password=get_password_hash("admin123"),
                full_name="Admin User",
                is_active=True,
                is_superuser=True
            )
            session.add(admin_user)
            await session.commit()
            print("Admin user created (admin@example.com / admin123)")
        else:
            print("Admin user already exists.")

        # 2. Create Categories & Products
        print("Seeding products...")
        
        # Get unique categories from data
        category_names = list(set(p['category_name'] for p in products_data))
        categories = {}

        for cat_name in category_names:
            result = await session.execute(select(Category).where(Category.name == cat_name))
            category = result.scalar_one_or_none()
            if not category:
                category = Category(name=cat_name, slug=cat_name.lower().replace(" ", "-"))
                session.add(category)
                await session.commit() # Commit to get ID
                await session.refresh(category)
            categories[cat_name] = category

        # Create Products
        for p_data in products_data:
            result = await session.execute(select(Product).where(Product.slug == p_data['slug']))
            product = result.scalar_one_or_none()
            
            if not product:
                cat = categories[p_data['category_name']]
                new_product = Product(
                    name=p_data['name'],
                    description=p_data['description'],
                    price=p_data['price'],
                    image_url=p_data['image_url'],
                    stock=p_data['stock'],
                    slug=p_data['slug'],
                    category_id=cat.id,
                    is_active=True
                )
                session.add(new_product)
        
        await session.commit()
        print(f"Seeded {len(products_data)} products.")

if __name__ == "__main__":
    asyncio.run(seed())
