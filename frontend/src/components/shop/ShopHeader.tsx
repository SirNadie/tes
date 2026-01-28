'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/cart';

export default function ShopHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [mounted, setMounted] = useState(false);
    const totalItems = useCartStore((state) => state.getTotalItems());

    useEffect(() => {
        setMounted(true);
    }, []);

    const cartCount = mounted ? totalItems : 0;

    // Close search on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsSearchOpen(false);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', isMenuOpen || isSearchOpen);
    }, [isMenuOpen, isSearchOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false); // Close search after submitting
        }
    };

    return (
        <header className="fixed top-0 z-40 w-full bg-background-light/90 backdrop-blur-md border-b border-white/10 shadow-sm transition-all duration-300">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
                <Link href="/" className="flex items-center gap-3 group relative z-50">
                    <Image
                        src="/TESlogo.png"
                        alt="The Everyday Shop Logo"
                        width={40}
                        height={40}
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="hidden md:block text-xl font-display font-medium tracking-wide group-hover:text-shop-primary transition-colors text-text-light">
                        The Everyday Shop
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    <Link
                        className="text-sm font-medium leading-normal text-gray-500 hover:text-shop-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-shop-primary after:transition-all hover:after:w-full"
                        href="/shop"
                    >
                        Shop
                    </Link>
                    <Link
                        className="text-sm font-medium leading-normal text-gray-500 hover:text-shop-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-shop-primary after:transition-all hover:after:w-full"
                        href="/about"
                    >
                        About
                    </Link>
                    <Link
                        className="text-sm font-medium leading-normal text-gray-500 hover:text-shop-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-shop-primary after:transition-all hover:after:w-full"
                        href="/contact"
                    >
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center gap-4 relative z-50">
                    {/* Search Button */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="hidden md:flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 text-text-light hover:bg-black/5 transition-colors"
                        aria-label="Search products"
                    >
                        <span className="material-symbols-outlined">search</span>
                    </button>

                    {/* Cart Button */}
                    <Link
                        href="/checkout"
                        className="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 text-text-light hover:bg-black/5 transition-colors"
                    >
                        <span className="material-symbols-outlined">shopping_bag</span>
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-shop-primary text-xs font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="flex md:hidden flex-col items-center justify-center h-10 w-10 gap-1.5 text-text-light hover:bg-black/5 rounded-full transition-colors group"
                        aria-label="Open menu"
                    >
                        <span
                            className={`w-5 h-0.5 bg-current transition-transform duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-2' : ''
                                }`}
                        />
                        <span
                            className={`w-5 h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''
                                }`}
                        />
                        <span
                            className={`w-5 h-0.5 bg-current transition-transform duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Search Overlay */}
            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={(e) => e.target === e.currentTarget && setIsSearchOpen(false)}
                    >
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="flex items-start justify-center pt-24 px-4"
                        >
                            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
                                <form onSubmit={handleSearch} className="flex items-center">
                                    <span className="material-symbols-outlined text-gray-400 ml-4">
                                        search
                                    </span>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search products..."
                                        className="flex-1 py-4 px-4 text-lg border-none focus:ring-0 focus:outline-none"
                                        autoComplete="off"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsSearchOpen(false)}
                                        className="p-4 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 transform transition-transform duration-500 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={toggleMenu}
                />
                <div className="absolute right-0 top-0 h-[100dvh] w-full bg-white shadow-2xl flex flex-col pt-20">
                    <nav className="flex-1 overflow-y-auto py-6 px-8">
                        <ul className="space-y-6">
                            <li
                                className={`transition-all duration-300 delay-100 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                                    }`}
                            >
                                <Link
                                    className="flex items-center justify-between text-2xl font-display font-medium text-gray-900 hover:text-shop-primary transition-colors group"
                                    href="/shop"
                                    onClick={toggleMenu}
                                >
                                    Shop
                                    <span className="material-symbols-outlined text-gray-300 group-hover:text-shop-primary transition-colors">
                                        arrow_forward
                                    </span>
                                </Link>
                            </li>
                            <li
                                className={`transition-all duration-300 delay-200 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                                    }`}
                            >
                                <Link
                                    className="flex items-center justify-between text-2xl font-display font-medium text-gray-900 hover:text-shop-primary transition-colors group"
                                    href="/about"
                                    onClick={toggleMenu}
                                >
                                    About
                                    <span className="material-symbols-outlined text-gray-300 group-hover:text-shop-primary transition-colors">
                                        arrow_forward
                                    </span>
                                </Link>
                            </li>
                            <li
                                className={`transition-all duration-300 delay-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                                    }`}
                            >
                                <Link
                                    className="flex items-center justify-between text-2xl font-display font-medium text-gray-900 hover:text-shop-primary transition-colors group"
                                    href="/contact"
                                    onClick={toggleMenu}
                                >
                                    Contact
                                    <span className="material-symbols-outlined text-gray-300 group-hover:text-shop-primary transition-colors">
                                        arrow_forward
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
