export const API_URL = 'http://localhost:3000/api';

export async function fetchProducts() {
    try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        return data.docs;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function createOrder(orderData: any) {
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
