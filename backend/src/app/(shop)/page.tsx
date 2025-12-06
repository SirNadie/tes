import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import NewsletterForm from '@/components/NewsletterForm'
import { getProducts } from '@/lib/products'

export default async function HomePage() {
    const products = await getProducts()
    const featuredProducts = products.slice(0, 3)

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <Header />
                <main className="flex-1 pt-20">
                    {/* Hero Section */}
                    <section className="mx-auto max-w-7xl px-8 py-20 sm:py-28">
                        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                            <div className="flex flex-col items-start gap-6">
                                <h1 className="font-display text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
                                    Elevate Your Everyday Essentials
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Discover a curated collection of well-designed goods that
                                    bring quality and intention to your daily rituals.
                                </p>
                                <Link
                                    href="/shop"
                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-background-light hover:opacity-90 text-base font-medium leading-normal tracking-wide transition-opacity"
                                >
                                    <span className="truncate">Shop Now</span>
                                </Link>
                            </div>
                            <div className="h-96 w-full overflow-hidden rounded-lg">
                                <Image
                                    alt="A stylish arrangement of everyday objects on a wooden table."
                                    className="h-full w-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4nwW2J4TDBtDTVJd0DF-je-TzxYQU7WFzvskgcz3pp3Eqa72S_O0mkzBT-bt-nYBxvg6WuFhetxCJ6ut6MTdFp9VUKSPcueyGcSNybD647psMoXa29i7o8UwAnuwdmEn8vVcLsJ8ErrqiwnSq1lkZY1Kr6ry2iVIxDLQXIrLxLuGjRC0qh_sOgr_SAV_kkzTqcz4Vw_WjIh3ucS9EcPbfGnZ5b_OuTcccpk-ZnM2b5mMW5bTqh4gNMzv4QOzsXje0HcgbFkjnFYU"
                                    width={600}
                                    height={400}
                                    priority
                                />
                            </div>
                        </div>
                    </section>

                    {/* Featured Products */}
                    <section className="mx-auto max-w-7xl px-8 py-16 sm:py-24">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                                Featured Products
                            </h2>
                            <p className="mt-4 max-w-2xl text-lg text-gray-600">
                                Handpicked items that blend form and function, perfect for the
                                modern home.
                            </p>
                        </div>
                        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredProducts.map((product) => (
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
                        <div className="mt-12 text-center">
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                            >
                                View all products
                                <span className="material-symbols-outlined text-lg">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>
                    </section>

                    {/* Newsletter */}
                    <section className="bg-gray-100">
                        <div className="mx-auto max-w-7xl px-8 py-16 sm:py-24">
                            <div className="relative isolate overflow-hidden rounded-lg bg-primary/10 px-6 py-20 text-center shadow-xl sm:px-16">
                                <h2 className="font-display mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-text-light sm:text-4xl">
                                    Stay in the know
                                </h2>
                                <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-600">
                                    Get 10% off your first order and be the first to hear about
                                    new arrivals.
                                </p>
                                <NewsletterForm />
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    )
}
