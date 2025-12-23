import { ShopHeader, ShopFooter } from '@/components/shop';
import ProductGrid from '@/components/shop/ProductGrid';
import { getProducts, getCategories } from '@/lib/products';
import Link from 'next/link';

export const metadata = {
    title: 'Shop',
    description: 'Browse our curated collection of premium products at The Everyday Shop.',
};

interface ShopPageProps {
    searchParams: Promise<{
        category?: string;
        search?: string;
        sort?: string;
        page?: string;
    }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams;
    const categoryParam = params.category;
    const searchParam = params.search;
    const sortParam = params.sort || 'featured';
    const pageParam = parseInt(params.page || '1');
    const limitParam = 100; // Increase limit for now or implement proper pagination in getProducts

    const [products, categories] = await Promise.all([
        getProducts({
            search: searchParam,
            category: categoryParam, // Note: This might need adjustment if backend expects ID. For now relying on search/filtering logic in getProducts
            limit: limitParam,
        }),
        getCategories(),
    ]);

    // Client-side sorting for now as backend sort might need more work
    // Or we can rely on backend if we implemented it. The current backend implementation has basic sorting but not full.
    // Let's keep client-side sorting for the returned batch for now, but search is server-side.
    const sortedProducts = [...products];

    // Sort products
    switch (sortParam) {
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'newest':
            // Assuming we have created_at, but we don't in the interface yet.
            // If backend returns robust order, we can skip this.
            // For now, let's just reverse as a proxy or keep client logic if possible.
            sortedProducts.reverse();
            break;
        default:
            break;
    }

    // Pagination (Client-side pagination of the server result for now, unless we fully implement page param in API)
    const ITEMS_PER_PAGE = 12;
    const totalItems = sortedProducts.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const currentPage = Math.max(1, Math.min(pageParam, totalPages || 1));
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Variables are already defined above

    const allCategories = ['All', ...categories];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
            <div className="layout-container flex h-full grow flex-col">
                <ShopHeader />
                <main className="flex-1 pt-20">
                    {/* Page Header */}
                    <section className="bg-gradient-to-b from-shop-primary/5 to-transparent">
                        <div className="mx-auto max-w-7xl px-8 py-16 text-center">
                            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl text-text-light">
                                Our Products
                            </h1>
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                Explore our curated collection of premium products designed to
                                elevate your everyday life.
                            </p>
                        </div>
                    </section>

                    {/* Main Content */}
                    <section className="mx-auto max-w-7xl px-8 py-12">
                        {/* Filters Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-2">
                                {allCategories.map((category) => (
                                    <Link
                                        key={category}
                                        href={`/shop?category=${category}${sortParam !== 'featured' ? `&sort=${sortParam}` : ''}`}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${categoryParam === category || (!categoryParam && category === 'All')
                                            ? 'bg-shop-primary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>

                            {/* Sort Links */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Sort:</span>
                                <div className="flex gap-1 flex-wrap">
                                    {[
                                        { value: 'featured', label: 'Featured' },
                                        { value: 'newest', label: 'Newest' },
                                        { value: 'price-asc', label: 'Price ↑' },
                                        { value: 'price-desc', label: 'Price ↓' },
                                    ].map((sort) => (
                                        <Link
                                            key={sort.value}
                                            href={`/shop?${categoryParam && categoryParam !== 'All' ? `category=${categoryParam}&` : ''}sort=${sort.value}`}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${sortParam === sort.value
                                                ? 'bg-shop-primary text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {sort.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Count */}
                        <p className="text-sm text-gray-500 mb-6">
                            Showing {paginatedProducts.length} of {totalItems} products
                        </p>

                        {/* Products Grid */}
                        <ProductGrid products={paginatedProducts} />

                        {/* Empty State */}
                        {paginatedProducts.length === 0 && (
                            <div className="text-center py-16">
                                <span className="material-symbols-outlined text-6xl text-gray-300">
                                    inventory_2
                                </span>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">
                                    No products found
                                </h3>
                                <p className="mt-2 text-gray-500">
                                    Try adjusting your filters or search terms.
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-12">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Link
                                        key={page}
                                        href={`/shop?page=${page}${categoryParam ? `&category=${categoryParam}` : ''}${sortParam !== 'featured' ? `&sort=${sortParam}` : ''}`}
                                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${currentPage === page
                                            ? 'bg-shop-primary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {page}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>
                </main>
                <ShopFooter />
            </div>
        </div>
    );
}
