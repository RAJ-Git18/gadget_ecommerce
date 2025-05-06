'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Menu, X, User } from 'lucide-react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '../app/reduxtoolkit/store'
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AdminNavbar() {
    const router = useRouter()
    const [isloggedin, setisloggedin] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [toggleUserIcon, settoggleUserIcon] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        localStorage.getItem('status') === 'Logged In' && setisloggedin(true)

        // Handle outside click
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                settoggleUserIcon(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
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
        } catch (error) {
            alert('Cannot logout now')
        }
    }

    return (
        <nav className="bg-[#FEFEFE] shadow-md px-6 md:px-20 py-2 flex items-center justify-between fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-200">
            <Link href="/" className="text-xl font-bold text-gray-800">
                <Image src="/images/logo.png" height={200} width={200} alt="Logo" />
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none">
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-60">
                <div className="flex space-x-6 font-semibold">
                    <Link href="/" className="text-gray-900 hover:text-slate-700">Home</Link>
                    <Link href="/about" className="text-gray-900 hover:text-slate-700">About</Link>
                    <Link href="/contact" className="text-gray-900 hover:text-slate-700">Contact</Link>
                    <Link href="/products" className="text-gray-900 hover:text-slate-700">Products</Link>
                </div>
            </div>

            {/* Desktop right section */}
            <div className="hidden md:flex items-center gap-5 relative" ref={dropdownRef}>
   
                <button
                    onClick={() => router.push('/cart')}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <ShoppingCart size={28} />
                </button>

                {!isloggedin ? (
                    <button
                        className="bg-[#1050B2] font-semibold text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        onClick={() => router.push('/login')}
                    >
                        Login
                    </button>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => settoggleUserIcon(prev => !prev)}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <User size={28} />
                        </button>

                        {toggleUserIcon && (
                            <div className="absolute right-0 mt-2 w-44 bg-white shadow-md border rounded-md z-50 py-2 text-sm">
                                <button onClick={() => router.push('/adminsite/dashboard')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Dashboard</button>
                                <button onClick={() => router.push('/adminsite/product')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Products</button>
                                <button onClick={() => router.push('/adminsite/orders')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Orders</button>
                                    <button onClick={() => router.push('/adminsite/inquiry')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Inquiries</button>
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile menu dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden flex flex-col px-6 py-4 space-y-4 z-40">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 hover:text-slate-700">Home</Link>
                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 hover:text-slate-700">About</Link>
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 hover:text-slate-700">Contact</Link>
                    <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 hover:text-slate-700">Products</Link>

                    <div className="flex items-center justify-between mt-2">
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false)
                                router.push('/cart')
                            }}
                            className="p-3 rounded-full hover:bg-gray-100"
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
