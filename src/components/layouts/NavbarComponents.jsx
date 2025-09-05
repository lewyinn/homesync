"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaDiscord, FaFacebookF } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { HiMenuAlt4 } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About Us" },
    { href: "/products", text: "Products" },
    { href: "/blogs", text: "Blogs" },
    { href: "/#testimonials", text: "Testimonials" },
];

const socialButtons = [
    { icon: FaFacebookF, label: "Facebook" },
    { icon: FaDiscord, label: "Discord" },
];

const menuVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
};


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="fixed inset-x-0 top-6 z-50 h-16 md:h-20 px-4">
            <nav className={`container mx-auto flex h-full items-center justify-between px-4 md:px-6 rounded-2xl transition-all duration-300
                    ${isScrolled ? 'backdrop-blur-md bg-black/80 shadow-lg border border-neutral-800' : 'bg-black/60'}`}>
                {/* Logo on the left */}
                <Link href="/"
                    className="font-bold select-none flex justify-center items-center cursor-pointer">
                    <span className="text-2xl text-blue-500">
                        Home<span className="text-gray-200">Sync</span>
                    </span>
                </Link>

                {/* Desktop Navigation - Centered */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.text}
                                href={link.href}
                                className={`text-lg font-medium transition-colors cursor-pointer ${isActive ? 'text-blue-500 font-bold' : 'text-gray-300 hover:text-blue-600'}`}
                            >
                                {link.text}
                            </Link>
                        );
                    })}
                </div>

                {/* Right side - Desktop */}
                <div className="hidden md:flex items-center gap-4">
                    {socialButtons.map(({ icon: Icon, label }) => (
                        <button
                            key={label}
                            className="cursor-pointer flex items-center justify-center rounded-full bg-gray-800 w-8 h-8 text-blue-500 hover:text-gray-800 hover:bg-blue-500 transition-colors">
                            <Icon className="w-4 h-4" />
                        </button>
                    ))}
                    <Link
                        href="/contact"
                        className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${pathname === '/contact' ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                        Contact
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu}
                    className="rounded-md p-2 text-white hover:bg-blue-400 focus:outline-none md:hidden">
                    {isMenuOpen ? <FiX className="w-6 h-6" /> : <HiMenuAlt4 className="w-6 h-6" />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div initial="hidden" animate="visible" exit="exit"
                            variants={menuVariants}
                            transition={{ duration: 0.2 }}
                            className={`absolute max-w-7xl md:max-w-5/6 inset-x-0 top-full mt-1 shadow-lg md:hidden rounded-2xl border border-neutral-800
                                ${isScrolled ? 'backdrop-blur-md bg-black/90 shadow-lg border border-neutral-800' : 'bg-black/80 mx-4'}`}>
                            <div className="flex flex-col gap-2 px-6 py-4">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.text}
                                            href={link.href}
                                            className={`text-sm font-medium transition-colors cursor-pointer py-3 px-2 rounded-md ${isActive ? 'text-blue-500 font-bold' : 'text-gray-300 hover:text-blue-600'}`}
                                            onClick={toggleMenu}>
                                            {link.text}
                                        </Link>
                                    );
                                })}
                                <div className="flex gap-2 pt-2">
                                    {socialButtons.map(({ icon: Icon, label }) => (
                                        <button
                                            key={label}
                                            className="w-full flex items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-blue-600 hover:text-white transition-colors">
                                            <Icon className="w-4 h-4" />
                                            {label}
                                        </button>
                                    ))}
                                </div>
                                <Link
                                    href="/contact"
                                    className={`w-full rounded-md px-4 py-3 text-sm font-medium transition-colors mt-2 ${pathname === '/contact' ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                                    Contact
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}