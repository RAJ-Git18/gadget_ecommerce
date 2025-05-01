'use client'

import Image from 'next/image';
import CarouselBestProducts from '@/components/CarouselBestProducts';

export default function HomePage() {

  const scrollToPosition = () => {
    window.scrollTo({
      top: 700,        // pixels from the top
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full flex flex-col items-center mt-24">

      {/* Hero Image */}
      <div className="relative w-[90%] h-[600px]">
        <Image
          src="/images/mackbook_front_poster.png"
          fill
          objectFit="cover"
          alt="Macbook Front Poster"
        />

        <button
          className="bg-white z-10 absolute bottom-5 right-5 p-4 rounded-lg text-black shadow-md"
          onClick={scrollToPosition}
        >Get Started</button>
      </div>

      {/* Best Selling Products Section */}
      <div className="w-full py-10">
        <h2 className="text-center text-3xl font-bold mb-6">Best Selling Products</h2>
        <div className="max-w-6xl mx-auto px-4">
          <CarouselBestProducts />
        </div>
      </div>

    </div>
  )
}
