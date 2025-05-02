'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar';
import Footer from './Footer';

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
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                {!isAdmin && <Footer />}
            </body>
        </html>
    );
}