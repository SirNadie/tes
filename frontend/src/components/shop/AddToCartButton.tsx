'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart';
import type { Product } from '@/lib/products';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const [isAdded, setIsAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
            });
        }

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-l-lg"
                    >
                        <span className="material-symbols-outlined text-lg">remove</span>
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-r-lg"
                    >
                        <span className="material-symbols-outlined text-lg">add</span>
                    </button>
                </div>
            </div>

            {/* Add to Cart Button */}
            <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-medium text-lg transition-all duration-300 ${isAdded
                        ? 'bg-green-500 text-white'
                        : 'bg-shop-primary text-white hover:opacity-90'
                    }`}
            >
                <span className="material-symbols-outlined">
                    {isAdded ? 'check' : 'add_shopping_cart'}
                </span>
                <span>{isAdded ? 'Added to Cart!' : 'Add to Cart'}</span>
            </button>
        </div>
    );
}
