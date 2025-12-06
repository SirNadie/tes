import type { Metadata } from 'next'
import { Playfair_Display, Work_Sans } from 'next/font/google'
import '@/styles/globals.css'

const playfair = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-display',
    weight: ['400', '500', '600', '700'],
})

const workSans = Work_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-sans',
    weight: ['300', '400', '500', '600', '700'],
})

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
        <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${workSans.variable}`}>
            <head>
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
