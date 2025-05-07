'use client';

import { cartIncrement } from '@/app/reduxtoolkit/cart/cartSlice';
import { AppDispatch, RootState } from '@/app/reduxtoolkit/store';
import axios from 'axios';
import React, { useEffect } from 'react';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { fetchProducts } from '@/app/reduxtoolkit/product/productSlice';
import { useParams } from 'next/navigation';
import Loader from './Loader';


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const categories = ['mobile', 'tv', 'laptop', 'watch']

const ProductCard = () => {
    const params = useParams()
    const category = Array.isArray(params.category) ? params.category[0] : params.category;
    const dispatch = useDispatch<AppDispatch>();
    const { fetchedProducts, isLoading, error } = useSelector((state: RootState) => state.product);

    React.useEffect(() => {
        dispatch(fetchProducts());
        console.log(category)
    }, [dispatch]);

    const AddToCart = async (productid: string) => {
        if (localStorage.getItem('isadmin') === 'admin') {
            alert('Admin cannot add products to cart.');
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/api/addtocart/`, {
                userid: localStorage.getItem('userid'),
                productid: productid,
            });

            if (response.status === 201) {
                dispatch(cartIncrement());
            }
        } catch (error) {
            console.error('Add to cart error:', error);
        }
    };
    if (isLoading) {
        return <div className="flex flex-col justify-center items-center h-screen w-screen pb-48">
            <Loader />
        </div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Error loading products: {error}</div>;
    }

    if (!fetchedProducts || fetchedProducts.length === 0) {
        return <div className="text-center py-10 text-gray-500">No products available</div>;
    }




    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(fetchedProducts
                .filter((product) =>
                    category === 'all' ||
                    category === undefined ||
                    !categories.includes(category) ||
                    product.category === category
                ))?.map((item) => (
                    <div
                        key={item.productid}
                        className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                        {/* Image Container */}
                        <div className="relative h-64 w-full overflow-hidden">
                            {item.image ? (
                                <Image
                                    src={`${apiUrl}/api${item.image}`}
                                    alt={item.name || 'Product image'}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">No Image</span>
                                </div>
                            )}

                            <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full">
                                <FiHeart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                            </button>
                        </div>

                        <div className="p-4">
                            <h3 className="text-lg font-medium text-gray-800 truncate mb-1">
                                {item.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                {item.details || 'No description available'}
                            </p>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-xl font-bold text-gray-900">
                                    ₹{parseFloat(item.price).toFixed(2)}
                                </span>
                                <button
                                    onClick={() => AddToCart(item.productid)}
                                    className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    <FiShoppingCart className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ProductCard;