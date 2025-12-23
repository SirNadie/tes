import Link from 'next/link';
import Image from 'next/image';

export default function ShopFooter() {
    return (
        <footer className="bg-background-light border-t border-solid border-border-light">
            <div className="mx-auto max-w-7xl px-8 py-12">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <Image
                                src="/TESlogo.png"
                                alt="The Everyday Shop Logo"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                            <span className="font-display font-medium text-lg group-hover:text-shop-primary transition-colors">
                                The Everyday Shop
                            </span>
                        </Link>
                        <p className="text-sm text-gray-600 max-w-xs">
                            Curated essentials for a mindful lifestyle. Quality, function, and
                            design in every product.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4 text-text-light">Shop</h5>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    className="text-gray-600 hover:text-shop-primary transition-colors"
                                    href="/shop"
                                >
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-gray-600 hover:text-shop-primary transition-colors"
                                    href="/shop?sort=newest"
                                >
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-gray-600 hover:text-shop-primary transition-colors"
                                    href="/shop?sort=featured"
                                >
                                    Featured
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4 text-text-light">Support</h5>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    className="text-gray-600 hover:text-shop-primary transition-colors"
                                    href="/contact"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-gray-600 hover:text-shop-primary transition-colors"
                                    href="/contact"
                                >
                                    Shipping &amp; Returns
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-gray-600 hover:text-shop-primary transition-colors"
                                    href="/contact"
                                >
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4 text-text-light">Connect</h5>
                        <div className="flex space-x-4 text-gray-500">
                            <a
                                className="hover:text-shop-primary transition-colors"
                                href="#"
                                aria-label="Instagram"
                            >
                                <span className="material-symbols-outlined text-xl">
                                    photo_camera
                                </span>
                            </a>
                            <a
                                className="hover:text-shop-primary transition-colors"
                                href="#"
                                aria-label="Twitter"
                            >
                                <span className="material-symbols-outlined text-xl">
                                    alternate_email
                                </span>
                            </a>
                            <a
                                className="hover:text-shop-primary transition-colors"
                                href="#"
                                aria-label="Pinterest"
                            >
                                <span className="material-symbols-outlined text-xl">
                                    push_pin
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-solid border-border-light pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} The Everyday Shop. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-text-light transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-text-light transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
