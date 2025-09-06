"use client";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/layouts/Sidebar";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

export default function DashboardLayout({ children }) {
    return (
        <SidebarProvider>
            <AdminShell>{children}</AdminShell>
        </SidebarProvider>
    );
}

function AdminShell({ children }) {
    const { setSidebarOpen } = useSidebar(); 
    const [Logout, setLogout] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [user, setUser] = useState({ name: '', email: '' });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

        // Fetch user info on mount
        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const res = await fetch('/api/auth/me');
                    if (res.ok) {
                        const data = await res.json();
                        if (data.authenticated && data.user) {
                            setUser({
                                name: data.user.name || '',
                                email: data.user.email || ''
                            });
                        }
                    }
                } catch (err) {
                    // ignore
                }
            };
            fetchUser();
        }, []);
        // Handle logout: call API and redirect
        const handleLogout = async () => {
            try {
                const res = await fetch("/api/auth/logout", { method: "POST" });
                if (res.ok) {
                    window.location.href = "/login";
                } else {
                    alert("Logout failed");
                }
            } catch (err) {
                alert("Logout error");
            }
        };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {/* Sidebar */}
            <Sidebar />

            {/* Page Content */}
            <div className="flex-1">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 transition-colors">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                            >
                                <FiMenu className="w-6 h-6" />
                            </button>
                            <nav className="text-sm text-gray-500 dark:text-gray-400">
                                <span>Admin</span>
                                <span className="mx-2">/</span>
                                <span className="text-gray-900 dark:text-gray-200 font-medium">
                                    Dashboard
                                </span>
                            </nav>
                        </div>

                        {/* Dropdown Profile */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((v) => !v)}
                                className="rounded-full w-10 h-10 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:ring-2 ring-blue-500 transition"
                            >
                                <FaUser className="w-5 h-5" />
                            </button>

                            <div
                                className={`absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50 transform transition-all duration-200 ease-out origin-top-right ${dropdownOpen
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-95 pointer-events-none"
                                    }`}
                            >
                                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {user.username || 'Unknown User'}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {user.email || '-'}
                                    </p>
                                </div>
                                    <button
                                        onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-600/10 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {children}
            </div>
        </div>
    );
}
