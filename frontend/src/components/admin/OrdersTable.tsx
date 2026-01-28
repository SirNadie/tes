interface Order {
    id: string;
    customer: {
        name: string;
        avatar?: string;
        initials?: string;
        bgColor?: string;
    };
    date: string;
    amount: string;
    status: 'delivered' | 'pending' | 'processing' | 'cancelled';
}

const statusStyles = {
    delivered: 'bg-green-500/20 text-green-500',
    pending: 'bg-yellow-500/20 text-yellow-500',
    processing: 'bg-blue-500/20 text-blue-500',
    cancelled: 'bg-red-500/20 text-red-500',
};

const statusLabels = {
    delivered: 'Delivered',
    pending: 'Pending',
    processing: 'Processing',
    cancelled: 'Cancelled',
};

const sampleOrders: Order[] = [
    {
        id: '#ORD-5532',
        customer: { name: 'John Doe', initials: 'JD', bgColor: 'bg-gray-600' },
        date: 'Oct 24, 2023',
        amount: '$120.50',
        status: 'delivered',
    },
    {
        id: '#ORD-5531',
        customer: {
            name: 'Sarah Smith',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Smith&background=ec4899&color=fff',
        },
        date: 'Oct 24, 2023',
        amount: '$349.99',
        status: 'pending',
    },
    {
        id: '#ORD-5530',
        customer: { name: 'Mike King', initials: 'MK', bgColor: 'bg-blue-600' },
        date: 'Oct 23, 2023',
        amount: '$59.00',
        status: 'processing',
    },
    {
        id: '#ORD-5529',
        customer: {
            name: 'David Lee',
            avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=22c55e&color=fff',
        },
        date: 'Oct 23, 2023',
        amount: '$850.00',
        status: 'cancelled',
    },
];

export default function OrdersTable() {
    return (
        <div className="xl:col-span-2 bg-surface-dark border border-border-dark rounded-xl flex flex-col overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-border-dark flex justify-between items-center">
                <h3 className="text-base sm:text-lg font-bold text-white">Recent Orders</h3>
                <a href="/admin/orders" className="text-xs sm:text-sm text-primary font-medium hover:text-blue-400">
                    View All
                </a>
            </div>

            {/* Mobile Cards View */}
            <div className="block lg:hidden divide-y divide-border-dark">
                {sampleOrders.map((order) => (
                    <div key={order.id} className="p-4 hover:bg-surface-highlight/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <p className="text-white font-medium text-sm mb-1">{order.id}</p>
                                <div className="flex items-center gap-2 mb-2">
                                    {order.customer.avatar ? (
                                        <div
                                            className="size-6 rounded-full bg-cover bg-center"
                                            style={{ backgroundImage: `url('${order.customer.avatar}')` }}
                                        />
                                    ) : (
                                        <div
                                            className={`size-6 rounded-full ${order.customer.bgColor} flex items-center justify-center text-[10px] text-white font-bold`}
                                        >
                                            {order.customer.initials}
                                        </div>
                                    )}
                                    <span className="text-gray-300 text-sm">{order.customer.name}</span>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-white">
                                <span className="material-symbols-outlined text-[18px]">more_vert</span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <span className="text-gray-400 text-xs">{order.date}</span>
                                <span className="text-white font-medium text-sm">{order.amount}</span>
                            </div>
                            <span
                                className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusStyles[order.status]}`}
                            >
                                {statusLabels[order.status]}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-highlight text-gray-400 text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 font-medium">Order ID</th>
                            <th className="px-6 py-4 font-medium">Customer</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Amount</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-border-dark">
                        {sampleOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-surface-highlight/50 transition-colors">
                                <td className="px-6 py-4 text-white font-medium">{order.id}</td>
                                <td className="px-6 py-4 text-gray-300">
                                    <div className="flex items-center gap-2">
                                        {order.customer.avatar ? (
                                            <div
                                                className="size-6 rounded-full bg-cover bg-center"
                                                style={{ backgroundImage: `url('${order.customer.avatar}')` }}
                                            />
                                        ) : (
                                            <div
                                                className={`size-6 rounded-full ${order.customer.bgColor} flex items-center justify-center text-[10px] text-white font-bold`}
                                            >
                                                {order.customer.initials}
                                            </div>
                                        )}
                                        {order.customer.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-400">{order.date}</td>
                                <td className="px-6 py-4 text-white font-medium">{order.amount}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusStyles[order.status]}`}
                                    >
                                        {statusLabels[order.status]}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-white">
                                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
