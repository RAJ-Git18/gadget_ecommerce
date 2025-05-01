'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from 'axios';
import Loader from './Loader';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ProductDataInterface {
  productid: string;
  name: string;
  price: string;
  stock: string;
  category: 'featured' | 'best';
  details: string;
  image: string | null;
}

const CarouselBestProducts = () => {
  const [productData, setproductData] = useState<ProductDataInterface[]>([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setisLoading(true)
      try {
        const response = await axios.get(`${apiUrl}/api/getproducts/`);
        if (response.status === 200) {
          // Filter to only include featured products
          const featuredProducts = response.data.message.filter(
            (product: ProductDataInterface) => product.category === 'best'
          );
          setproductData(featuredProducts);
        }
      } catch (error: any) {
        alert('Please try again.');
      } finally {
        setisLoading(false);
      }
    };
    getProduct();
  }, []);

  if (isLoading) {
    return (
      <div className=" flex justify-center h-72 items-center">
        <Loader />
      </div>
    );
  }

  if (productData.length === 0) {
    return (
      <div className="w-full mx-auto py-10 text-center">
        <p className="text-gray-500">No featured products available</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto py-10">
      <Carousel className="w-full">
        <CarouselContent>
          {productData.map((item) => (
            <CarouselItem key={item.productid} className="md:basis-1/2 lg:basis-1/5 border-2 mx-2">
              <div className="relative w-full h-64 p-2">
                {item.image && (
                  <Image
                    src={`${apiUrl}/api${item.image}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    alt={item.name}
                    className="rounded-lg"
                    unoptimized
                  />
                )}
              </div>
              <div className="border-t border-gray-300 mx-4 my-2"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">{item.details}</p>
              </div>
              <div className="border-t border-gray-300 mx-4 my-2"></div>
              <div className="flex justify-between items-center px-4 pb-4">
                <div className="text-gray-700 font-semibold">Price: Rs. {item.price}</div>
                <div className="flex gap-2">
                  <Heart className="text-gray-600 cursor-pointer hover:text-red-500" />
                  <ShoppingCart className="text-gray-600 cursor-pointer hover:text-green-500" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselBestProducts;