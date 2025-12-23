export default function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
            {/* Image skeleton */}
            <div className="aspect-square w-full bg-gray-200" />

            {/* Content skeleton */}
            <div className="p-5">
                {/* Category */}
                <div className="h-3 w-16 bg-gray-200 rounded mb-3" />

                {/* Title and price row */}
                <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-2" />
                        <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    </div>
                    <div className="h-5 w-16 bg-gray-200 rounded" />
                </div>

                {/* Button skeleton */}
                <div className="mt-4 h-10 bg-gray-200 rounded-lg" />
            </div>
        </div>
    )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    )
}
