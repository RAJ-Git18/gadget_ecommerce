'use client'
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'

const admin_id = 'f1223fbb-0772-4ba2-a21c-61cde68a7070'

type MyTokenPayload = {
  user_id: string;
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
};

const Page = () => {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const access = localStorage.getItem('access')

    if (!access) {
      router.push('/')
      return
    }

    try {
      const decoded_token = jwtDecode<MyTokenPayload>(access)
      console.log(decoded_token)

      if (decoded_token.user_id === admin_id) {
        setIsAuthorized(true)
      } else {
        router.push('/')
      }
    } catch (e) {
      console.error('error in loading the dashboard', e)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    )
  }

  return isAuthorized ? (
    <div>
      i am dashboard
    </div>
  ) : null
}

export default Page
