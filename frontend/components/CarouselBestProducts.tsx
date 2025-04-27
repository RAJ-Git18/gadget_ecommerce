'use client';

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Image from 'next/image'
import { Heart, ShoppingCart } from 'lucide-react';

const images = [
  '/images/oneplus13r.png',
  '/images/oneplus13r.png',
  '/images/oneplus13r.png',
  '/images/oneplus13r.png',
  '/images/oneplus13r.png'
]

const CarouselBestProducts = () => {
  return (
    <div className="w-full mx-auto py-10 ">
      <Carousel className="w-full">
        <CarouselContent>
          {
            images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5 border-2 mx-2">
                <div className="relative w-full h-64 p-2 ">
                  <Image
                    src={image}
                    fill
                    objectFit="cover"
                    alt="Product Image"
                    className="rounded-lg"
                  />
                </div>

                {/* Horizontal line */}
                <div className="border-t border-gray-300 mx-4 my-2"></div>

                <div className="flex justify-between items-center px-4 pb-4">
                  <div className="text-gray-700 font-semibold">Price: ₹4000</div>
                  <div className="flex gap-2">
                    <Heart className="text-gray-600 cursor-pointer hover:text-red-500" />
                    <ShoppingCart className="text-gray-600 cursor-pointer hover:text-green-500" />
                  </div>
                </div>
              </CarouselItem>
            ))
          }
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CarouselBestProducts
