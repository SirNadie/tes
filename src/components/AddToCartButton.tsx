import { useState } from 'react';
import { addCartItem } from '../stores/cartStore';
import type { Product } from '../types';

interface Props {
    product: Product;
    variant?: 'icon' | 'full' | 'card';
}

export default function AddToCartButton({ product, variant = 'card' }: Props) {
    const [added, setAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addCartItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (variant === 'full') {
        return (
            <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex w-full items-center justify-center gap-2 rounded-lg border border-transparent px-8 py-3 text-base font-medium transition-all duration-300 ${added
                        ? 'bg-green-500 text-white'
                        : 'bg-primary text-background-light hover:bg-primary/90'
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
            >
                {added ? (
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
        );
    }

    if (variant === 'icon') {
        return (
            <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center h-10 w-10 rounded-full backdrop-blur-sm cursor-pointer transition-all duration-300 ${added
                        ? 'bg-green-500 text-white'
                        : 'bg-background-light/70 text-text-light hover:bg-background-light hover:scale-110'
                    }`}
            >
                <span className="material-symbols-outlined">
                    {added ? 'check' : 'add'}
                </span>
            </button>
        );
    }

    // Card variant - for ProductCard
    return (
        <button
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${added
                    ? 'bg-green-500 text-white'
                    : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                }`}
        >
            <span className="material-symbols-outlined text-lg">
                {added ? 'check' : 'add_shopping_cart'}
            </span>
            {added ? 'Added!' : 'Add to Cart'}
        </button>
    );
}
