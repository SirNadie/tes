export default function ProductCardSkeleton() {
    return (
        <div className="product-card bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
            {/* Image Skeleton */}
            <div className="aspect-square w-full bg-gradient-to-br from-gray-200 to-gray-300" />

            {/* Content Skeleton */}
            <div className="p-5">
                {/* Category Badge */}
                <div className="h-4 w-20 bg-gray-200 rounded mb-2" />

                {/* Title & Price Row */}
                <div className="flex justify-between items-start gap-3 mb-4">
                    <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </div>
                    <div className="h-6 w-16 bg-gray-200 rounded" />
                </div>

                {/* Button Skeleton */}
                <div className="h-10 w-full bg-gray-200 rounded-lg" />
            </div>
        </div>
    );
}
