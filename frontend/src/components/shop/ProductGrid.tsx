'use client';

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { Product } from '@/lib/products';

interface ProductGridProps {
    products: Product[];
    isLoading?: boolean;
    skeletonCount?: number;
}

export default function ProductGrid({ products, isLoading = false, skeletonCount = 8 }: ProductGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: skeletonCount }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
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
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                    },
                },
            }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                />
            ))}
        </motion.div>
    );
}
