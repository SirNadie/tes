import { StatsCard, RevenueChart, OrdersTable, TopProducts } from '@/components/admin';

const statsData = [
    {
        title: 'Total Revenue',
        value: '$128,430',
        icon: 'attach_money',
        iconBgColor: 'bg-primary/10',
        iconColor: 'text-primary',
        trend: { value: '15.3%', isPositive: true, label: 'vs last month' },
        glowColor: 'bg-primary/5',
    },
    {
        title: 'Total Orders',
        value: '4,321',
        icon: 'shopping_bag',
        iconBgColor: 'bg-purple-500/10',
        iconColor: 'text-purple-400',
        trend: { value: '5.2%', isPositive: true, label: 'vs last month' },
        glowColor: 'bg-purple-500/5',
    },
    {
        title: 'Avg. Order Value',
        value: '$125.00',
        icon: 'receipt_long',
        iconBgColor: 'bg-orange-500/10',
        iconColor: 'text-orange-400',
        trend: { value: '1.2%', isPositive: false, label: 'vs last month' },
        glowColor: 'bg-orange-500/5',
    },
    {
        title: 'Active Shoppers',
        value: '342',
        icon: 'visibility',
        iconBgColor: 'bg-teal-500/10',
        iconColor: 'text-teal-400',
        liveIndicator: true,
        glowColor: 'bg-teal-500/5',
    },
];

const timeFilters = ['Today', '7D', '30D', '12M'];

export default function AdminDashboard() {
    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
            {/* Headline */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h2>
                    <p className="text-gray-400 mt-1">Here&apos;s what&apos;s happening with your store today.</p>
                </div>
                <div className="flex items-center gap-2 bg-surface-highlight rounded-lg p-1 border border-border-dark">
                    {timeFilters.map((filter, index) => (
                        <button
                            key={filter}
                            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${index === 0
                                ? 'text-white bg-surface-dark shadow-sm'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat) => (
                    <StatsCard key={stat.title} {...stat} />
                ))}
            </div>

            {/* Main Chart Section */}
            <RevenueChart />

            {/* Bottom Section: Tables & Lists */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <OrdersTable />
                <TopProducts />
            </div>

            {/* Footer */}
            <footer className="mt-12 mb-6 border-t border-border-dark pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>© 2024 The Everyday Shop. All rights reserved.</p>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                </div>
            </footer>
        </div>
    );
}
