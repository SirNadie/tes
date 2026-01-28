'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShopHeader, ShopFooter } from '@/components/shop';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useCartStore } from '@/lib/cart';

export default function CheckoutPage() {
    const [mounted, setMounted] = useState(false);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const items = useCartStore((state) => state.items);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);
    const clearCart = useCartStore((state) => state.clearCart);
    const storeTotalPrice = useCartStore((state) => state.getTotalPrice());

    useEffect(() => {
        setMounted(true);
    }, []);

    const cartItems = mounted ? Object.values(items) : [];
    const totalPrice = mounted ? storeTotalPrice : 0;

    const handleQuantityChange = (id: string, newQuantity: number) => {
        updateQuantity(id, newQuantity);
    };

    const handleRemove = (id: string) => {
        removeItem(id);
    };

    const handleCheckoutSuccess = () => {
        clearCart();
        setShowCheckoutForm(false);
        // Could redirect to success page here
    };

    const shipping = totalPrice > 50 ? 0 : 9.99;
    const tax = totalPrice * 0.08;
    const grandTotal = totalPrice + shipping + tax;

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
            <div className="layout-container flex h-full grow flex-col">
                <ShopHeader />
                <main className="flex-1 pt-20">
                    <section className="mx-auto max-w-7xl px-8 py-12">
                        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl text-text-light mb-8">
                            Shopping Cart
                        </h1>

                        {cartItems.length === 0 ? (
                            <div className="text-center py-16">
                                <span className="material-symbols-outlined text-6xl text-gray-300">
                                    shopping_cart
                                </span>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">
                                    Your cart is empty
                                </h3>
                                <p className="mt-2 text-gray-500">
                                    Start shopping to add items to your cart.
                                </p>
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-shop-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                    <span className="material-symbols-outlined">storefront</span>
                                    Browse Products
                                </Link>
                            </div>
                        ) : showCheckoutForm ? (
                            <div className="max-w-3xl mx-auto">
                                <CheckoutForm total={grandTotal} onSuccess={handleCheckoutSuccess} />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                                {/* Cart Items */}
                                <div className="lg:col-span-2 space-y-4">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl shadow-sm"
                                        >
                                            <div className="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    width={96}
                                                    height={96}
                                                    sizes="(max-width: 640px) 100vw, 96px"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col min-w-0">
                                                <div className="flex justify-between items-start gap-2 mb-2">
                                                    <h3 className="font-medium text-gray-900 flex-1">{item.title}</h3>
                                                    <p className="font-semibold text-gray-900 sm:hidden">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                                <p className="text-shop-primary font-semibold mb-4 sm:mb-auto">
                                                    ${item.price.toFixed(2)} <span className="text-gray-500 text-sm font-normal">each</span>
                                                </p>
                                                <div className="flex items-center justify-between sm:justify-start gap-4 mt-auto">
                                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleQuantityChange(item.id, item.quantity - 1)
                                                            }
                                                            className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <span className="material-symbols-outlined text-base sm:text-sm">
                                                                remove
                                                            </span>
                                                        </button>
                                                        <span className="w-12 sm:w-8 text-center text-sm font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleQuantityChange(item.id, item.quantity + 1)
                                                            }
                                                            className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <span className="material-symbols-outlined text-base sm:text-sm">
                                                                add
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemove(item.id)}
                                                        className="text-red-500 hover:text-red-600 transition-colors text-sm font-medium px-2"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="hidden sm:block text-right">
                                                <p className="font-semibold text-gray-900">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Summary */}
                                <div className="lg:col-span-1">
                                    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:sticky lg:top-24">
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                            Order Summary
                                        </h2>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Subtotal</span>
                                                <span className="font-medium">${totalPrice.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Shipping</span>
                                                <span className="font-medium">
                                                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Tax (8%)</span>
                                                <span className="font-medium">${tax.toFixed(2)}</span>
                                            </div>
                                            <div className="border-t border-gray-200 pt-3 mt-3">
                                                <div className="flex justify-between text-base">
                                                    <span className="font-semibold">Total</span>
                                                    <span className="font-bold text-shop-primary">
                                                        ${grandTotal.toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {shipping > 0 && (
                                            <p className="mt-4 text-xs text-gray-500">
                                                Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                                            </p>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => setShowCheckoutForm(true)}
                                            className="w-full mt-6 py-3 px-4 bg-shop-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                                        >
                                            Proceed to Checkout
                                        </button>
                                        <Link
                                            href="/shop"
                                            className="block w-full mt-3 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium text-center hover:bg-gray-50 transition-colors"
                                        >
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </main>
                <ShopFooter />
            </div>
        </div>
    );
}
