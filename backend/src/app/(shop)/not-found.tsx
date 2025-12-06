import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <Header />
                <main className="flex-1 pt-20 flex items-center justify-center">
                    <div className="text-center px-8 py-16">
                        <span className="material-symbols-outlined text-8xl text-gray-200">
                            search_off
                        </span>
                        <h1 className="mt-6 font-display text-5xl font-semibold text-gray-900">
                            404
                        </h1>
                        <p className="mt-4 text-xl text-gray-600">
                            Oops! The page you&apos;re looking for doesn&apos;t exist.
                        </p>
                        <p className="mt-2 text-gray-500">
                            It might have been moved or deleted.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-background-light rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                                <span className="material-symbols-outlined text-lg">home</span>
                                Go Home
                            </Link>
                            <Link
                                href="/shop"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">
                                    shopping_bag
                                </span>
                                Browse Shop
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}
