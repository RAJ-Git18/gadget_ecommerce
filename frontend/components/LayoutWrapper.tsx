'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';
import StoreProvider from '@/app/reduxtoolkit/provider';

export default function LayoutWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith('/adminsite');

    const [userType, setUserType] = useState<string | null>(null);

    useEffect(() => {
        const storedUserType = localStorage.getItem('isadmin');
        setUserType(storedUserType);
    }, []);

    // // Optional: Wait for userType to load (prevents flicker)
    // if (userType === null) {
    //     return null; // or a loader/spinner
    // }

    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col">
                <StoreProvider>
                    {userType === 'admin' ? <AdminNavbar /> : <Navbar />}
                    <main className="flex-grow">
                        {children}
                        {!isAdminRoute && <Footer />}
                    </main>
                </StoreProvider>
            </body>
        </html>
    );
}
