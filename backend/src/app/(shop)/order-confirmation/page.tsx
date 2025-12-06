import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'Order Confirmed',
    description: 'Thank you for your order at The Everyday Shop.',
}

export default function OrderConfirmationPage() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <Header />
                <main className="flex-1 pt-20 flex items-center justify-center">
                    <div className="text-center px-8 py-16 max-w-lg">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-4xl text-green-500">
                                check_circle
                            </span>
                        </div>
                        <h1 className="font-display text-3xl font-semibold text-gray-900">
                            Order Confirmed!
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Thank you for your purchase. We&apos;ve received your order and will
                            process it shortly.
                        </p>
                        <p className="mt-2 text-gray-500">
                            You will receive a confirmation email with your order details.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/shop"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-background-light rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                                <span className="material-symbols-outlined text-lg">
                                    shopping_bag
                                </span>
                                Continue Shopping
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">home</span>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}
