'use client';
import { useSidebar } from '@/context/SidebarContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp, FaBlog, FaFolder, FaHome } from 'react-icons/fa';
import { FaPerson, FaX } from 'react-icons/fa6';
import { FiSettings } from 'react-icons/fi';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';

export default function Sidebar() {
    const { sidebarOpen, setSidebarOpen } = useSidebar();
    const [darkMode, setDarkMode] = useState(false);
    const [berandaOpen, setBerandaOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [darkMode]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') setDarkMode(true);
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const isActive = (path) => {
        return pathname === path || pathname.startsWith(path + '/');
    };

    return (
        <>
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex items-center justify-between h-24 px-6">
                    <div className="flex items-center space-x-4">
                        <div className="px-2 py-2 bg-blue-600 rounded-lg flex items-center justify-center">
                            <FaHome className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold"> ADMIN DASHBOARD</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                        <FaX className="w-6 h-6" />
                    </button>
                </div>

                <nav className="mt-6 px-6 space-y-1">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        MAIN NAVIGATION
                    </h3>

                    <Link href="/admin/dashboard"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/dashboard')
                            ? "bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 border-r-4 border-blue-600"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                        <FaHome className="w-5 h-5" />
                        <span className="font-medium">Dashboard</span>
                    </Link>

                    {/* Dropdown Beranda */}
                    <div className="space-y-1">
                        <button
                            onClick={() => setBerandaOpen(!berandaOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <span className="flex items-center space-x-3">
                                <HiOutlineMenuAlt2 className="w-5 h-5" />
                                <span className="font-medium">Beranda</span>
                            </span>
                            <span className="text-sm">{berandaOpen ? <FaArrowUp className='w-4 h-4' /> : <FaArrowDown className='w-4 h-4' />}</span>
                        </button>

                        <div
                            className={`ml-7 overflow-hidden transition-all duration-300 ease-in-out
                                ${berandaOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <Link href="/admin/beranda/hero"
                                className={`block px-2 py-2 rounded-md text-sm transition-colors ${isActive('/admin/beranda/hero')
                                    ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                Hero
                            </Link>
                            <Link href="/admin/beranda/about"
                                className={`block px-2 py-2 rounded-md text-sm transition-colors ${isActive('/admin/beranda/about')
                                    ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                About
                            </Link>
                            <Link href="/admin/beranda/cta"
                                className={`block px-2 py-2 rounded-md text-sm transition-colors ${isActive('/admin/beranda/cta')
                                    ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                Call to Action
                            </Link>
                            <Link href="/admin/beranda/contact"
                                className={`block px-2 py-2 rounded-md text-sm transition-colors ${isActive('/admin/beranda/contact')
                                    ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                Kontak
                            </Link>
                        </div>
                    </div>

                    {/* Dropdown About */}
                    <div className="space-y-1">
                        <button
                            onClick={() => setAboutOpen(!aboutOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <span className="flex items-center space-x-3">
                                <FaPerson className="w-5 h-5" />
                                <span className="font-medium">About</span>
                            </span>
                            <span className="text-sm">{aboutOpen ? <FaArrowUp className='w-4 h-4' /> : <FaArrowDown className='w-4 h-4' />}</span>
                        </button>

                        <div
                            className={`ml-7 overflow-hidden transition-all duration-300 ease-in-out
                                ${aboutOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <Link href="/admin/about/hero"
                                className={`block px-2 py-2 rounded-md text-sm transition-colors ${isActive('/admin/about/hero')
                                    ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                Hero
                            </Link>
                            <Link href="/admin/about/story"
                                className={`block px-2 py-2 rounded-md text-sm transition-colors ${isActive('/admin/about/story')
                                    ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                Story
                            </Link>
                            <Link href="/admin/about/works"
                                className={`block px-2 py-2 rounded-md text-sm transition-colors ${isActive('/admin/about/works')
                                    ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                Works
                            </Link>
                            <Link href="/admin/about/visi-misi"
                                className={`block px-2 py-2 rounded-md text-sm transition-colors ${isActive('/admin/about/visi-misi')
                                    ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                Visi - Misi
                            </Link>
                            <Link href="/admin/about/values"
                                className={`block px-2 py-2 rounded-md text-sm transition-colors ${isActive('/admin/about/values')
                                    ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                Values
                            </Link>
                            <Link href="/admin/about/milestones"
                                className={`block px-2 py-2 rounded-md text-sm transition-colors ${isActive('/admin/about/milestones')
                                    ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                Milestones
                            </Link>
                            <Link href="/admin/about/milestones"
                                className={`block px-2 py-2 rounded-md text-sm transition-colors ${isActive('/admin/about/milestones')
                                    ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                Milestones
                            </Link>
                        </div>
                    </div>

                    <Link href="/admin/products"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/products')
                            ? "bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 border-r-4 border-blue-600"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                        <FaFolder className="w-5 h-5" />
                        <span className="font-medium">Products</span>
                    </Link>

                    <Link href="/admin/blogs"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/blogs')
                            ? "bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 border-r-4 border-blue-600"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                        <FaBlog className="w-5 h-5" />
                        <span className="font-medium">Blogs</span>
                    </Link>

                    {/* <div className="mt-8">
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                            ACCOUNT PAGES
                        </h3>

                        <Link href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100 transition-colors">
                            <User className="w-5 h-5" />
                            <span className="font-medium">Profile</span>
                        </Link>
                        <Link href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100 transition-colors">
                            <LogIn className="w-5 h-5" />
                            <span className="font-medium">Sign In</span>
                        </Link>
                        <Link href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100 transition-colors">
                            <UserPlus className="w-5 h-5" />
                            <span className="font-medium">Sign Up</span>
                        </Link>
                    </div> */}
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        {darkMode ? "🌞 Light" : "🌙 Dark"}
                    </button>
                </div>
            </div>

            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/20 bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}></div>
            )}
        </>
    );
}