'use client'

import axios from 'axios'
import { useState } from 'react'

export default function RegisterForm() {
    const [form, setForm] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { username, firstname, lastname, email, password, confirmPassword } = form

        // Simple validations
        if (!username || !firstname || !lastname || !email || !password || !confirmPassword) {
            return setError('All fields are required.')
        }

        if (password.length < 6) {
            return setError('Password must be at least 6 characters long.')
        }

        if (password !== confirmPassword) {
            return setError('Passwords do not match.')
        }

        setError(null)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', form,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            console.log('Form submitted:', response.data)
        } catch (error) {
            console.error('Unable to submit the form', error)
        }


    }

    return (
        <div className="max-h-fit flex items-center justify-center max-w-fit bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 w-full max-w-md space-y-4">
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={form.firstname}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={form.lastname}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

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

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Register
                </button>
            </form>
        </div>
    )
}
