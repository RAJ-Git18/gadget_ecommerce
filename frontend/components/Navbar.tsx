'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'


export default function Navbar() {
    const router = useRouter()

    const [isloggedin, setisloggedin] = useState(false)

    useEffect(() => {
        localStorage.getItem('status') === 'Logged In' && setisloggedin(true)

    }, [])


    const [search, setSearch] = useState('')
    // const [loginstatus, setloginstatus] = useState(false)


    const handleLogout = () => {
        setisloggedin(false)
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('status')
    }



    return (
        <nav className="bg-white shadow-md px-20 py-3 flex items-center justify-between ">

            <Link href="/" className="text-xl font-bold text-gray-800">Bits&Bytes</Link>

            <div className="flex items-center gap-36">
                <div className="flex space-x-6 mb-2 font-semibold">
                    <Link href="/" className="text-gray-900 font-semibold hover:font-bold">Home</Link>
                    <Link href="/about" className="text-gray-900 font-semibold hover:font-bold">About</Link>
                    <Link href="/shop" className="text-gray-900 font-semibold hover:font-bold">Shop</Link>
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
                <ShoppingCart className="h-8 w-8" />
                {!isloggedin ? (
                    <button
                        className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-gray-950 transition"
                        onClick={() => router.push('/login')}
                    >
                        Login
                    </button>
                ) : (
                    <button
                        className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-gray-950 transition"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    )
}
