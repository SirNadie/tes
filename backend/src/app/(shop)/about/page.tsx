import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'About Us',
    description: 'Learn about The Everyday Shop and our mission to bring quality essentials to your daily life.',
}

export default function AboutPage() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <Header />
                <main className="flex-1 pt-20">
                    {/* Hero Section */}
                    <section className="bg-gradient-to-b from-primary/5 to-transparent">
                        <div className="mx-auto max-w-7xl px-8 py-20 text-center">
                            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                                About The Everyday Shop
                            </h1>
                            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                                We believe that the objects you interact with daily should bring
                                joy, quality, and intention to your life.
                            </p>
                        </div>
                    </section>

                    {/* Story Section */}
                    <section className="mx-auto max-w-7xl px-8 py-16">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
                            <div>
                                <h2 className="font-display text-3xl font-semibold tracking-tight">
                                    Our Story
                                </h2>
                                <p className="mt-6 text-gray-600 leading-relaxed">
                                    The Everyday Shop was born from a simple idea: that the products
                                    we use every day should be thoughtfully designed, sustainably
                                    made, and built to last. We curate a collection of essentials
                                    that blend form and function, helping you create a more mindful
                                    and intentional lifestyle.
                                </p>
                                <p className="mt-4 text-gray-600 leading-relaxed">
                                    Each product in our collection is carefully selected for its
                                    quality, design, and the positive impact it can have on your
                                    daily routines. We work with artisans and manufacturers who
                                    share our commitment to excellence and sustainability.
                                </p>
                            </div>
                            <div className="aspect-square overflow-hidden rounded-2xl">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4nwW2J4TDBtDTVJd0DF-je-TzxYQU7WFzvskgcz3pp3Eqa72S_O0mkzBT-bt-nYBxvg6WuFhetxCJ6ut6MTdFp9VUKSPcueyGcSNybD647psMoXa29i7o8UwAnuwdmEn8vVcLsJ8ErrqiwnSq1lkZY1Kr6ry2iVIxDLQXIrLxLuGjRC0qh_sOgr_SAV_kkzTqcz4Vw_WjIh3ucS9EcPbfGnZ5b_OuTcccpk-ZnM2b5mMW5bTqh4gNMzv4QOzsXje0HcgbFkjnFYU"
                                    alt="Our workshop"
                                    width={600}
                                    height={600}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Values Section */}
                    <section className="bg-gray-50">
                        <div className="mx-auto max-w-7xl px-8 py-16">
                            <h2 className="font-display text-3xl font-semibold tracking-tight text-center mb-12">
                                Our Values
                            </h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="material-symbols-outlined text-primary text-2xl">
                                            verified
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">Quality First</h3>
                                    <p className="text-gray-600">
                                        We never compromise on quality. Every product is built to last
                                        and designed to perform.
                                    </p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="material-symbols-outlined text-primary text-2xl">
                                            eco
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
                                    <p className="text-gray-600">
                                        We prioritize eco-friendly materials and ethical manufacturing
                                        practices.
                                    </p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="material-symbols-outlined text-primary text-2xl">
                                            favorite
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">Mindful Living</h3>
                                    <p className="text-gray-600">
                                        Our products are designed to enhance your daily rituals and
                                        bring intention to everyday life.
                                    </p>
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
