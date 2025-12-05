import type { Order, Product } from '../types';

// Use environment variable with fallback to localhost for development
export const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        return data.docs || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function createOrder(orderData: Order): Promise<Order> {
    try {
        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        if (!res.ok) throw new Error('Failed to create order');
        return await res.json();
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    try {
        const res = await fetch(`${API_URL}/subscribers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to subscribe');
        }
        return { success: true, message: 'Successfully subscribed!' };
    } catch (error) {
        console.error('Error subscribing:', error);
        return { success: false, message: error instanceof Error ? error.message : 'Failed to subscribe' };
    }
}
