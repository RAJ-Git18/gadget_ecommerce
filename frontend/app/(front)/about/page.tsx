'use client'

import React from 'react'
import { FaShieldAlt, FaShippingFast, FaExchangeAlt, FaHeadset } from 'react-icons/fa'

const AboutUs = () => {
    return (
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        About <span className="text-blue-600">Bits&Bytes</span>
                    </h1>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
                            At Bits&Bytes, we're obsessed with technology. We curate the finest smartphones, laptops, wearables and accessories to bring you the future, today.
                        </p>
                        <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
                    </div>
                </div>

                {/* Story Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Founded in 2025 in the heart of Kathmandu, Bits&Bytes began as a small tech enthusiast's dream. Today, we're Nepal's fastest-growing tech retailer, serving thousands of happy customers nationwide.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            We bridge the gap between global innovation and Nepali consumers, ensuring you get authentic products at fair prices without the wait.
                        </p>
                    </div>
                    <div className="bg-blue-100 rounded-xl overflow-hidden shadow-lg">
                        <img
                            src="/images/about-showroom.png"
                            alt="Bits&Bytes Store"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Values Section */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Bits&Bytes?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <FaShippingFast className="text-blue-600 text-4xl mb-4" />,
                                title: "Fast Delivery",
                                desc: "Across Nepal in 1-3 business days"
                            },
                            {
                                icon: <FaShieldAlt className="text-blue-600 text-4xl mb-4" />,
                                title: "100% Genuine",
                                desc: "Authorized dealer for all brands"
                            },
                            {
                                icon: <FaExchangeAlt className="text-blue-600 text-4xl mb-4" />,
                                title: "Easy Returns",
                                desc: "15-day hassle-free return policy"
                            },
                            {
                                icon: <FaHeadset className="text-blue-600 text-4xl mb-4" />,
                                title: "Expert Support",
                                desc: "Tech specialists available 24/7"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex justify-center">{item.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission Section */}
                <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white">
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-lg leading-relaxed mb-6">
                        To democratize technology in Nepal by making premium gadgets accessible, affordable, and understandable for everyone.
                    </p>
                    <div className="bg-white h-1 w-16 mb-6"></div>
                    <p className="text-blue-100">
                        We believe in empowering our community through technology education and exceptional after-sales service.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs