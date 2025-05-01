'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'

export default function Navbar() {
    const router = useRouter()
    const [isloggedin, setisloggedin] = useState(false)
    const [search, setSearch] = useState('')

    useEffect(() => {
        localStorage.getItem('status') === 'Logged In' && setisloggedin(true)
    }, [])

    const handleLogout = () => {
        setisloggedin(false)
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('status')
        router.push('/')
    }

    return (
        <nav className="bg-white/80 shadow-md px-20 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md border-b border-gray-200">
            <Link href="/" className="text-xl font-bold text-gray-800">Bits&Bytes</Link>

            <div className="flex items-center gap-36">
                <div className="flex space-x-6 font-semibold">
                    <Link href="/" className="text-gray-900 hover:text-slate-700 transition-colors">Home</Link>
                    <Link href="/about" className="text-gray-900 hover:text-slate-700 transition-colors">About</Link>
                    <Link href="/shop" className="text-gray-900 hover:text-slate-700 transition-colors">Shop</Link>
                </div>

                <div className="w-full max-w-md">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                </div>
            </div>

            <div className="flex items-center gap-5">
                <button
                    onClick={() => router.push('/cart')}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ShoppingCart className="h-6 w-6" />
                </button>
                {!isloggedin ? (
                    <button
                        className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={() => router.push('/login')}
                    >
                        Login
                    </button>
                ) : (
                    <button
                        className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    )
}