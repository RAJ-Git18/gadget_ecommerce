'use client'

import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const router = useRouter()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [showloginform, setshowloginform] = useState(true)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const { email, password } = form

        if (!email || !password) {
            return setError('Email and password are required.')
        }

        if (password.length < 6) {
            return setError('Password must be at least 6 characters.')
        }

        setError(null)
        setLoading(true)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', form, {
                headers: { 'Content-Type': 'application/json' },
            })

            // You can store a token here if your backend returns one
            // localStorage.setItem('token', response.data.token)

            router.push('/dashboard') // ✅ redirect to dashboard or homepage
        } catch (err: any) {
            console.error(err)
            setError(err.response?.data?.detail || 'Invalid email or password.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-h-fit flex items-center justify-center bg-gray-100 max-w-fit">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 w-full max-w-md space-y-4"
            >

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    )
}
