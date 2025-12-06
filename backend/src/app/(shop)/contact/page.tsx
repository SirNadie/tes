import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export const metadata = {
    title: 'Contact Us',
    description: 'Get in touch with The Everyday Shop. We\'re here to help.',
}

export default function ContactPage() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <Header />
                <main className="flex-1 pt-20">
                    {/* Hero */}
                    <section className="bg-gradient-to-b from-primary/5 to-transparent">
                        <div className="mx-auto max-w-7xl px-8 py-16 text-center">
                            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                                Contact Us
                            </h1>
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                Have a question? We&apos;d love to hear from you. Send us a message
                                and we&apos;ll respond as soon as possible.
                            </p>
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-8 py-12">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                            {/* Contact Form */}
                            <div>
                                <h2 className="font-display text-2xl font-semibold mb-6">
                                    Send us a message
                                </h2>
                                <ContactForm />
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h2 className="font-display text-2xl font-semibold mb-6">
                                    Other ways to reach us
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-primary">
                                                mail
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Email</h3>
                                            <p className="text-gray-600">support@theeverydayshop.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-primary">
                                                phone
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Phone</h3>
                                            <p className="text-gray-600">+1 (868) 555-0123</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-primary">
                                                location_on
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Address</h3>
                                            <p className="text-gray-600">
                                                123 Main Street<br />
                                                Port of Spain, Trinidad
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-primary">
                                                schedule
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Business Hours</h3>
                                            <p className="text-gray-600">
                                                Monday - Friday: 9am - 6pm<br />
                                                Saturday: 10am - 4pm<br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    )
}
