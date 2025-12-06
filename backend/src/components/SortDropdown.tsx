'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface SortDropdownProps {
    currentSort: string
    currentCategory?: string
}

export default function SortDropdown({
    currentSort,
    currentCategory,
}: SortDropdownProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleSortChange = (newSort: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', newSort)
        if (currentCategory && currentCategory !== 'All') {
            params.set('category', currentCategory)
        }
        router.push(`/shop?${params.toString()}`)
    }

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
                value={currentSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
            </select>
        </div>
    )
}
