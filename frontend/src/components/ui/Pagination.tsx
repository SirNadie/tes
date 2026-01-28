'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
    params?: Record<string, string>;
}

export default function Pagination({ currentPage, totalPages, baseUrl, params = {} }: PaginationProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (totalPages <= 1) return null;

    const buildUrl = (page: number) => {
        const searchParams = new URLSearchParams({ ...params, page: String(page) });
        return `${baseUrl}?${searchParams.toString()}`;
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = isMobile ? 5 : 7;

        if (totalPages <= maxVisible) {
            // Show all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show first page
            pages.push(1);

            if (currentPage > 3 && !isMobile) {
                pages.push('...');
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - (isMobile ? 0 : 1));
            const end = Math.min(totalPages - 1, currentPage + (isMobile ? 0 : 1));

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2 && !isMobile) {
                pages.push('...');
            }

            // Show last page
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8 sm:mt-12 flex-wrap">
            {/* Previous Button */}
            {currentPage > 1 && (
                <Link
                    href={buildUrl(currentPage - 1)}
                    className="px-3 sm:px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Previous page"
                >
                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                </Link>
            )}

            {/* Page Numbers */}
            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className="px-2 text-gray-500 hidden sm:inline">
                            ...
                        </span>
                    );
                }

                const pageNum = page as number;
                const isActive = pageNum === currentPage;

                return (
                    <Link
                        key={pageNum}
                        href={buildUrl(pageNum)}
                        className={`min-w-[44px] min-h-[44px] w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                            isActive
                                ? 'bg-shop-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {pageNum}
                    </Link>
                );
            })}

            {/* Next Button */}
            {currentPage < totalPages && (
                <Link
                    href={buildUrl(currentPage + 1)}
                    className="px-3 sm:px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Next page"
                >
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                </Link>
            )}
        </div>
    );
}
