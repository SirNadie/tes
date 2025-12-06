import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CheckoutForm from '@/components/CheckoutForm'

export const metadata = {
    title: 'Checkout',
    description: 'Complete your order at The Everyday Shop.',
}

export default function CheckoutPage() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <Header />
                <main className="flex-1 pt-20">
                    <section className="mx-auto max-w-7xl px-8 py-12">
                        <h1 className="font-display text-3xl font-semibold tracking-tight mb-8">
                            Checkout
                        </h1>
                        <CheckoutForm />
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    )
}
