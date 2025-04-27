'use client'

import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'

export default function Navbar() {
    const router = useRouter()

    const [search, setSearch] = useState('')
    const [showLogin, setShowLogin] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [loginForm, setLoginForm] = useState({ email: '', password: '' })
    const [loginError, setLoginError] = useState<string | null>(null)
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginstatus, setloginstatus] = useState(false)
    const [registerForm, setRegisterForm] = useState({
        username: '', firstname: '', lastname: '', email: '', password: '', confirmPassword: ''
    })
    const [registerError, setRegisterError] = useState<string | null>(null)

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { email, password } = loginForm

        if (!email || !password) return setLoginError('Email and password are required.')
        if (password.length < 6) return setLoginError('Password must be at least 6 characters.')

        setLoginError(null)
        setLoginLoading(true)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', loginForm, {
                headers: { 'Content-Type': 'application/json' },
            })

            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            localStorage.setItem('status', response.data.status)

            if (response.data.message === 'Login successful') {
                setloginstatus(true)
                setShowLogin(false)
                router.push(response.data.is_admin ? '/adminsite/dashboard' : '/')
            }
        } catch (err: any) {
            setLoginError(err.response?.data?.detail || 'Invalid email or password.')
        } finally {
            setLoginLoading(false)
        }
    }

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
    }

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { username, firstname, lastname, email, password, confirmPassword } = registerForm

        if (!username || !firstname || !lastname || !email || !password || !confirmPassword) {
            return setRegisterError('All fields are required.')
        }
        if (password.length < 6) return setRegisterError('Password must be at least 6 characters long.')
        if (password !== confirmPassword) return setRegisterError('Passwords do not match.')

        setRegisterError(null)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', registerForm, {
                headers: { 'Content-Type': 'application/json' }
            })
            if (response.data.message === 'Register successfull') {
                setShowLogin(false)
            }
        } catch (err) {
            console.error('Unable to register', err)
        }
    }

    const handleLogout = () => {
        setloginstatus(false)
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
                    {!loginstatus ? (
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
