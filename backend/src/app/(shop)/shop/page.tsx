import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import SortDropdown from '@/components/SortDropdown'
import { getProducts, getCategories } from '@/lib/products'

export const metadata = {
    title: 'Shop',
    description: 'Browse our curated collection of premium products at The Everyday Shop.',
}

interface ShopPageProps {
    searchParams: Promise<{
        category?: string
        search?: string
        sort?: string
        page?: string
    }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams
    const [allProducts, categories] = await Promise.all([
        getProducts(),
        getCategories(),
    ])

    const categoryParam = params.category
    const searchParam = params.search
    const sortParam = params.sort || 'featured'
    const pageParam = parseInt(params.page || '1')

    // Filter products
    let products = allProducts

    // Search filter
    if (searchParam && searchParam.trim()) {
        const searchLower = searchParam.toLowerCase()
        products = products.filter(
            (p) =>
                p.title.toLowerCase().includes(searchLower) ||
                p.category.toLowerCase().includes(searchLower) ||
                (p.description && p.description.toLowerCase().includes(searchLower))
        )
    }

    // Category filter
    if (categoryParam && categoryParam !== 'All') {
        products = products.filter(
            (p) => p.category.toLowerCase() === categoryParam.toLowerCase()
        )
    }

    // Sort products
    switch (sortParam) {
        case 'price-asc':
            products = [...products].sort((a, b) => a.price - b.price)
            break
        case 'price-desc':
            products = [...products].sort((a, b) => b.price - a.price)
            break
        case 'name-asc':
            products = [...products].sort((a, b) => a.title.localeCompare(b.title))
            break
        case 'newest':
            products = [...products].reverse()
            break
        default:
            break
    }

    // Pagination
    const ITEMS_PER_PAGE = 12
    const totalItems = products.length
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
    const currentPage = Math.max(1, Math.min(pageParam, totalPages || 1))
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const allCategories = ['All', ...categories]

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <Header />
                <main className="flex-1 pt-20">
                    {/* Page Header */}
                    <section className="bg-gradient-to-b from-primary/5 to-transparent">
                        <div className="mx-auto max-w-7xl px-8 py-16 text-center">
                            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
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
                                    <a
                                        key={category}
                                        href={`/shop?category=${category}${sortParam !== 'featured' ? `&sort=${sortParam}` : ''}`}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${(categoryParam === category || (!categoryParam && category === 'All'))
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {category}
                                    </a>
                                ))}
                            </div>

                            {/* Sort Dropdown */}
                            <SortDropdown
                                currentSort={sortParam}
                                currentCategory={categoryParam}
                            />
                        </div>

                        {/* Product Count */}
                        <p className="text-sm text-gray-500 mb-6">
                            Showing {paginatedProducts.length} of {totalItems} products
                        </p>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {paginatedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    image={product.image}
                                    category={product.category}
                                />
                            ))}
                        </div>

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
                                    <a
                                        key={page}
                                        href={`/shop?page=${page}${categoryParam ? `&category=${categoryParam}` : ''}${sortParam !== 'featured' ? `&sort=${sortParam}` : ''}`}
                                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${currentPage === page
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {page}
                                    </a>
                                ))}
                            </div>
                        )}
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    )
}
