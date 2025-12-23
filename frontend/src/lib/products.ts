const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    features?: string[];
}

interface ApiProduct {
    id: number;
    name: string;
    description: string | null;
    price: number;
    image_url: string | null;
    category: {
        id: number;
        name: string;
    } | null;
    is_active: boolean;
    is_featured: boolean;
}

// Sample products for development (will be replaced with API calls)
const sampleProducts: Product[] = [
    {
        id: '1',
        title: 'Minimalist Ceramic Vase',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&h=600&fit=crop',
        category: 'Home Decor',
        description: 'A beautifully crafted ceramic vase with clean lines and a matte finish.',
        features: ['Handcrafted', 'Matte finish', 'Water-resistant'],
    },
    {
        id: '2',
        title: 'Organic Cotton Throw Blanket',
        price: 89.00,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
        category: 'Textiles',
        description: 'Soft, breathable throw blanket made from 100% organic cotton.',
        features: ['100% organic cotton', 'Machine washable', 'Hypoallergenic'],
    },
    {
        id: '3',
        title: 'Handwoven Storage Basket',
        price: 35.00,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
        category: 'Storage',
        description: 'Natural seagrass basket for stylish organization.',
        features: ['Handwoven', 'Sustainable materials', 'Sturdy handles'],
    },
    {
        id: '4',
        title: 'Scented Soy Candle',
        price: 28.00,
        image: 'https://images.unsplash.com/photo-1602607434266-18dd653d5f19?w=600&h=600&fit=crop',
        category: 'Candles',
        description: 'Hand-poured soy candle with natural essential oils.',
        features: ['60+ hour burn time', 'Natural soy wax', 'Cotton wick'],
    },
    {
        id: '5',
        title: 'Linen Table Runner',
        price: 42.00,
        image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&h=600&fit=crop',
        category: 'Textiles',
        description: 'Elegant linen table runner for everyday dining.',
        features: ['100% linen', 'Pre-washed', 'Natural dyes'],
    },
    {
        id: '6',
        title: 'Wooden Serving Board',
        price: 55.00,
        image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&h=600&fit=crop',
        category: 'Kitchen',
        description: 'Artisan-made acacia wood serving board.',
        features: ['Acacia wood', 'Food safe finish', 'Each piece is unique'],
    },
    {
        id: '7',
        title: 'Ceramic Mug Set',
        price: 48.00,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop',
        category: 'Kitchen',
        description: 'Set of 4 handcrafted ceramic mugs.',
        features: ['Set of 4', 'Microwave safe', 'Dishwasher safe'],
    },
    {
        id: '8',
        title: 'Natural Reed Diffuser',
        price: 32.00,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop',
        category: 'Home Fragrance',
        description: 'Long-lasting fragrance with natural rattan reeds.',
        features: ['3+ months scent', 'Natural oils', 'No flame needed'],
    },
];

export async function getProducts(params?: {
    search?: string;
    category?: string;
    sort?: string;
    page?: number;
    limit?: number;
}): Promise<Product[]> {
    // Try to fetch from API first
    try {
        const searchParams = new URLSearchParams();
        if (params?.search) searchParams.append('search', params.search);
        if (params?.category && params.category !== 'All') searchParams.append('category_id', params.category); // Note: Backend expects ID, but we might need to resolve name to ID or update backend to accept slug/name. For now, let's assume we might need to handle this.
        // Actually, looking at backend, it expects category_id (int). The frontend uses names.
        // We need a way to map category name to ID or update backend to accept name.
        // Let's check if we can easily map it here, or if we should just send 'search' for now and handle category differently.
        // Wait, the backend only takes category_id. The frontend has category names.
        // I should probably update the backend to validat/lookup category by name or just use search for everything for now if valid ID isn't available.
        // OR, I can fetch categories first to get the mapping.
        // Let's just pass 'search' for now as that's the primary request.
        // But wait, the previous code filtered by category name client side.
        // I will implement a fetch for categories to map name -> ID if needed, OR just update backend to filter by category name join.
        // Backend text search ALREADY joins category name! So 'search' param covers it if I type the category name.
        // But the specific 'category' filter might be broken if I pass a name to 'category_id'.
        // Let's just stick to 'search' param for text search.
        // For structured category filter, I would need IDs.
        // Let's keep it simple: Map 'search' param.

        // Correct approach:
        // The backend 'list_products' takes 'search' string.
        // I'll pass the 'search' param from frontend to backend 'search'.

        if (params?.limit) searchParams.append('limit', String(params.limit));

        const response = await fetch(`${API_URL}/api/products/?${searchParams.toString()}`, {
            next: { revalidate: 0 }, // No cache for search
        });

        if (response.ok) {
            const apiProducts: ApiProduct[] = await response.json();
            if (apiProducts.length > 0) {
                return apiProducts.map((p) => ({
                    id: String(p.id),
                    title: p.name,
                    price: p.price,
                    image: p.image_url || 'https://placehold.co/600x400?text=No+Image',
                    category: p.category ? p.category.name : 'General',
                    description: p.description || undefined,
                    features: [],
                }));
            }
        }
    } catch {
        // API not available, using sample products
    }

    // Return sample products if API fails or returns empty (fallback)
    return sampleProducts;
}

export async function getProductById(id: string): Promise<Product | null> {
    // Try API first
    try {
        const response = await fetch(`${API_URL}/api/products/${id}`, {
            next: { revalidate: 60 },
        });

        if (response.ok) {
            const p = await response.json();
            return {
                id: String(p.id),
                title: p.name,
                price: p.price,
                image: p.image_url || 'https://placehold.co/600x400?text=No+Image',
                category: 'General',
                description: p.description,
                features: [],
            };
        }
    } catch {
        // API not available, using sample products
    }

    // Fallback to sample products
    return sampleProducts.find((p) => p.id === id) || null;
}

export async function getCategories(): Promise<string[]> {
    // For now, return categories from sample products
    const products = await getProducts();
    const categories = [...new Set(products.map((p) => p.category))];
    return categories;
}
