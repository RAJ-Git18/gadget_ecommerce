'use client'

import React, { useState } from 'react'
import { FiSend, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi'
import { motion } from 'framer-motion'
import ResolvingViewport from 'next/dist/lib/metadata/types/metadata-interface.js';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ContactUs = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await axios.post(`${apiUrl}/api/contactus/`, form,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.status === 200) {
                setTimeout(() => {
                    alert('Thank you for your message! We\'ll get back to you soon.')
                    setForm({ name: '', email: '', message: '' })
                    setIsSubmitting(false)
                }, 1500)
            }
        } catch (error: any) {
            alert('Please try again')
        }

       
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Get in <span className="text-blue-600">Touch</span>
                    </motion.h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions about our gadgets? Our tech experts are ready to help you find the perfect solution.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white p-8 rounded-2xl shadow-lg"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="text-gray-400" />
                                </div>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-400" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Your Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute top-3 left-3">
                                    <FiMessageSquare className="text-gray-400" />
                                </div>
                                <textarea
                                    name="message"
                                    rows={5}
                                    placeholder="Your Message"
                                    value={form.message}
                                    onChange={handleChange}
                                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex items-center justify-center w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition ${isSubmitting ? 'opacity-70' : ''}`}
                            >
                                {isSubmitting ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        <FiSend className="mr-2" />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-blue-600 text-white p-8 rounded-2xl shadow-lg"
                    >
                        <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-500 p-3 rounded-lg">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium">Our Location</h3>
                                    <p className="mt-1 text-blue-100">Tech Street, Kathmandu 44600, Nepal</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-500 p-3 rounded-lg">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium">Phone Number</h3>
                                    <p className="mt-1 text-blue-100">+977 9801234567</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-500 p-3 rounded-lg">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium">Email Address</h3>
                                    <p className="mt-1 text-blue-100">support@gadgethub.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-blue-500">
                            <h3 className="text-lg font-medium mb-4">Business Hours</h3>
                            <ul className="space-y-2">
                                <li className="flex justify-between text-blue-100">
                                    <span>Monday - Friday</span>
                                    <span>9:00 AM - 6:00 PM</span>
                                </li>
                                <li className="flex justify-between text-blue-100">
                                    <span>Saturday</span>
                                    <span>10:00 AM - 4:00 PM</span>
                                </li>
                                <li className="flex justify-between text-blue-100">
                                    <span>Sunday</span>
                                    <span>Closed</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs