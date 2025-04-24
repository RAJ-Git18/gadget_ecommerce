'use client'
import React, { useEffect } from 'react'
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

  useEffect(() => {
    const access = localStorage.getItem('access')

    if (!access) {
      router.push('/')
      return
    }

    try {
      const decoded_token = jwtDecode<MyTokenPayload>(access)
      console.log(decoded_token);
      (decoded_token.user_id === admin_id) ? router.push('/adminsite/dashboard') : router.push('/')
    } catch (e) {
      console.error('error in loading the dashboard', e)
      router.push('/')
    }

  }, [])

  return (
    <div>
      i am dashboard
    </div>
  )
}

export default Page
