'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/cart';
import { toast } from '@/lib/toast';

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    image: string;
    category?: string;
}

export default function ProductCard({
    id,
    title,
    price,
    image,
    category,
}: ProductCardProps) {
    const [isAdded, setIsAdded] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            addItem({
                id,
                title,
                price,
                image,
            });

            setIsAdded(true);
            toast.success(`${title} added to cart!`);
            setTimeout(() => setIsAdded(false), 2000);
        } catch (error) {
            toast.error('Failed to add item to cart');
        }
    };

    return (
        <motion.div
            layout
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="product-card group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
        >
            {/* Image Container */}
            <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative">
                <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={400}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Link
                        href={`/products/${id}`}
                        className="transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-2 rounded-full font-medium shadow-lg hover:bg-white"
                    >
                        Quick View
                    </Link>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
                {/* Category Badge */}
                {category && (
                    <span className="inline-block text-xs font-medium uppercase tracking-wider text-shop-primary/70 mb-2">
                        {category}
                    </span>
                )}

                {/* Title & Price Row */}
                <div className="flex justify-between items-start gap-3">
                    <h3 className="text-base font-medium text-gray-900 line-clamp-2 leading-snug">
                        <Link
                            href={`/products/${id}`}
                            className="hover:text-shop-primary transition-colors"
                        >
                            {title}
                        </Link>
                    </h3>
                    <p className="text-lg font-semibold text-shop-primary whitespace-nowrap">
                        ${price.toFixed(2)}
                    </p>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-4 relative z-10">
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${isAdded
                            ? 'bg-green-500 text-white'
                            : 'bg-shop-primary/10 text-shop-primary hover:bg-shop-primary hover:text-white'
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg">
                            {isAdded ? 'check' : 'add_shopping_cart'}
                        </span>
                        <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
