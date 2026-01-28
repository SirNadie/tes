import type { ReactNode } from 'react';
import { Sidebar, Header } from '@/components/admin';

export default function AdminLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <div className="h-screen flex overflow-hidden bg-background-video text-white">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full relative overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
                    {children}
                </div>
            </main>
        </div>
    );
}
