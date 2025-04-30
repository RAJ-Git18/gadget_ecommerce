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
            <div className="w-[15%] bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
                <ul className="space-y-4">
                    <Link href='/adminsite/dashboard'><li className="hover:text-gray-300 cursor-pointer">Dashboard</li>
                    </Link>
                    <Link href='/adminsite/product'><li className="hover:text-gray-300 cursor-pointer">Products</li>
                    </Link>
                    <Link href='/adminsite/users'><li className="hover:text-gray-300 cursor-pointer">Users</li>
                    </Link>
                </ul>
            </div>

            {/* Main Content */}
            {children}
        </div>
    );
}
