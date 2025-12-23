'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: 'dashboard', filled: true },
    { href: '/admin/orders', label: 'Orders', icon: 'shopping_cart', badge: '12' },
    { href: '/admin/products', label: 'Products', icon: 'sell' },
    { href: '/admin/customers', label: 'Customers', icon: 'group' },
    { href: '/admin/analytics', label: 'Analytics', icon: 'bar_chart' },
    { href: '/admin/marketing', label: 'Marketing', icon: 'campaign' },
];

const systemItems = [
    { href: '/admin/settings', label: 'Settings', icon: 'settings' },
    { href: '/admin/help', label: 'Help Center', icon: 'help' },
];

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    return (
        <aside className="w-64 flex-none hidden md:flex flex-col border-r border-border-dark bg-background-dark">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-border-dark">
                <div className="flex items-center gap-3">
                    <img
                        src="/TESlogo-white.png"
                        alt="Logo"
                        className="w-8 h-8 object-contain"
                    />
                    <h1 className="text-white text-lg font-bold tracking-tight">Everyday Admin</h1>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-6">
                {/* User Profile */}
                <div className="flex items-center gap-3 px-2">
                    <div
                        className="size-10 rounded-full bg-cover bg-center bg-gray-600"
                        style={{
                            backgroundImage: `url('https://ui-avatars.com/api/?name=Admin+User&background=137fec&color=fff')`,
                        }}
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">Admin User</span>
                        <span className="text-xs text-gray-400">Store Administrator</span>
                    </div>
                </div>

                {/* Main Navigation */}
                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive(item.href)
                                ? 'bg-primary text-white'
                                : 'text-gray-400 hover:bg-surface-highlight hover:text-white'
                                }`}
                        >
                            <span className={`material-symbols-outlined ${isActive(item.href) ? 'icon-filled' : ''}`}>
                                {item.icon}
                            </span>
                            <span className="text-sm font-medium">{item.label}</span>
                            {item.badge && (
                                <span className="ml-auto bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* System Navigation */}
                <div className="mt-auto">
                    <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        System
                    </p>
                    <nav className="flex flex-col gap-1">
                        {systemItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive(item.href)
                                    ? 'bg-primary text-white'
                                    : 'text-gray-400 hover:bg-surface-highlight hover:text-white'
                                    }`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </aside>
    );
}
