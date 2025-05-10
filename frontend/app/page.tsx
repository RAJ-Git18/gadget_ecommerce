'use client'

import Image from 'next/image'
import CarouselBestProducts from '@/components/CarouselBestProducts'
import { CarouselFeaturedProducts } from '@/components/CarouselFeaturedProducts'
import { useEffect } from 'react';

export default function HomePage() {
  const scrollToPosition = () => {
    window.scrollTo({
      top: 620,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToPosition()
    console.log('ia m here')
  }, [])
  

  return (
    <div className="w-full flex flex-col items-center mt-24">

      {/* Hero Image */}
      <div className="relative w-[95%] sm:w-[90%] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <Image
          src="/images/mackbook_front_poster.png"
          fill
          className="object-cover rounded-xl"
          alt="Macbook Front Poster"
          priority
        />

        <button
          className="bg-white text-sm sm:text-base z-10 absolute bottom-4 sm:bottom-6 right-4 sm:right-6 px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-black shadow-md hover:bg-gray-100 transition-all"
          onClick={scrollToPosition}
        >
          Get Started
        </button>
      </div>

      {/* Best Selling Products Section */}
      <div className="w-full py-10 px-4 sm:px-6 lg:px-0">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6">Best Selling Products</h2>
        <div className="max-w-6xl mx-auto">
          <CarouselBestProducts />
        </div>

        {/* Featured Products Section */}
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6 border-t pt-8">Featured Products</h2>
        <div className="max-w-6xl mx-auto">
          <CarouselFeaturedProducts />
        </div>
      </div>

    </div>
  )
}
