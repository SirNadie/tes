'use client';

import { useState } from 'react';
import { toast } from '@/lib/toast';

interface CheckoutFormData {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

interface CheckoutFormProps {
    onSuccess?: () => void;
    total: number;
}

export default function CheckoutForm({ onSuccess, total }: CheckoutFormProps) {
    const [formData, setFormData] = useState<CheckoutFormData>({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateCardNumber = (card: string): boolean => {
        const cleaned = card.replace(/\s/g, '');
        return /^\d{13,19}$/.test(cleaned);
    };

    const validateExpiryDate = (date: string): boolean => {
        const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!re.test(date)) return false;
        const [month, year] = date.split('/');
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        return expiry > new Date();
    };

    const validateCVV = (cvv: string): boolean => {
        return /^\d{3,4}$/.test(cvv);
    };

    const handleChange = (field: keyof CheckoutFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

        if (!formData.email || !validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }
        if (!formData.country.trim()) {
            newErrors.country = 'Country is required';
        }
        if (!formData.cardNumber || !validateCardNumber(formData.cardNumber)) {
            newErrors.cardNumber = 'Please enter a valid card number';
        }
        if (!formData.expiryDate || !validateExpiryDate(formData.expiryDate)) {
            newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
        }
        if (!formData.cvv || !validateCVV(formData.cvv)) {
            newErrors.cvv = 'Please enter a valid CVV';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call - TODO: Integrate with payment API
            await new Promise((resolve) => setTimeout(resolve, 1500));

            toast.success('Order placed successfully!');
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            toast.error('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Contact Information */}
            <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Contact Information</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className={`w-full rounded-lg border px-4 py-3 sm:py-2 text-base sm:text-sm ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            } focus:border-shop-primary focus:outline-none focus:ring-1 focus:ring-shop-primary`}
                            placeholder="your@email.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                </div>
            </div>

            {/* Shipping Information */}
            <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name *
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            className={`w-full rounded-lg border px-4 py-2 ${
                                errors.firstName ? 'border-red-500' : 'border-gray-300'
                            } focus:border-shop-primary focus:outline-none focus:ring-1 focus:ring-shop-primary`}
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name *
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            className={`w-full rounded-lg border px-4 py-2 ${
                                errors.lastName ? 'border-red-500' : 'border-gray-300'
                            } focus:border-shop-primary focus:outline-none focus:ring-1 focus:ring-shop-primary`}
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                    </div>
                </div>
                <div className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className={`w-full rounded-lg border px-4 py-2 ${
                                errors.phone ? 'border-red-500' : 'border-gray-300'
                            } focus:border-shop-primary focus:outline-none focus:ring-1 focus:ring-shop-primary`}
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Address *
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            className={`w-full rounded-lg border px-4 py-2 ${
                                errors.address ? 'border-red-500' : 'border-gray-300'
                            } focus:border-shop-primary focus:outline-none focus:ring-1 focus:ring-shop-primary`}
                        />
                        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                City *
                            </label>
                            <input
                                type="text"
                                id="city"
                                value={formData.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                                className={`w-full rounded-lg border px-4 py-2 ${
                                    errors.city ? 'border-red-500' : 'border-gray-300'
                                } focus:border-shop-primary focus:outline-none focus:ring-1 focus:ring-shop-primary`}
                            />
                            {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                Country *
                            </label>
                            <input
                                type="text"
                                id="country"
                                value={formData.country}
                                onChange={(e) => handleChange('country', e.target.value)}
                                className={`w-full rounded-lg border px-4 py-2 ${
                                    errors.country ? 'border-red-500' : 'border-gray-300'
                                } focus:border-shop-primary focus:outline-none focus:ring-1 focus:ring-shop-primary`}
                            />
                            {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Information */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number *
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={formData.cardNumber}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                                const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                                handleChange('cardNumber', formatted);
                            }}
                            maxLength={19}
                            className={`w-full rounded-lg border px-4 py-2 ${
                                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                            } focus:border-shop-primary focus:outline-none focus:ring-1 focus:ring-shop-primary`}
                            placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date *
                            </label>
                            <input
                                type="text"
                                id="expiryDate"
                                value={formData.expiryDate}
                                onChange={(e) => {
                                    let value = e.target.value.replace(/\D/g, '');
                                    if (value.length >= 2) {
                                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                    }
                                    handleChange('expiryDate', value);
                                }}
                                maxLength={5}
                                className={`w-full rounded-lg border px-4 py-2 ${
                                    errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                                } focus:border-shop-primary focus:outline-none focus:ring-1 focus:ring-shop-primary`}
                                placeholder="MM/YY"
                            />
                            {errors.expiryDate && <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>}
                        </div>
                        <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                CVV *
                            </label>
                            <input
                                type="text"
                                id="cvv"
                                value={formData.cvv}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                                    handleChange('cvv', value);
                                }}
                                maxLength={4}
                                className={`w-full rounded-lg border px-4 py-2 ${
                                    errors.cvv ? 'border-red-500' : 'border-gray-300'
                                } focus:border-shop-primary focus:outline-none focus:ring-1 focus:ring-shop-primary`}
                                placeholder="123"
                            />
                            {errors.cvv && <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-shop-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined animate-spin">sync</span>
                        Processing...
                    </span>
                ) : (
                    `Place Order - $${total.toFixed(2)}`
                )}
            </button>
        </form>
    );
}
