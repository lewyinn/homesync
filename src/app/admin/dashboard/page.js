'use client';

import { useSidebar } from '@/context/SidebarContext';
import React from 'react'
import { FaCreditCard, FaUser, FaUserPlus } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';

export default function DashboardPage() {
    const { setSidebarOpen } = useSidebar();

    const stats = [
        {
            title: "Today's Money",
            value: "$53,000",
            change: "+55%",
            positive: true,
            icon: FaCreditCard,
        },
        {
            title: "Today's Users",
            value: "2,300",
            change: "+3%",
            positive: true,
            icon: FaUser,
        },
        {
            title: "New Clients",
            value: "+3,052",
            change: "-2%",
            positive: false,
            icon: FaUserPlus,
        },
        {
            title: "Total Sales",
            value: "$173,000",
            change: "+5%",
            positive: true,
            icon: FiTrendingUp,
        },
    ];

    return (
        <>
            {/* Main Content */}
            <main className="p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${index === 0
                                        ? "bg-blue-500"
                                        : index === 1
                                            ? "bg-green-500"
                                            : index === 2
                                                ? "bg-orange-500"
                                                : "bg-red-500"
                                        }`}
                                >
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <span
                                    className={`text-sm font-medium ${stat.positive ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                {stat.title}
                            </p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}