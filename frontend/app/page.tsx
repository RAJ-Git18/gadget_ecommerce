'use client'

import { useState } from 'react'
import RegisterForm from '@/components/ui/RegisterForm'
import LoginForm from '@/components/ui/LoginForm'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        {/* Toggle Buttons */}
        <div className="flex justify-between rounded-t-lg overflow-hidden shadow-md">
          <button
            className={`w-1/2 py-2 font-semibold text-center border-b-2 transition-all duration-200 ${isLogin
                ? 'bg-white border-blue-600 text-blue-600'
                : 'bg-gray-200 border-transparent text-gray-600'
              }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 font-semibold text-center border-b-2 transition-all duration-200 ${!isLogin
                ? 'bg-white border-blue-600 text-blue-600'
                : 'bg-gray-200 border-transparent text-gray-600'
              }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Form Container (No top border) */}
        <div className="bg-white shadow-md rounded-b-lg border border-t-0 px-6 py-8">
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  )
}
