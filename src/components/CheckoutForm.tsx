import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { cartItems, clearCart, updateCartItemQuantity, removeCartItem } from '../stores/cartStore';
import { createOrder } from '../utils/api';

export default function CheckoutForm() {
    const $cartItems = useStore(cartItems);
    const items = Object.values($cartItems);
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        transactionId: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (paymentMethod === 'online' && !formData.transactionId) {
            alert('Please enter the Transaction ID for online payment.');
            return;
        }

        const order = {
            items: items.map(item => ({
                product: item.id,
                title: item.title,
                quantity: item.quantity,
                price: item.price,
            })),
            total,
            customer: {
                name: formData.name,
                email: formData.email,
                address: formData.address,
                phone: formData.phone,
            },
            payment: {
                method: paymentMethod,
                transactionId: paymentMethod === 'online' ? formData.transactionId : null,
                status: paymentMethod === 'cod' ? 'pending_payment' : 'awaiting_proof',
            },
            status: 'pending',
        };

        try {
            await createOrder(order);
            alert('Order submitted successfully!');
            clearCart();
            window.location.href = '/';
        } catch (error) {
            alert('Failed to submit order. Please try again.');
            console.error(error);
        }
    };

    if (!mounted || items.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-display font-medium mb-4">Your cart is empty</h2>
                <a href="/shop" className="text-primary hover:underline">Continue Shopping</a>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <h2 className="font-display text-2xl font-semibold mb-6">Shipping Details</h2>
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                            required
                            rows={3}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            type="tel"
                            required
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div className="pt-6">
                        <h2 className="font-display text-2xl font-semibold mb-6">Payment Method</h2>
                        <div className="space-y-4">
                            <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={() => setPaymentMethod('cod')}
                                    className="mt-1 text-primary focus:ring-primary"
                                />
                                <div>
                                    <span className="block font-medium">Cash on Delivery / LINX</span>
                                    <span className="text-sm text-gray-500">Pay when you receive your order. No extra fees.</span>
                                </div>
                            </label>

                            <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="online"
                                    checked={paymentMethod === 'online'}
                                    onChange={() => setPaymentMethod('online')}
                                    className="mt-1 text-primary focus:ring-primary"
                                />
                                <div>
                                    <span className="block font-medium">Online Payment (WiPay / Endcash / Bank Transfer)</span>
                                    <span className="text-sm text-gray-500">Pay securely online or via bank transfer.</span>
                                </div>
                            </label>
                        </div>

                        {paymentMethod === 'online' && (
                            <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-600 mb-4">
                                    To confirm your order, please make a payment via WiPay/Endcash or transfer to Republic Bank <strong>#123456</strong>.
                                </p>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-accent text-white px-6 py-2 rounded-md font-medium hover:bg-accent/90 transition-colors mb-4"
                                >
                                    Pay via WiPay
                                </a>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID / Reference Number</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter transaction ID"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                        value={formData.transactionId}
                                        onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Required to verify your payment.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-8 bg-primary text-background-light py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        Place Order
                    </button>
                </form>
            </div>

            <div>
                <h2 className="font-display text-2xl font-semibold mb-6">Order Summary</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <ul className="space-y-4 mb-6">
                        {items.map((item) => (
                            <li key={item.id} className="flex gap-4">
                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={item.image && item.image.startsWith('http') ? item.image : 'https://placehold.co/600x400?text=No+Image'}
                                        alt={item.title}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>{item.title}</h3>
                                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center gap-2 border rounded-md p-1">
                                            <button
                                                type="button"
                                                onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
                                            >
                                                -
                                            </button>
                                            <span className="w-4 text-center">{item.quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeCartItem(item.id)}
                                            className="font-medium text-primary hover:text-primary/80"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping calculated at checkout.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
