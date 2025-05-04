'use client'

import Image from 'next/image'
import React, { useState } from 'react'

const PaymentPage = () => {
  const [isPaid, setIsPaid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Sample payment data
  const paymentDetails = {
    amount: '450.00',
    currency: 'USD',
    merchant: 'Example Store',
    paymentId: 'PAY-789456123',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(), // Tomorrow's date
  }

  const handlePaymentConfirmation = () => {
    setIsLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsPaid(true)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mt-28 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          {!isPaid ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Complete Your Payment</h2>
                <p className="mt-2 text-gray-600">Scan the QR code to pay</p>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex flex-col items-center">
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg mb-4">
                    <Image
                      src="/images/qr.png"
                      height={200}
                      width={200}
                      alt="Payment QR Code"
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-500">Scan with your mobile payment app</p>
                </div>

                <div className="flex-1">
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Merchant</span>
                        <span className="font-medium">{paymentDetails.merchant}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount</span>
                        <span className="font-bold text-indigo-600">
                          {paymentDetails.currency} {paymentDetails.amount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment ID</span>
                        <span className="font-mono text-sm">{paymentDetails.paymentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date</span>
                        <span>{paymentDetails.dueDate}</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handlePaymentConfirmation}
                        disabled={isLoading}
                        className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isLoading ? 'Processing...' : 'I have made the payment'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Payment Successful!</h3>
              <p className="mt-2 text-gray-600">
                Thank you for your payment. Your order is being processed.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsPaid(false)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Make another payment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentPage