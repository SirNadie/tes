// Shared TypeScript types for the application

export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    features?: string[];
    stock?: number;
    featured?: boolean;
}

export interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

export interface Customer {
    name: string;
    email: string;
    address: string;
    phone: string;
}

export interface OrderItem {
    product: string;
    title: string;
    quantity: number;
    price: number;
}

export interface PaymentInfo {
    method: 'cod' | 'online';
    transactionId?: string | null;
    status: 'pending_payment' | 'awaiting_proof';
}

export interface Order {
    items: OrderItem[];
    total: number;
    customer: Customer;
    payment: PaymentInfo;
    status: 'pending' | 'verifying' | 'paid' | 'shipped';
}

export interface Subscriber {
    email: string;
    subscribedAt: Date;
}

export interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    url?: string;
}
