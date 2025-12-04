import { useStore } from '@nanostores/react';
import { cartItems } from '../stores/cartStore';
import { useEffect, useState } from 'react';

export default function CartCounter() {
    const $cartItems = useStore(cartItems);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const count = Object.values($cartItems).reduce((acc: number, item: any) => acc + item.quantity, 0);

    // Render 0 on server and initial client render to match hydration
    // Update to actual count only after mounting
    return (
        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-background-light">
            {mounted ? count : 0}
        </span>
    );
}
