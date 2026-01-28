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

export interface PaginatedProducts {
    items: Product[];
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
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

export async function getProductsPaginated(params?: {
    search?: string;
    category?: string;
    page?: number;
    page_size?: number;
}): Promise<PaginatedProducts> {
    // Try to fetch from API first
    try {
        const searchParams = new URLSearchParams();
        if (params?.search) searchParams.append('search', params.search);
        if (params?.category && params.category !== 'All') {
            searchParams.append('search', params.category);
        }
        if (params?.page) searchParams.append('page', String(params.page));
        if (params?.page_size) searchParams.append('page_size', String(params.page_size));

        const response = await fetch(`${API_URL}/api/products/paginated?${searchParams.toString()}`, {
            next: { revalidate: 60 }, // Cache for 1 minute
        });

        if (response.ok) {
            const apiData = await response.json();
            return {
                items: apiData.items.map((p: ApiProduct) => ({
                    id: String(p.id),
                    title: p.name,
                    price: p.price,
                    image: p.image_url || 'https://placehold.co/600x400?text=No+Image',
                    category: p.category ? p.category.name : 'General',
                    description: p.description || undefined,
                    features: [],
                })),
                total: apiData.total,
                page: apiData.page,
                page_size: apiData.page_size,
                total_pages: apiData.total_pages,
            };
        }
    } catch {
        // API not available, fallback
    }

    // Fallback: return sample products with pagination
    const page = params?.page || 1;
    const pageSize = params?.page_size || 12;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = sampleProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sampleProducts.length / pageSize);

    return {
        items: paginatedItems,
        total: sampleProducts.length,
        page,
        page_size: pageSize,
        total_pages: totalPages,
    };
}

export async function getProducts(params?: {
    search?: string;
    category?: string;
    sort?: string;
    page?: number;
    limit?: number;
}): Promise<Product[]> {
    try {
        const searchParams = new URLSearchParams();
        if (params?.search) searchParams.append('search', params.search);
        if (params?.category && params.category !== 'All') {
            searchParams.append('search', params.category);
        }
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
        // Fallback to sample products
    }

    return sampleProducts;
}

export async function getProductById(id: string): Promise<Product | null> {
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
        // Fallback to sample products
    }

    return sampleProducts.find((p) => p.id === id) || null;
}

export async function getCategories(): Promise<string[]> {
    // Try to fetch from API first
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await fetch(`${API_URL}/api/categories/`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (response.ok) {
            const apiCategories = await response.json();
            if (apiCategories.length > 0) {
                return apiCategories.map((c: { id: number; name: string }) => c.name);
            }
        }
    } catch {
        // API not available, fallback to sample products
    }

    // Fallback: return categories from sample products
    const products = await getProducts();
    const categories = [...new Set(products.map((p) => p.category))];
    return categories;
}
