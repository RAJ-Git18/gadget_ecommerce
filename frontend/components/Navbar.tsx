'use client'

import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const router = useRouter()

    const [search, setSearch] = useState('')
    const [showLogin, setShowLogin] = useState(false)
    const [isLogin, setIsLogin] = useState(true)


    // Login form state
    const [loginForm, setLoginForm] = useState({ email: '', password: '' })
    const [loginError, setLoginError] = useState<string | null>(null)
    const [loginLoading, setLoginLoading] = useState(false)

    // Register form state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        console.log(loginForm)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', loginForm, {
                headers: { 'Content-Type': 'application/json' },
            })

            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)

            console.log(response.data)

            if (response.data.message === 'Login successful') {
                setShowLogin(false)
                if (response.data.isadmin) {
                    router.push('/adminsite/dashboard')
                } else {
                    router.push('/')
                }
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
            console.log('Registered:', response.data)
            if (response.data.message === 'Register successfull') {
                setShowLogin(false)
            }
        } catch (err) {
            console.error('Unable to register', err)
        }
    }

    return (
        <div>
            <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-blue-600">Bits&Bytes</Link>

                <div className="flex items-center gap-36">
                    <div className="flex space-x-6 mb-2 font-semibold">
                        <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                        <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
                        <Link href="/shop" className="text-gray-700 hover:text-blue-600">Shop</Link>
                    </div>

                    <div className="w-full max-w-md">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => setShowLogin(true)}
                >
                    Login
                </button>
            </nav>

            {showLogin && (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                    <div className="w-full max-w-md">
                        <div className="flex justify-between rounded-t-lg overflow-hidden shadow-md">
                            <button
                                className={`w-1/2 py-2 font-semibold text-center border-b-2 transition-all duration-200 ${isLogin
                                    ? 'bg-white border-blue-600 text-blue-600'
                                    : 'bg-gray-200 border-transparent text-gray-600'}`}
                                onClick={() => setIsLogin(true)}
                            >
                                Login
                            </button>
                            <button
                                className={`w-1/2 py-2 font-semibold text-center border-b-2 transition-all duration-200 ${!isLogin
                                    ? 'bg-white border-blue-600 text-blue-600'
                                    : 'bg-gray-200 border-transparent text-gray-600'}`}
                                onClick={() => setIsLogin(false)}
                            >
                                Register
                            </button>
                        </div>

                        <div className="bg-white shadow-md rounded-b-lg border border-t-0 px-6 py-8">
                            {isLogin ? (
                                <form onSubmit={handleLoginSubmit} className="space-y-4">
                                    {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={loginForm.email}
                                        onChange={handleLoginChange}
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={loginForm.password}
                                        onChange={handleLoginChange}
                                        className="w-full border p-2 rounded"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                                        disabled={loginLoading}
                                    >
                                        {loginLoading ? 'Logging in...' : 'Login'}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                                    {registerError && <p className="text-red-500 text-sm text-center">{registerError}</p>}
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={registerForm.username}
                                        onChange={handleRegisterChange}
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder="First Name"
                                        value={registerForm.firstname}
                                        onChange={handleRegisterChange}
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="lastname"
                                        placeholder="Last Name"
                                        value={registerForm.lastname}
                                        onChange={handleRegisterChange}
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={registerForm.email}
                                        onChange={handleRegisterChange}
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={registerForm.password}
                                        onChange={handleRegisterChange}
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={registerForm.confirmPassword}
                                        onChange={handleRegisterChange}
                                        className="w-full border p-2 rounded"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                                    >
                                        Register
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
