'use client';

import React from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { cartIncrement } from '@/app/reduxtoolkit/cart/cartSlice';
import { fetchProducts } from '@/app/reduxtoolkit/product/productSlice';
import { AppDispatch, RootState } from '@/app/reduxtoolkit/store';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const CarouselFeaturedProducts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { fetchedProducts, isLoading } = useSelector((state: RootState) => state.product);

    React.useEffect(() => {
        if (!fetchedProducts || fetchedProducts.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, fetchedProducts]);

    const AddToCart = async (productid: string) => {
        if (localStorage.getItem('isadmin') === 'admin') {
            alert('Admin cannot add products to cart.');
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/api/addtocart/`, {
                userid: localStorage.getItem('userid'),
                productid,
            });

            if (response.status === 201) {
                dispatch(cartIncrement());
            }
        } catch (error) {
            console.error(error);
            window.location.reload();
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center h-72 items-center">
                <Loader />
            </div>
        );
    }

    const featuredProducts = fetchedProducts.filter((item) => item.displayas === 'featured');

    if (featuredProducts.length === 0) {
        return (
            <div className="w-full mx-auto py-10 text-center">
                <p className="text-gray-500">No featured products available</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto py-10 px-4">
            <Carousel
                opts={{
                    align: "start",
                    slidesToScroll: "auto",
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2">
                    {featuredProducts.map((item) => (
                        <CarouselItem key={item.productid} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                            <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                                {/* Image */}
                                <div className="relative h-64 w-full overflow-hidden">
                                    {item.image && (
                                        <Image
                                            src={`${apiUrl}/api${item.image}`}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            alt={item.name}
                                            className="group-hover:scale-105 transition-transform duration-500"
                                            unoptimized
                                        />
                                    )}
                                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                                        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                                    </button>
                                </div>

                                {/* Info */}
                                <div className="p-4 space-y-2">
                                    <h3 className="font-semibold text-lg text-gray-800 truncate">{item.name}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">{item.details}</p>
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                                        <button
                                            onClick={() => AddToCart(item.productid)}
                                            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="-left-10 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white" />
                <CarouselNext className="-right-10 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white" />
            </Carousel>
        </div>
    );
};

// export default CarouselFeaturedProducts;
