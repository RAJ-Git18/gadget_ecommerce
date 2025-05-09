"use client"

import { useState } from "react";
import { ArrowUp, ChevronDown } from "lucide-react";
import { CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";

// Sample data
const revenueData = {
    2023: [
        { month: "Jan", revenue: 12500 },
        { month: "Feb", revenue: 18900 },
        { month: "Mar", revenue: 14200 },
        { month: "Apr", revenue: 17800 },
        { month: "May", revenue: 21100 },
        { month: "Jun", revenue: 19600 },
        { month: "Jul", revenue: 22400 },
        { month: "Aug", revenue: 23800 },
        { month: "Sep", revenue: 21500 },
        { month: "Oct", revenue: 25100 },
        { month: "Nov", revenue: 28900 },
        { month: "Dec", revenue: 32500 },
    ],
    2024: [
        { month: "Jan", revenue: 14200 },
        { month: "Feb", revenue: 19800 },
        { month: "Mar", revenue: 16500 },
        { month: "Apr", revenue: 20300 },
        { month: "May", revenue: 23100 },
        { month: "Jun", revenue: 21900 },
        { month: "Jul", revenue: 24500 },
        { month: "Aug", revenue: 26300 },
        { month: "Sep", revenue: 24100 },
        { month: "Oct", revenue: 27900 },
        { month: "Nov", revenue: 31200 },
        { month: "Dec", revenue: 35400 },
    ]
};

const productSalesData = [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 200 },
    { name: "Product D", value: 150 },
    { name: "Product E", value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function DashboardCharts() {
    const [selectedYear, setSelectedYear] = useState<number>(2024);
    const [showYearDropdown, setShowYearDropdown] = useState(false);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
            {/* Revenue Line Chart */}
            <div className="border rounded-lg shadow-sm p-6 bg-white">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Monthly Revenue</h2>
                        <p className="text-sm text-gray-500">Revenue trends by month</p>
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowYearDropdown(!showYearDropdown)}
                            className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm"
                        >
                            {selectedYear}
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {showYearDropdown && (
                            <div className="absolute right-0 mt-1 w-full bg-white border rounded-md shadow-lg z-10">
                                {Object.keys(revenueData).map(year => (
                                    <button
                                        key={year}
                                        onClick={() => {
                                            setSelectedYear(Number(year));
                                            setShowYearDropdown(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${Number(year) === selectedYear ? 'bg-gray-100' : ''
                                            }`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={revenueData[selectedYear as keyof typeof revenueData]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b' }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b' }}
                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            />
                            <Tooltip
                                formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                                labelFormatter={(label) => `${label} ${selectedYear}`}
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6, strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                        <ArrowUp className="h-4 w-4" />
                        {selectedYear === 2024 ? 'Increased by 12%' : 'Increased by 8%'} compared to previous year
                    </div>
                </div>
            </div>

            {/* Product Sales Pie Chart */}
            <div className="border rounded-lg shadow-sm p-6 bg-white">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Product Sales Distribution</h2>
                    <p className="text-sm text-gray-500">Total sales by product</p>
                </div>

                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={productSalesData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {productSalesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => [`${value} units`, "Sales"]}
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-6 pt-4 border-t">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                        {productSalesData.map((product, index) => (
                            <div key={product.name} className="flex items-center">
                                <div
                                    className="w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                <span className="text-xs">{product.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}