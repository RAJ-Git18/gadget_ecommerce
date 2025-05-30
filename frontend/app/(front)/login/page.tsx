'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/reduxtoolkit/store'
import { useDispatch } from 'react-redux'
import { showLogout } from '@/app/reduxtoolkit/loginStatus/loginSlice'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default function LoginPage() {
    const router = useRouter()

    const dispatch = useDispatch()
    const { isloggedIn } = useSelector((state: RootState) => state.login)

    const [isLogin, setIsLogin] = useState(true)

    const [loginForm, setLoginForm] = useState({ email: '', password: '' })
    const [loginError, setLoginError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    // const [isLoggedIn, setLoggedIn] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null)

    const [registerForm, setRegisterForm] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        password: '',
        confirmPassword: '',
    })
    const [registerError, setRegisterError] = useState<string | null>(null)

    useEffect(() => {
        const storedPhone = localStorage.getItem('phonenumber')
        if (storedPhone) {
            setPhoneNumber(storedPhone)
        }
    }, [isloggedIn])

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const { email, password } = loginForm

        if (!email || !password) {
            setLoginError('Email and password are required.')
            setIsLoading(false)
            return
        }
        if (password.length < 6) {
            setLoginError('Password must be at least 6 characters.')
            setIsLoading(false)
            return
        }

        setLoginError(null)

        try {
            const response = await axios.post(`${apiUrl}/api/login/`, loginForm, {
                headers: { 'Content-Type': 'application/json' },
            })

            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            localStorage.setItem('status', response.data.status)
            localStorage.setItem('userid', response.data.userid)
            localStorage.setItem('cartcount', response.data.cartcount)
            // localStorage.setItem('phonenumber', response.data.phonenumber)

            setPhoneNumber(response.data.phonenumber)

            if (response.data.message === 'Login successful') {
                dispatch(showLogout())
                // setLoggedIn(true)
                setLoginForm({ email: '', password: '' }) // ✅ Clear form after success

                if (response.data.is_admin) {
                    localStorage.setItem('isadmin', 'admin')
                    window.location.href = '/adminsite/dashboard'
                } else {
                    localStorage.setItem('isadmin', 'user')
                    window.location.href = '/'
                }
            }
        } catch (err: any) {
            setLoginError(err.response?.data?.detail || 'Invalid email or password.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
    }

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const {
            username,
            firstname,
            lastname,
            email,
            phonenumber,
            password,
            confirmPassword,
        } = registerForm

        if (!username || !firstname || !lastname || !email || !phonenumber || !password || !confirmPassword) {
            return setRegisterError('All fields are required.')
        }

        if (!/^(97|98)\d{8}$/.test(phonenumber)) {
            return setRegisterError('Enter a valid Nepali phone number (starts with 97 or 98)')
        }

        if (password.length < 6) return setRegisterError('Password must be at least 6 characters long.')
        if (password !== confirmPassword) return setRegisterError('Passwords do not match.')

        setRegisterError(null)

        try {
            const response = await axios.post(`${apiUrl}/api/register/`, registerForm, {
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.data.message === 'Register successfull') {
                setRegisterForm({
                    username: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    phonenumber: '',
                    password: '',
                    confirmPassword: '',
                })
                router.push('/login')
            }
        } catch (err) {
            console.error('Unable to register', err)
            setRegisterError('Registration failed. Try again later.')
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md">
                <div className="flex justify-between rounded-t-lg overflow-hidden shadow-md">
                    <button
                        className={`w-1/2 py-2 font-semibold text-center border-b-2 transition-all duration-200 ${isLogin
                            ? 'bg-white border-slate-900 text-slate-900'
                            : 'bg-gray-200 border-transparent text-gray-600'
                            }`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`w-1/2 py-2 font-semibold text-center border-b-2 transition-all duration-200 ${!isLogin
                            ? 'bg-white border-slate-900 text-slate-900'
                            : 'bg-gray-200 border-transparent text-gray-600'
                            }`}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-b-lg border border-t-0 px-6 py-8">
                    {isloggedIn && phoneNumber && (
                        <p className="text-green-600 text-center mb-4">
                            Logged in phone number: {phoneNumber}
                        </p>
                    )}
                    {isLogin ? (
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            {loginError && (
                                <p className="text-red-500 text-sm text-center">{loginError}</p>
                            )}
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
                            {registerError && (
                                <p className="text-red-500 text-sm text-center">{registerError}</p>
                            )}
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
                                type="text"
                                name="phonenumber"
                                placeholder="Phone number"
                                value={registerForm.phonenumber}
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
