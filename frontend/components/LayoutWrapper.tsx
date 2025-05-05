'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar';
import Footer from './Footer';
import StoreProvider from '@/app/reduxtoolkit/provider';

export default function LayoutWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname()
    const isAdmin = pathname.startsWith('/adminsite')

    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col">
                <StoreProvider>
                    <Navbar />
                    <main className="flex-grow">
                        {children}
                        {!isAdmin && <Footer />}
                    </main>
                </StoreProvider>
            </body>
        </html>
    );
}