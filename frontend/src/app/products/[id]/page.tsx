import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShopHeader, ShopFooter } from '@/components/shop';
import AddToCartButton from '@/components/shop/AddToCartButton';
import { getProductById, getProducts } from '@/lib/products';

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((product) => ({
        id: product.id,
    }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        return { title: 'Product Not Found' };
    }

    return {
        title: product.title,
        description: product.description || `Shop ${product.title} at The Everyday Shop`,
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
            <div className="layout-container flex h-full grow flex-col">
                <ShopHeader />
                <main className="flex-1 pt-20">
                    <section className="mx-auto max-w-7xl px-8 py-12">
                        {/* Breadcrumbs */}
                        <nav className="mb-8">
                            <ol className="flex items-center gap-2 text-sm text-gray-500">
                                <li>
                                    <Link href="/" className="hover:text-shop-primary transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                                </li>
                                <li>
                                    <Link href="/shop" className="hover:text-shop-primary transition-colors">
                                        Shop
                                    </Link>
                                </li>
                                <li>
                                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                                </li>
                                <li className="text-gray-900 font-medium">{product.title}</li>
                            </ol>
                        </nav>

                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                            {/* Product Image */}
                            <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={600}
                                    height={600}
                                    className="h-full w-full object-cover"
                                    priority
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col justify-center">
                                <span className="inline-block text-sm font-medium uppercase tracking-wider text-shop-primary/70 mb-2">
                                    {product.category}
                                </span>
                                <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl text-text-light">
                                    {product.title}
                                </h1>
                                <p className="mt-4 text-3xl font-semibold text-shop-primary">
                                    ${product.price.toFixed(2)}
                                </p>
                                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                                    {product.description || 'A high-quality product designed for everyday use.'}
                                </p>

                                {/* Features */}
                                {product.features && product.features.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
                                        <ul className="space-y-2">
                                            {product.features.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2 text-gray-600">
                                                    <span className="material-symbols-outlined text-shop-primary text-lg">
                                                        check_circle
                                                    </span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Add to Cart */}
                                <div className="mt-8">
                                    <AddToCartButton product={product} />
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <ShopFooter />
            </div>
        </div>
    );
}
