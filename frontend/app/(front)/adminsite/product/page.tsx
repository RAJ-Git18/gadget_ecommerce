'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Trash } from 'lucide-react';
import axios from 'axios';
import Loader from '@/components/Loader';
import Image from 'next/image';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface FormDataInterface {
  name: string;
  price: string;
  stock: string;
  displayas: 'featured' | 'best';
  category: 'mobile' | 'tv' | 'laptop' | 'watch';
  details: string;
  image: File | null;
}

interface ProductDataInterface {
  productid: string;
  name: string;
  price: string;
  stock: string;
  displayas: 'featured' | 'best';
  category: 'mobile' | 'tv' | 'laptop' | 'watch';
  details: string;
  image: string | null;
}

export default function ProductForm() {
  const [productData, setProductData] = useState<ProductDataInterface[]>([]);
  const [formData, setFormData] = useState<FormDataInterface>({
    name: '',
    price: '',
    stock: '',
    displayas: 'featured',
    category: 'mobile',
    details: '',
    image: null,
  });
  const [toggleForm, setToggleForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/getproducts/`);
        if (response.status === 200) {
          setProductData(response.data.message);
        }
      } catch (error: any) {
        alert('Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('price', formData.price);
    form.append('stock', formData.stock);
    form.append('category', formData.category);
    form.append('description', formData.details);
    form.append('displayas', formData.displayas);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      const response = await axios.post(`${apiUrl}/api/getproducts/`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        setIsLoading(true);
        try {
          const response2 = await axios.get(`${apiUrl}/api/getproducts/`);
          if (response2.status === 200) {
            setProductData(response2.data.message);
            setToggleForm(false);
            setFormData({
              name: '',
              price: '',
              stock: '',
              displayas: 'featured',
              category: 'mobile',
              details: '',
              image: null,
            });
          }
        } catch {
          alert('Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    } catch (error: any) {
      alert('Unable to create new product. Please try again.');
      console.error(error.response?.data || error.message);
    }
  };

  const DeleteProduct = async (productid: string) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/deleteproduct/${productid}/`);
      if (response.status === 200) {
        setProductData((prev) => prev.filter((product) => product.productid !== productid));
      }
    } catch {
      alert('Product cannot be deleted');
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-[85%] flex justify-center items-center mx-auto ">
        <Loader />
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-20 bottom-0 w-[85%] bg-white shadow-lg overflow-y-auto transition-all duration-300">
      {toggleForm ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Product</h2>
            <button
              onClick={() => {
                setToggleForm(false);
                setFormData({
                  name: '',
                  price: '',
                  stock: '',
                  displayas: 'featured',
                  category: 'mobile',
                  details: '',
                  image: null,
                });
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock Quantity"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <select
              name="displayas"
              value={formData.displayas}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            >
              <option value="featured">Featured</option>
              <option value="best">Best Selling</option>
            </select>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            >
              <option value="mobile">Mobile</option>
              <option value="laptop">Laptop</option>
              <option value="tv">TV</option>
              <option value="watch">Watch</option>
            </select>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Product description"
              className="w-full border border-gray-300 p-2 rounded min-h-[100px]"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-800 text-white py-2 px-4 rounded hover:bg-slate-950"
            >
              Add Product
            </button>
          </form>
        </div>
      ) : (
        <div className="h-full flex flex-col m-10">
          {productData.length > 0 && (
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">Products</h2>
              <button
                onClick={() => setToggleForm(true)}
                className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-950"
              >
                <Plus size={18} />
                Create Product
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto mb-32">
            {productData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <p className="text-gray-500 text-lg">No products available</p>
                <button
                  onClick={() => setToggleForm(true)}
                  className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-950"
                >
                  <Plus size={18} />
                  Add Your First Product
                </button>
              </div>
            ) : (
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6 border-b">Image</th>
                    <th className="py-3 px-6 border-b">Name</th>
                    <th className="py-3 px-6 border-b">Price</th>
                    <th className="py-3 px-6 border-b">Stock</th>
                    <th className="py-3 px-6 border-b">Best Selling</th>
                    <th className="py-3 px-6 border-b">Featured</th>
                    <th className="py-3 px-6 border-b">Category</th>
                    <th className="py-3 px-6 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((item) => (
                    <tr key={item.productid} className="hover:bg-gray-50 text-center">
                      <td className="py-3 px-6 border-b">
                        <div className="mx-auto w-[50px] h-[50px] rounded overflow-hidden">
                          {item.image ? (
                            <Image
                              src={`${apiUrl}/api${item.image}`}
                              alt={item.name || 'Product image'}
                              width={50}
                              height={50}
                              className="object-cover rounded-md"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 text-xs">No Image</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-6 border-b">{item.name}</td>
                      <td className="py-3 px-6 border-b">Rs. {item.price}</td>
                      <td className="py-3 px-6 border-b">{item.stock}</td>
                      <td className="py-3 px-6 border-b">
                        {item.displayas === 'best' ? (
                          <span className="text-green-500">✓</span>
                        ) : (
                          <span className="text-red-500">✗</span>
                        )}
                      </td>
                      <td className="py-3 px-6 border-b">
                        {item.displayas === 'featured' ? (
                          <span className="text-green-500">✓</span>
                        ) : (
                          <span className="text-red-500">✗</span>
                        )}
                      </td>
                      <td className="py-3 px-6 border-b">{item.category}</td>
                      <td className="py-3 px-6 border-b">
                        <button
                          className="bg-slate-800 text-white p-2 rounded-md hover:text-red-700"
                          onClick={() => DeleteProduct(item.productid)}
                        >
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
