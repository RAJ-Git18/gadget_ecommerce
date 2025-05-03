'use client'

import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import axios from 'axios'
import Image from 'next/image'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

interface OrderInterface {
  order: {
    userid: string,
    orderid: string,
    status: string
  },
  product: { name: string, image: string },
  quantity: number,
  price: string,
}

const Page = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [orderItems, setOrderItems] = useState<OrderInterface[]>([])

  useEffect(() => {
    setIsLoading(true)
    const getCustomerOrder = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getcutomerorder/`)
        if (response.status === 200) {
          setOrderItems(response.data.message) // Adjust based on actual response structure
        }
      } catch (error: any) {
        alert('Orders are unavailable at the moment')
      } finally {
        setIsLoading(false)
      }
    }

    getCustomerOrder()
  }, [])

  const statusOptions = ['pending', 'completed', 'cancelled']

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedOrders = [...orderItems]
    updatedOrders[index].order.status = newStatus
    setOrderItems(updatedOrders)
    // Optionally: send update to backend
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div className="ml-[240px] mt-20 p-6 w-[calc(100%-240px)] min-h-screen bg-gray-100 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#0148B2]"> Orders</h2>

      <div className="flex flex-col gap-6">
        {orderItems.length > 0 ? (
          orderItems.map((item, index) => {
            const totalPrice = (parseFloat(item.price) * item.quantity).toFixed(2)

            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mx-20">

                {/* Left: Image + Quantity */}
                <div className="flex flex-col items-center w-28">
                  {item.product.image ? (
                    <Image
                      src={`${apiUrl}/api${item.product.image}`}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="object-cover rounded-md mb-2"
                      unoptimized
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded mb-2">
                      <span className="text-gray-500 text-xs">No Image</span>
                    </div>
                  )}
                  <p className="text-sm font-medium">Qty: {item.quantity}</p>
                </div>

                {/* Middle: Name, Order ID, User ID */}
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">Order ID: {item.order.orderid}</p>
                  <p className="text-sm text-gray-600">User ID: {item.order.userid}</p>
                </div>

                {/* Right: Price, Qty, Total, Status */}
                <div className="flex flex-col gap-1 text-sm text-right">
                  <p><span className="font-medium">Price:</span> ₹{item.price}</p>
                  <p><span className="font-medium">Quantity:</span> {item.quantity}</p>
                  <p><span className="font-medium">Total:</span> ₹{totalPrice}</p>

                  <div className="mt-1 flex items-center gap-3">
                    <label className="font-medium block mb-1">Status:</label>
                    <select
                      value={item.order.status}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      className="border rounded px-3 py-1 text-sm"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>
            )
          })
        ) : (
          <p>No orders found.</p>
        )}

      </div>
    </div>
  )
}

export default Page
