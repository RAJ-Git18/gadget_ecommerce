import React from 'react';
import Link from 'next/link';

const ProductsPageLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="flex">
                    {/* Sidebar - Fixed with fixed height and scroll */}
                    <aside className="w-64 h-[calc(100vh-5rem)] sticky top-20 bg-white p-6 rounded-lg shadow-sm overflow-y-auto">
                        {/* Category Filter */}
                        <div className="mb-8">
                            <h2 className="font-semibold text-lg mb-4 text-gray-700">Category</h2>
                            <ul className="space-y-2">
                                {['All', 'Mobile', 'Laptop', 'Watch'].map((category) => (
                                    <li key={category}>
                                        <Link
                                            href={`/products/${category.toLowerCase()}`}
                                            className="text-gray-600 hover:text-blue-500 block"
                                        >
                                            {category}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Filter */}
                        <div className="mb-8">
                            <h2 className="font-semibold text-lg mb-4 text-gray-700">Company</h2>
                            <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                                {['All', 'Apple', 'Samsung', 'Dell', 'Nokia'].map((company) => (
                                    <option key={company} value={company}>
                                        {company}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Colors Filter */}
                        <div className="mb-8">
                            <h2 className="font-semibold text-lg mb-4 text-gray-700">Colors</h2>
                            <div className="flex flex-wrap gap-2">
                                {['All', '#000000', '#FFFFFF', '#4285F4', '#E60000'].map((color) => (
                                    <button
                                        key={color}
                                        className={`w-6 h-6 rounded-full border ${color === 'All'
                                                ? 'bg-gray-200 flex items-center justify-center text-xs'
                                                : ''
                                            }`}
                                        style={color !== 'All' ? { backgroundColor: color } : {}}
                                        title={color}
                                    >
                                        {color === 'All' ? 'All' : ''}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="mb-8">
                            <h2 className="font-semibold text-lg mb-4 text-gray-700">Price</h2>
                            <span className="block mb-2 text-gray-700">₹60,000.00</span>
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                className="w-full accent-blue-500"
                            />
                        </div>

                        {/* Clear Filters */}
                        <div>
                            <h2 className="font-semibold text-lg mb-4 text-gray-700">CLEAR FILTERS</h2>
                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors">
                                Clear
                            </button>
                        </div>
                    </aside>

                    {/* Main Product Grid */}
                    <main className="flex-1 ml-8 overflow-y-auto h-[calc(100vh-5rem)] pr-2">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProductsPageLayout;
