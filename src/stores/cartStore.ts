import { persistentAtom } from '@nanostores/persistent';

export interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

export type CartStore = Record<string, CartItem>;

// Use persistentAtom to save the entire cart object as a JSON string
export const cartItems = persistentAtom<CartStore>('cart', {}, {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export function addCartItem(item: Omit<CartItem, 'quantity'>) {
    const currentItems = cartItems.get();
    const existingItem = currentItems[item.id];

    if (existingItem) {
        cartItems.set({
            ...currentItems,
            [item.id]: {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            }
        });
    } else {
        cartItems.set({
            ...currentItems,
            [item.id]: {
                ...item,
                quantity: 1,
            }
        });
    }
}

export function removeCartItem(id: string) {
    const currentItems = cartItems.get();
    const { [id]: _, ...rest } = currentItems;
    cartItems.set(rest);
}

export function updateCartItemQuantity(id: string, quantity: number) {
    const currentItems = cartItems.get();
    const existingItem = currentItems[id];

    if (existingItem) {
        if (quantity <= 0) {
            removeCartItem(id);
        } else {
            cartItems.set({
                ...currentItems,
                [id]: {
                    ...existingItem,
                    quantity,
                }
            });
        }
    }
}

export function clearCart() {
    cartItems.set({});
}
