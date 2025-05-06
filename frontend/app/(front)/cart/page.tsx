'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash, X, Check, ArrowLeft, CreditCard } from 'lucide-react';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/reduxtoolkit/store';
import { useDispatch } from 'react-redux';
import { cartDecrement, cartDecrementByAmount, cartIncrement, cartReset } from '@/app/reduxtoolkit/cart/cartSlice';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ProductDetailInterface {
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
  product: ProductDetailInterface;
}

const CartPage = () => {
  const cartCount = useSelector((state: RootState) => state.cart.cartCount)
  const dispatch = useDispatch()
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartDetailInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBill, setShowBill] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'bill' | 'payment' | 'success'>('bill');
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'card' | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem('isadmin') === 'admin') {
      alert('Admin cannot add products to cart.');
      router.push('/');
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

  const handleIncrease = (productid: string) => {
    dispatch(cartIncrement())
    const updatequantity = cartItems.map((item) => (
      item.productid === productid ?
        { ...item, quantity: item.quantity + 1 }
        : item
    ));
    setCartItems(updatequantity);
  };

  const handleDecrease = (productid: string) => {
    dispatch(cartDecrement())
    const updatequantity = cartItems.map((item) => (
      item.productid === productid && item.quantity > 1 ?
        { ...item, quantity: item.quantity - 1 }
        : item
    ));
    setCartItems(updatequantity);
  };

  const handleDelete = async (cartid: string, quantity: number) => {
    setIsLoading(true);
    try {
      await axios.delete(`${apiUrl}/api/deletecart/${cartid}/`);
      dispatch(cartDecrementByAmount(quantity))
      setCartItems(cartItems.filter(item => item.cartid !== cartid));
    } catch (error: any) {
      alert('Cart cannot be deleted');
    } finally {
      setIsLoading(false);
    }
  };

  const proceedOrder = async () => {
    setIsLoading(true);
    try {
      const orderPayload = {
        userid: localStorage.getItem('userid'),
        items: cartItems.map((item) => ({
          productid: item.productid,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalamount: cartItems.reduce(
          (sum, item) => sum + item.quantity * item.product.price,
          0
        ).toFixed(2)
      };

      const response = await axios.post(
        `${apiUrl}/api/makeorder/`,
        orderPayload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('access')}`
          }
        }
      );

      if (response.status === 201) {
        setOrderId(response.data.orderid);
        setPaymentStep('payment');
      }
    } catch (error: any) {
      console.error('Order error:', error);
      alert(error.response?.data?.error || 'Failed to place order');

      if (error.response?.status === 401) {
        try {
          const refreshResponse = await axios.post(
            `${apiUrl}/api/token/refresh/`,
            { refresh: localStorage.getItem('refresh') }
          );
          localStorage.setItem('access', refreshResponse.data.access);
          return proceedOrder();
        } catch (e) {
          router.push('/login');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentStep('success');
    dispatch(cartReset(0))
    setTimeout(() => {
      setCartItems([]);
      setShowBill(false);
      setPaymentStep('bill');
    }, 3000);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  ).toFixed(2);

  if (isLoading && !showBill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const renderBillModal = () => {
    switch (paymentStep) {
      case 'bill':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b p-4 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Order Summary</h2>
                <button
                  onClick={() => setShowBill(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.cartid} className="flex justify-between py-3 border-b dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      {item.product.image && (
                        <Image
                          src={`${apiUrl}/api${item.product.image}`}
                          width={50}
                          height={50}
                          alt={item.product.name}
                          className="rounded"
                          unoptimized
                        />
                      )}
                      <div>
                        <p className="font-medium dark:text-gray-200">{item.product.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium dark:text-gray-200">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t p-4 dark:border-gray-700">
                <div className="flex justify-between mb-6">
                  <span className="font-bold text-lg dark:text-gray-200">Total Amount</span>
                  <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                    ₹{totalAmount}
                  </span>
                </div>

                <button
                  onClick={proceedOrder}
                  disabled={isLoading}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                  {isLoading ? (
                    'Processing...'
                  ) : (
                    <>
                      Proceed to Payment
                      <ArrowLeft className="rotate-180" size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b p-4 dark:border-gray-700">
                <button
                  onClick={() => setPaymentStep('bill')}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Payment Options</h2>
                <div className="w-6"></div> {/* Spacer for alignment */}
              </div>

              <div className="p-4">
                {!paymentMethod ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => setPaymentMethod('qr')}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                          <Image src="/images/qr.png" width={24} height={24} alt="QR Icon" />
                        </div>
                        <span className="font-medium dark:text-gray-200">QR Code Payment</span>
                      </div>
                      <ArrowLeft className="rotate-180 text-gray-400" size={18} />
                    </button>

                    <button
                      onClick={() => setPaymentMethod('card')}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                          <CreditCard size={20} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-medium dark:text-gray-200">Credit/Debit Card</span>
                      </div>
                      <ArrowLeft className="rotate-180 text-gray-400" size={18} />
                    </button>
                  </div>
                ) : paymentMethod === 'qr' ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="font-medium text-lg mb-2 dark:text-gray-200">Scan QR Code to Pay</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Use any UPI app to scan this code</p>
                    </div>

                    <div className="flex justify-center">
                      <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                        <Image
                          src="/images/qr.png"
                          width={200}
                          height={200}
                          alt="Payment QR Code"
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Amount</span>
                        <span className="font-bold dark:text-gray-200">
                          ₹{totalAmount}
                        </span>
                      </div>
                      {orderId && (
                        <div className="flex justify-between mt-1">
                          <span className="text-gray-600 dark:text-gray-300">Order ID</span>
                          <span className="font-mono text-sm dark:text-gray-300">{orderId}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handlePaymentSuccess}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mt-4 transition"
                    >
                      I've Completed Payment
                    </button>

                    <button
                      onClick={() => setPaymentMethod(null)}
                      className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm mt-2"
                    >
                      ← Back to payment options
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <CreditCard size={48} className="mx-auto text-blue-600 dark:text-blue-400 mb-4" />
                      <h3 className="text-lg font-medium dark:text-gray-200 mb-2">Card Payment</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Card payment integration would be implemented here
                      </p>
                      <button
                        onClick={() => setPaymentMethod(null)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        ← Back to payment options
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Payment Successful!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Thank you for your order. Your items will be shipped soon.
              </p>
              {orderId && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Order ID: {orderId}
                </p>
              )}
              <button
                onClick={() => {
                  setShowBill(false);
                  setPaymentStep('bill');
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen px-6 md:px-20 py-10 bg-white dark:bg-gray-900 mt-20">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#1050B2] dark:text-white border-b pb-4">
        Cart  🛒
      </h1>

      <div className="space-y-6">
        {cartItems.length > 0 ? (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.cartid}
                  className="flex flex-col md:flex-row items-center justify-between mb-4 p-4 rounded-xl shadow-sm bg-gray-50 dark:bg-gray-800 hover:shadow-md transition"
                >
                  <div className="w-full md:w-24 h-24 flex-shrink-0">
                    {item.product.image ? (
                      <Image
                        src={`${apiUrl}/api${item.product.image}`}
                        alt={item.product.name}
                        width={100}
                        height={100}
                        className="object-cover rounded-lg"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-300">No Image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left px-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{item.product.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">₹{item.product.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="flex items-center border rounded overflow-hidden bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                      <button
                        onClick={() => handleDecrease(item.productid)}
                        disabled={item.quantity <= 1}
                        className={`px-3 py-1 text-lg ${item.quantity <= 1
                          ? 'text-gray-400 cursor-not-allowed dark:text-gray-500'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                      >
                        -
                      </button>
                      <span className="px-4 dark:text-gray-200">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.productid)}
                        className="px-3 py-1 text-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleDelete(item.cartid, item.quantity)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="fixed bottom-10 right-10">
              <button
                className="bg-[#1050B2] hover:bg-blue-700 p-3 px-5 rounded-lg text-white font-semibold shadow-lg transition flex items-center gap-2"
                onClick={() => setShowBill(true)}
              >
                Proceed to Checkout
                <ArrowLeft className="rotate-180" size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
            <div className="p-6  mb-6">
              <Image
                src="/images/empty-cart.png"
                width={120}
                height={120}
                alt="Empty cart"
                className="opacity-80"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
              Looks like you haven't added anything to your cart yet. Start shopping to find amazing products!
            </p>
            <Link href="/">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>

      {showBill && renderBillModal()}
    </div>
  );
};

export default CartPage;