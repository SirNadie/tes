import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: {
        default: 'The Everyday Shop',
        template: '%s | The Everyday Shop',
    },
    description: 'Discover a curated collection of well-designed goods that bring quality and intention to your daily rituals.',
    openGraph: {
        type: 'website',
        siteName: 'The Everyday Shop',
        images: ['/TESlogo.png'],
    },
    twitter: {
        card: 'summary_large_image',
    },
}

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                {/* Fonts - Preconnect for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                {/* Material Symbols */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
                    rel="stylesheet"
                />
                {/* Favicon - adapts to light/dark mode */}
                <link rel="icon" type="image/png" href="/TESlogo.png" media="(prefers-color-scheme: light)" />
                <link rel="icon" type="image/png" href="/TESlogo-white.png" media="(prefers-color-scheme: dark)" />
            </head>
            <body className="bg-background-light font-sans text-text-light">
                {children}
            </body>
        </html>
    )
}
