'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/cart'
import type { Product } from '@/lib/products'

interface AddToCartButtonFullProps {
    product: Product
}

export default function AddToCartButtonFull({ product }: AddToCartButtonFullProps) {
    const [isAdded, setIsAdded] = useState(false)
    const addItem = useCartStore((state) => state.addItem)

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
        })

        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex w-full items-center justify-center gap-2 rounded-lg border border-transparent px-8 py-3 text-base font-medium transition-all duration-300 ${isAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-background-light hover:bg-primary/90'
                } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
        >
            {isAdded ? (
                <>
                    <span className="material-symbols-outlined text-lg">check</span>
                    Added to Cart!
                </>
            ) : (
                <>
                    <span className="material-symbols-outlined text-lg">shopping_bag</span>
                    Add to Cart
                </>
            )}
        </button>
    )
}
