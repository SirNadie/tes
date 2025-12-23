import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
    id: string
    title: string
    price: number
    image: string
    quantity: number
}

interface CartState {
    items: Record<string, CartItem>
    addItem: (item: Omit<CartItem, 'quantity'>) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    getTotalItems: () => number
    getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: {},

            addItem: (item) =>
                set((state) => {
                    const existing = state.items[item.id]
                    return {
                        items: {
                            ...state.items,
                            [item.id]: existing
                                ? { ...existing, quantity: existing.quantity + 1 }
                                : { ...item, quantity: 1 },
                        },
                    }
                }),

            removeItem: (id) =>
                set((state) => {
                    const { [id]: removed, ...rest } = state.items
                    return { items: rest }
                }),

            updateQuantity: (id, quantity) =>
                set((state) => {
                    if (quantity <= 0) {
                        const { [id]: removed, ...rest } = state.items
                        return { items: rest }
                    }
                    return {
                        items: {
                            ...state.items,
                            [id]: { ...state.items[id], quantity },
                        },
                    }
                }),

            clearCart: () => set({ items: {} }),

            getTotalItems: () => {
                const state = get()
                return Object.values(state.items).reduce(
                    (total, item) => total + item.quantity,
                    0
                )
            },

            getTotalPrice: () => {
                const state = get()
                return Object.values(state.items).reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                )
            },
        }),
        {
            name: 'cart-storage',
        }
    )
)
