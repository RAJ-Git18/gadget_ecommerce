'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
    const router = useRouter()

    const [isLogin, setIsLogin] = useState(true)

    const [loginForm, setLoginForm] = useState({ email: '', password: '' })
    const [loginError, setLoginError] = useState<string | null>(null)
    const [isLoading, setisLoading] = useState(false)



    const [isLoggedIn, setLoggedIn] = useState(false)


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
        setisLoading(true)
        const { email, password } = loginForm

        if (!email || !password) return setLoginError('Email and password are required.')
        if (password.length < 6) return setLoginError('Password must be at least 6 characters.')

        setLoginError(null)

        try {
            const response = await axios.post(`${apiUrl}/api/login/`, loginForm, {
                headers: { 'Content-Type': 'application/json' },
            })

            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            localStorage.setItem('status', response.data.status)

            if (response.data.message === 'Login successful') {

                setLoggedIn(true)

                if (response.data.is_admin) {
                    window.location.href = '/adminsite/dashboard'

                } else {
                    router.replace('/')
                    window.location.href = '/'
                }

            }
        } catch (err: any) {
            setLoginError(err.response?.data?.detail || 'Invalid email or password.')
        } finally {
            setisLoading(false)
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
            const response = await axios.post(`${apiUrl}/api/register/`, registerForm, {
                headers: { 'Content-Type': 'application/json' }
            })
            if (response.data.message === 'Register successfull') {
                router.push('/login')
            }
        } catch (err) {
            console.error('Unable to register', err)
        }
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md">
                <div className="flex justify-between rounded-t-lg overflow-hidden shadow-md">
                    <button
                        className={`w-1/2 py-2 font-semibold text-center border-b-2 transition-all duration-200 ${isLogin
                            ? 'bg-white border-slate-900 text-slate-900'
                            : 'bg-gray-200 border-transparent text-gray-600'}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`w-1/2 py-2 font-semibold text-center border-b-2 transition-all duration-200 ${!isLogin
                            ? 'bg-white border-slate-900 text-slate-900'
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
                                className="w-full bg-slate-900 text-white py-2 rounded hover:bg-gray-950 transition"

                            >
                                Login
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
                                className="w-full bg-slate-900 text-white py-2 rounded hover:bg-gray-950 transition"
                            >
                                Register
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
