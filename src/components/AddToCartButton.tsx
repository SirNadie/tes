import { addCartItem } from '../stores/cartStore';
import type { Product } from '../data/products';

interface Props {
    product: Product;
    variant?: 'icon' | 'full';
}

export default function AddToCartButton({ product, variant = 'icon' }: Props) {
    const handleAddToCart = () => {
        addCartItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
        });
        // Optional: Add a toast notification here
        alert('Added to cart!');
    };

    if (variant === 'full') {
        return (
            <button
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-background-light hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
                Add to cart
            </button>
        );
    }

    return (
        <button
            onClick={handleAddToCart}
            className="add-to-cart absolute bottom-24 right-4 flex items-center justify-center h-10 w-10 rounded-full bg-background-light/70 backdrop-blur-sm text-text-light hover:bg-background-light cursor-pointer z-10"
        >
            <span className="material-symbols-outlined">add</span>
        </button>
    );
}
