interface Product {
    id: number;
    name: string;
    price: string;
    sold: number;
    image: string;
}

const topProducts: Product[] = [
    {
        id: 1,
        name: 'Nike Air Max 270',
        price: '$160.00',
        sold: 542,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
    },
    {
        id: 2,
        name: 'Sony WH-1000XM4',
        price: '$348.00',
        sold: 321,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
    },
    {
        id: 3,
        name: 'Polaroid Now+',
        price: '$149.99',
        sold: 289,
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&h=100&fit=crop',
    },
    {
        id: 4,
        name: 'Apple Watch SE',
        price: '$249.00',
        sold: 194,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop',
    },
];

export default function TopProducts() {
    return (
        <div className="bg-surface-dark border border-border-dark rounded-xl flex flex-col">
            <div className="p-6 border-b border-border-dark">
                <h3 className="text-lg font-bold text-white">Top Products</h3>
            </div>

            <div className="p-4 flex flex-col gap-4">
                {topProducts.map((product, index) => (
                    <div
                        key={product.id}
                        className="flex items-center gap-4 p-2 rounded-lg hover:bg-surface-highlight transition-colors group cursor-pointer"
                    >
                        <div
                            className="size-12 rounded-lg bg-white/5 bg-cover bg-center flex-none border border-border-dark"
                            style={{ backgroundImage: `url('${product.image}')` }}
                        />
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">
                                {product.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                                {product.price} • {product.sold} Sold
                            </p>
                        </div>
                        <div className="text-sm font-bold text-white">#{index + 1}</div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-border-dark mt-auto">
                <button className="w-full py-2 rounded-lg border border-border-dark text-sm font-medium text-white hover:bg-surface-highlight transition-colors">
                    View All Products
                </button>
            </div>
        </div>
    );
}
