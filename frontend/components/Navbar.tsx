'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '../app/reduxtoolkit/store';
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Navbar() {
    const cartCount = useSelector((state: RootState) => state.cart.cartCount)
    const router = useRouter()
    const [isloggedin, setisloggedin] = useState(false)
    const [search, setSearch] = useState('')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        localStorage.getItem('status') === 'Logged In' && setisloggedin(true)
    }, [])

    const handleLogout = async () => {
        setisloggedin(false)
        try {
            const response = await axios.patch(`${apiUrl}/api/logout/`, {
                userid: localStorage.getItem('userid'),
                cartcount: localStorage.getItem('cartcount')
            })
            if (response.status === 200) {
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                localStorage.removeItem('status')
                localStorage.removeItem('userid')
                localStorage.removeItem('isadmin')
                localStorage.removeItem('cartcount')
                router.push('/')
            }
        } catch (error: any) {
            alert('Cannot logout now')
        }

    }

    return (
        <nav className="bg-[#FEFEFE] shadow-md px-6 md:px-20 py-2  flex items-center justify-between fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md border-b border-gray-200">
            <Link href="/" className="text-xl font-bold text-gray-800">
                <Image src='/images/logo.png' height={200} width={200} alt='Logo' />
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

                {
                    cartCount > 0 &&
                    <button className='bg-red-500 rounded-full px-2 absolute top-3 right-44 text-white'>
                        {/* {localStorage.getItem('cartcount')} */}
                        {cartCount}


                    </button>
                }


                <button
                    onClick={() => router.push('/cart')}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ShoppingCart size={32} />
                </button>
                {!isloggedin ? (
                    <button
                        className="bg-[#1050B2] font-semibold text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => router.push('/login')}
                    >
                        Login
                    </button>
                ) : (
                    <button
                        className="bg-[#1050B2] font-semibold text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
