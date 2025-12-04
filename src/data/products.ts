export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    features?: string[];
}

const hardcodedProducts: Product[] = [
    // Home Office
    {
        id: '1',
        title: 'Desk Organizer',
        price: 45.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4lDpDR0o-48QSx_X_JFT4iiHs1v3E6xO_XDij3O27F0nY6LEpnE_7W37O91xvSIPkY4lZ1fQHFDsnMKgLt3t9K0Hadna_hzUdGnxoN0Ej--34Pq-0Daebog-lPRC8KfUmcwtvNIs47wiQ48312sM3lw4ktObgYm8aKq2HdErPjy_8fW9_rbpHPQOrJSHo6ne8EcpRt4GZ12K49LgrAYZL41NSvxqNfxjVgTUOaJCqTgGusyeQWqWvBCKzwErDCZQ5GNYyhaTCz28',
        category: 'Home Office',
        description: 'Keep your workspace tidy and efficient with this premium desk organizer.',
        features: ['Multiple compartments', 'Durable construction', 'Modern design']
    },
    {
        id: '2',
        title: 'Premium Notebook',
        price: 28.00,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2787&auto=format&fit=crop',
        category: 'Home Office'
    },
    {
        id: '3',
        title: 'Brass Pen',
        price: 35.00,
        image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=2940&auto=format&fit=crop',
        category: 'Home Office'
    },

    // Kitchen & Dining
    {
        id: '4',
        title: 'Ceramic Mug',
        price: 25.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwvzvDrCxXsut7WOsVil5qmVHv0t7-7ijbQQeKQHerweKVBI2CZryrD2Y0o-vfalvYJvJHlzASeINoMF5MT3MXp9mlGe2jjHUr8NmNuPVPUwn1OzNvGczqmJjyX8PKHBAmY427B1ppNWtfE5omg3jVeDveEPbG3xDbKoPwWsqgwz_IMc_SJ9IMfbN0yOblsdmomtlClFNbzKK_UJEZUK8e_74BtI7mvSL2oZJbcHBvgaJ1SKQaBaWFm4ClNNsseKUHWFZzcPucXtM',
        category: 'Kitchen & Dining'
    },
    {
        id: '5',
        title: 'Stoneware Plate Set',
        price: 65.00,
        image: 'https://images.unsplash.com/photo-1625603736154-46d9d95f0194?q=80&w=2912&auto=format&fit=crop',
        category: 'Kitchen & Dining'
    },
    {
        id: '6',
        title: 'Pour-Over Coffee Maker',
        price: 42.00,
        image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?q=80&w=2787&auto=format&fit=crop',
        category: 'Kitchen & Dining'
    },

    // Living & Comfort
    {
        id: '7',
        title: 'Linen Throw Blanket',
        price: 80.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB43RZeSoTcCYKU-WdtSJMcOA31zdEdNUeOMvinUaAZpo8M8USuY-0-ltBbtBr94wV_HxStEEZZVZXx5rEtzgNtabbm20OTgvxPkB8YzP6HEy1e2-4qE_Nn-FscSyxo16KrKpp2eCP5t6yR_iOP6UYJF_z6qlH5myzYAKXvPDW_ArloQHbv1sdoozHpPYB9QROU02oOyTkCrEesB-nhuTok_Hi8yN2pYsre8-RSy4Gljn_S0MwmformFJUFAoaDS77cgfyqbzajzUc',
        category: 'Living & Comfort'
    },
    {
        id: '8',
        title: 'Soy Wax Candle',
        price: 32.00,
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=2787&auto=format&fit=crop',
        category: 'Living & Comfort'
    },
    {
        id: '9',
        title: 'Ceramic Vase',
        price: 55.00,
        image: 'https://images.unsplash.com/photo-1581783342308-f792ca11df53?q=80&w=2787&auto=format&fit=crop',
        category: 'Living & Comfort'
    },

    // Personal Care
    {
        id: '10',
        title: 'Organic Cotton Towel',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1616627547584-bf28ceeec79c?q=80&w=2787&auto=format&fit=crop',
        category: 'Personal Care'
    },
    {
        id: '11',
        title: 'Bamboo Toothbrush Set',
        price: 15.00,
        image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb6dcaf?q=80&w=2940&auto=format&fit=crop',
        category: 'Personal Care'
    },

    // On the Go
    {
        id: '12',
        title: 'Minimalist Water Bottle',
        price: 30.00,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=2787&auto=format&fit=crop',
        category: 'On the Go'
    },
    {
        id: '13',
        title: 'Canvas Tote Bag',
        price: 22.00,
        image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?q=80&w=2779&auto=format&fit=crop',
        category: 'On the Go'
    }
];

import { fetchProducts } from '../utils/api';

export async function getProducts(): Promise<Product[]> {
    const apiProducts = await fetchProducts();
    if (apiProducts && apiProducts.length > 0) {
        return apiProducts.map((p: any) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            image: p.image && p.image.startsWith('http') ? p.image : 'https://placehold.co/600x400?text=No+Image',
            category: typeof p.category === 'object' && p.category !== null ? p.category.name : (p.category || 'Uncategorized'),
            description: p.description,
            features: p.features ? p.features.map((f: any) => f.feature) : [],
        }));
    }
    return hardcodedProducts;

}

export const products = hardcodedProducts;
