'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
    const router = useRouter()
    const [isloggedin, setisloggedin] = useState(false)
    const [search, setSearch] = useState('')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        localStorage.getItem('status') === 'Logged In' && setisloggedin(true)
    }, [])

    const handleLogout = () => {
        setisloggedin(false)
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('status')
        localStorage.removeItem('userid')
        router.push('/')
    }

    return (
        <nav className="bg-white/80 shadow-md px-6 md:px-20 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md border-b border-gray-200">
            <Link href="/" className="text-xl font-bold text-gray-800">
            <Image src='/images/logo.png' height={100} width={100} alt='Logo'   />
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none">
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-36">
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

            {/* Desktop right section */}
            <div className="hidden md:flex items-center gap-5">
                <button
                    onClick={() => router.push('/cart')}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ShoppingCart size={32} />
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

            {/* Mobile menu dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden flex flex-col px-6 py-4 space-y-4 z-40">
                    <Link href="/" className="text-gray-900 hover:text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link href="/about" className="text-gray-900 hover:text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                    <Link href="/shop" className="text-gray-900 hover:text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />

                    <div className="flex items-center justify-between mt-2">
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false)
                                router.push('/cart')
                            }}
                            className="p-3 rounded-full hover:bg-gray-100"  // Increased padding from p-2 to p-3
                        >
                            <ShoppingCart size={24} />  
                        </button>
                        {!isloggedin ? (
                            <button
                                className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                                onClick={() => {
                                    setIsMobileMenuOpen(false)
                                    router.push('/login')
                                }}
                            >
                                Login
                            </button>
                        ) : (
                            <button
                                className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                                onClick={() => {
                                    setIsMobileMenuOpen(false)
                                    handleLogout()
                                }}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
