'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/cart'

interface ProductCardProps {
    id: string
    title: string
    price: number
    image: string
    category?: string
}

export default function ProductCard({
    id,
    title,
    price,
    image,
    category,
}: ProductCardProps) {
    const [isAdded, setIsAdded] = useState(false)
    const addItem = useCartStore((state) => state.addItem)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        addItem({
            id,
            title,
            price,
            image,
        })

        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }

    return (
        <div className="product-card group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Image Container */}
            <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <Link
                        href={`/products/${id}`}
                        className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-2 rounded-full font-medium shadow-lg hover:bg-white"
                    >
                        Quick View
                    </Link>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
                {/* Category Badge */}
                {category && (
                    <span className="inline-block text-xs font-medium uppercase tracking-wider text-primary/70 mb-2">
                        {category}
                    </span>
                )}

                {/* Title & Price Row */}
                <div className="flex justify-between items-start gap-3">
                    <h3 className="text-base font-medium text-gray-900 line-clamp-2 leading-snug">
                        <Link
                            href={`/products/${id}`}
                            className="hover:text-primary transition-colors"
                        >
                            {title}
                        </Link>
                    </h3>
                    <p className="text-lg font-semibold text-primary whitespace-nowrap">
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
                            : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg">
                            {isAdded ? 'check' : 'add_shopping_cart'}
                        </span>
                        <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
