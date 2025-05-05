'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Trash } from 'lucide-react'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

interface Inquiry {
    contactid: string
    name: string
    email: string
    message: string
    created_at: string
}

const AdminInquiries = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([])

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/getinquiries/`)
                if (response.status === 200) {
                    setInquiries(response.data.message || [])
                }
            } catch (error: any) {
                alert('Failed to load inquiries.')
            }
        }

        fetchInquiries()
    }, [])

    const DeleteInquiry = async (contactid: string) => {
        try {
            const response = await axios.delete(`${apiUrl}/api/deleteinquiries/${contactid}/`)
            if (response.status === 200) {
                // Remove the deleted inquiry from UI
                setInquiries((prev) => prev.filter((inquiry) => inquiry.contactid !== contactid))
            }
        } catch (e) {
            console.error('Failed to delete inquiry:', e)
        }
    }

    return (
        <div className="ml-[240px] mt-20 p-6 w-[calc(100%-240px)] min-h-screen bg-gray-100 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#0148B2]">Customer Inquiries</h2>

            <div className="flex flex-col gap-4">
                {inquiries.length > 0 ? (
                    inquiries.map((inquiry) => (
                        <div
                            key={inquiry.contactid}
                            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition border border-gray-200 flex justify-between items-center"
                        >
                            <div className="flex flex-col">
                                <h3 className="text-lg font-semibold text-blue-700">{inquiry.name}</h3>
                                <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {inquiry.email}</p>
                                <p className="text-gray-800">{inquiry.message}</p>
                            </div>

                            <div className="text-xs text-gray-500">{new Date(inquiry.created_at).toLocaleString()}</div>

                            <button onClick={() => DeleteInquiry(inquiry.contactid)} className="text-red-500 hover:text-red-700 ml-4">
                                <Trash />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No inquiries found.</p>
                )}
            </div>
        </div>
    )
}

export default AdminInquiries
