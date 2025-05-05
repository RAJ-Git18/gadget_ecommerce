'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        const access_token = localStorage.getItem('access');
        const refresh_token = localStorage.getItem('refresh');

        if (!access_token) {
            router.push('/');
            return;
        }

        const checkAdmin = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/protected/`, {
                    headers: { Authorization: `Bearer ${access_token}` }
                });

                if (response.data.message) {
                    setIsAuthorized(true);
                } else {
                    router.push('/');
                }
            } catch (e) {
                console.error("Access token invalid, trying refresh...", e);
                // window.location.reload()
                try {
                    const response = await axios.post(`${apiUrl}/api/token/refresh/`, {
                        refresh: refresh_token
                    });

                    localStorage.setItem('access', response.data.access);
                    router.push('/adminsite/dashboard');
                } catch (e) {
                    console.error('Refresh token invalid:', e);
                    router.push('/login');
                }
            } finally {
                setIsLoading(false);  // Always stop loading after all tries
            }
        };

        checkAdmin();
    }, [router]);

    if (isLoading) {
        return (
            <Loader />
        );
    }

    if (!isAuthorized) {
        return null; // Don't render anything if not authorized
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="fixed left-0 top-20 h-screen w-64 bg-gray-800 text-white shadow-lg z-50">
                {/* Sidebar Header */}
                <div className="p-5 border-b border-gray-700">
                    <h1 className="text-2xl font-bold">
                        <span className="text-blue-400">Bits</span>
                        <span className="text-cyan-300">&</span>
                        <span className="text-blue-400">Bytes</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
                </div>

                {/* Navigation Menu */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/adminsite/dashboard"
                                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <span className="mr-3">📊</span>
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/adminsite/product"
                                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <span className="mr-3">💻</span>
                                Products
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/adminsite/orders"
                                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <span className="mr-3">📦</span> {/* Package icon for orders */}
                                Orders
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/adminsite/inquiry"
                                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <span className="mr-3">📦</span> {/* Package icon for orders */}
                                Inquiries
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Toggle Button (only shows on small screens) */}
                <button
                    className="md:hidden absolute -right-12 top-4 p-2 bg-gray-800 rounded-r-lg"
                    onClick={() => {/* Add toggle function here */ }}
                >
                    ≡
                </button>
            </div>
            {/* Main Content */}
            {children}
        </div>
    );
}
