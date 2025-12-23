'use client';

export default function Header() {
    return (
        <header className="h-16 flex-none border-b border-border-dark bg-background-dark/95 backdrop-blur-sm z-10 flex items-center justify-between px-6">
            <div className="flex items-center gap-4 flex-1">
                {/* Mobile menu button */}
                <button className="md:hidden text-gray-400 hover:text-white">
                    <span className="material-symbols-outlined">menu</span>
                </button>

                {/* Search */}
                <div className="relative max-w-md w-full hidden sm:block">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border-none rounded-lg leading-5 bg-surface-highlight text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                        placeholder="Search orders, products, or customers..."
                    />
                </div>
            </div>


        </header>
    );
}
