'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash, X } from 'lucide-react';
import Loader from '@/components/Loader';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ProductDetailInteface {
  category: string;
  description: string;
  image: string | null;
  name: string;
  price: number;
  productid: string;
  stock: number;
}

interface CartDetailInterface {
  cartid: string;
  userid: string;
  productid: string;
  quantity: number;
  product: ProductDetailInteface;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartDetailInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBill, setshowBill] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('isadmin') === 'admin') {
      alert('Admin cannot add products to cart.');
      return;
    }

    const getCartItems = async () => {
      const userid = localStorage.getItem('userid');
      if (!userid) return;

      try {
        const response = await axios.get(`${apiUrl}/api/getcartitems/${userid}/`);
        if (response.status === 200) {
          setCartItems(response.data);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getCartItems();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <Loader />
      </div>
    );
  }



  const totalamount = cartItems.reduce((sum: number, item) => (
    sum + item.quantity * item.product.price

  ), 0)


  if (showBill) {
    return (
      <div className="h-fit w-1/3 mx-auto backdrop-blur-sm text-black m-32 px-7 py-3 rounded-lg shadow-md">
        <div className="flex justify-between border-b pb-3">
          <Image src='/images/logo.png' height={100} width={120} alt='Logo' />
          <button onClick={(() => setshowBill(false))}>
            <X />
          </button>
        </div>
        <div className="py-2">
          {
            cartItems.map((item) => (
              <ul key={item.cartid} className='flex justify-between gap-10 p-3'>
                <li>{item.product.name}</li>
                <li>₹ {parseFloat((item.product.price).toString()).toFixed(2)}</li>
              </ul>
            ))
          }
        </div>
        <div className="flex justify-between border-t p-3 ">
          <div className="">Total amount</div>
          <div className="">
            ₹ {parseFloat(totalamount.toString()).toFixed(2)}
          </div>
        </div>
        <div className="flex justify-center py-3">
          <button className='bg-[#1050B2] hover:bg-blue-700 p-3 px-5 rounded-lg text-white font-semibold'>
            Proceed
          </button>
        </div>
      </div>
    )
  }



  return (
    <div className="min-h-screen px-6 md:px-20 py-10 bg-white dark:bg-gray-900 mt-20">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#1050B2] dark:text-white border-b pb-4">
        Cart  🛒
      </h1>

      <div className="space-y-6">
        {cartItems.length !== 0 ?
          cartItems.map((item) => (
            <div
              key={item.cartid}
              className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 rounded-xl shadow-sm bg-gray-50 dark:bg-gray-800 hover:shadow-md transition mx-20"
            >
              <div className="w-full md:w-24 h-24 flex-shrink-0">
                {item.product.image ? (
                  <Image
                    src={`${apiUrl}/api${item.product.image}`}
                    alt={item.product.name}
                    width={100}
                    height={100}
                    className="object-cover rounded"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center rounded">
                    <span className="text-sm text-gray-600">No Image</span>
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{item.product.name}</h2>
                <p className="text-sm text-gray-500">₹ {item.product.price}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded overflow-hidden bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <button className="px-3 py-1 text-lg hover:bg-gray-200 dark:hover:bg-gray-600">-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button className="px-3 py-1 text-lg hover:bg-gray-200 dark:hover:bg-gray-600">+</button>
                </div>

                <button className="hover:text-gray-700 dark:hover:text-gray-400 transition">
                  <Trash />
                </button>
              </div>
            </div>
          ))
          :

          <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">No items in your cart 😕</h2>
            <p className="text-lg mb-6">Looks like you haven't added anything yet.</p>
            <Link href="/shop">
              <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
                Go to Shop
              </button>
            </Link>
          </div>

        }

      </div>

      <div className="absolute bottom-10 right-10 ">
        <button className='bg-[#1050B2] hover:bg-blue-700 p-3 px-5 rounded-lg text-white font-semibold'
          onClick={() => setshowBill(true)}
        >
          Make Bill
        </button>

      </div>

    </div>
  );
};

export default CartPage;
