'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';

export default function ProductForm() {
  interface FormDataInterface {
    name: string;
    price: string;
    stock: string;
    category: string;
    details: string;
    image: File | null;
  }

  const [formData, setFormData] = useState<FormDataInterface>({
    name: '',
    price: '',
    stock: '',
    category: 'all',
    details: '',
    image: null,
  });

  const [toggleForm, setToggleForm] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('price', formData.price);
    productData.append('stock', formData.stock);
    productData.append('category', formData.category);
    productData.append('details', formData.details);
    if (formData.image) {
      productData.append('image', formData.image);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`, {
        method: 'POST',
        body: productData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('Product added successfully!');
        setFormData({
          name: '',
          price: '',
          stock: '',
          category: 'all',
          details: '',
          image: null,
        });
        setToggleForm(false);
      } else {
        alert(`Failed: ${data.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while uploading.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {toggleForm ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Product</h2>
            <button
              onClick={() => setToggleForm(false)}
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
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock Quantity"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="featured">Featured</option>
              <option value="best">Best Selling</option>
            </select>

            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Product description (features, benefits, etc.)"
              className="w-full border border-gray-300 p-2 rounded min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 p-2 rounded file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-800 text-white py-2 px-4 rounded hover:bg-slate-950 transition focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
            >
              Add Product
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">Products</h2>
            <button
              onClick={() => setToggleForm(true)}
              className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-950 transition"
            >
              <Plus size={18} />
              Create Product
            </button>
          </div>

          <div className="p-4 overflow-x-auto">
            <table className="min-w-full mx-auto bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-6 border-b">Image</th>
                  <th className="py-3 px-6 border-b">Name</th>
                  <th className="py-3 px-6 border-b">Price</th>
                  <th className="py-3 px-6 border-b">Stock</th>
                  <th className="py-3 px-6 border-b">Best Selling</th>
                  <th className="py-3 px-6 border-b">Featured</th>
                  <th className="py-3 px-6 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 text-center">
                  <td className="py-3 px-6 border-b">
                    <div className="h-12 w-12 bg-gray-200 mx-auto rounded"></div>
                  </td>
                  <td className="py-3 px-6 border-b">Sample Product</td>
                  <td className="py-3 px-6 border-b">$29.99</td>
                  <td className="py-3 px-6 border-b">50</td>
                  <td className="py-3 px-6 border-b">
                    <span className="text-green-500">✓</span>
                  </td>
                  <td className="py-3 px-6 border-b">
                    <span className="text-green-500">✓</span>
                  </td>
                  <td className="py-3 px-6 border-b">
                    <button className="text-gray-500 hover:text-blue-700 mr-2">
                      Edit
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}