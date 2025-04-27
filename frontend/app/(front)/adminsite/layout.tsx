'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const access_token = localStorage.getItem('access');
        const refresh_token = localStorage.getItem('refresh');

        if (!access_token) {
            router.push('/');
            return;
        }

        const checkAdmin = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/protected/', {
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
                    const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                        refresh: refresh_token
                    });

                    localStorage.setItem('access', response.data.access);
                    router.push('/adminsite/dashboard');
                } catch (e) {
                    console.error('Refresh token invalid:', e);
                    router.push('/');
                }
            } finally {
                setIsLoading(false);  // Always stop loading after all tries
            }
        };

        checkAdmin();
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <div className="text-2xl font-bold text-gray-800">Loading...</div>
            </div>
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
                    <li className="hover:text-gray-300 cursor-pointer">Dashboard</li>
                    <li className="hover:text-gray-300 cursor-pointer">Products</li>
                    <li className="hover:text-gray-300 cursor-pointer">Users</li>
                </ul>
            </div>

            {/* Main Content */}
            {children}
        </div>
    );
}
