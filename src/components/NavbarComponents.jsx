"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaDiscord, FaFacebookF } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { HiMenuAlt4 } from "react-icons/hi";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";

const navLinks = [
    { to: "hero", text: "Home" },
    { to: "about", text: "About Us" },
    { to: "products", text: "Products" },
    { to: "testimonials", text: "Testimonials" },
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

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="fixed inset-x-0 top-6 z-50 h-16 px-4">
            <nav className={`mx-auto flex h-full max-w-7xl md:max-w-5/6 items-center justify-between px-4 md:px-6 rounded-2xl bg-neutral-950 `}>
                {/* Logo on the left */}
                <Link href="/"
                    className="font-bold select-none flex justify-center items-center cursor-pointer">
                    <span className="text-2xl text-lime-500">
                        Home<span className="text-gray-200">Sync</span>
                    </span>
                </Link>

                {/* Desktop Navigation - Centered */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <ScrollLink
                            key={link.text}
                            to={link.to}
                            spy={true}
                            smooth={true}
                            offset={-64}
                            duration={600}
                            className="text-sm font-medium text-gray-300 hover:text-lime-600 transition-colors cursor-pointer"
                            activeClass="text-blue-600 font-semibold">
                            {link.text}
                        </ScrollLink>
                    ))}
                </div>

                {/* Right side - Desktop */}
                <div className="hidden md:flex items-center gap-4">
                    {socialButtons.map(({ icon: Icon, label }) => (
                        <button
                            key={label}
                            className="cursor-pointer flex items-center justify-center rounded-full bg-gray-800 w-8 h-8 text-lime-500 hover:text-gray-800 hover:bg-lime-500 transition-colors">
                            <Icon className="w-4 h-4" />
                        </button>
                    ))}
                    <ScrollLink
                        to='contact'
                        spy={true}
                        smooth={true}
                        offset={-64}
                        duration={600}
                        className="cursor-pointer rounded-md bg-lime-600 px-4 py-2 text-sm font-medium text-white hover:bg-lime-700 transition-colors">
                        Contact
                    </ScrollLink>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu}
                    className="rounded-md p-2 text-white hover:bg-lime-400 focus:outline-none md:hidden">
                    {isMenuOpen ? <FiX className="w-6 h-6" /> : <HiMenuAlt4 className="w-6 h-6" />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div initial="hidden" animate="visible" exit="exit"
                            variants={menuVariants}
                            transition={{ duration: 0.2 }}
                            className="absolute max-w-7xl md:max-w-5/6 inset-x-0 top-full mt-1 bg-neutral-950 shadow-lg md:hidden rounded-2xl border border-neutral-800 mx-4">
                            <div className="flex flex-col gap-2 px-6 py-4">
                                {navLinks.map((link) => (
                                    <ScrollLink
                                        key={link.text}
                                        to={link.to}
                                        spy={true}
                                        smooth={true}
                                        offset={-64}
                                        duration={600}
                                        className="text-sm font-medium text-gray-300 hover:text-lime-600 transition-colors cursor-pointer py-3 px-2 rounded-md"
                                        activeClass="text-lime-500 font-semibold"
                                        onClick={toggleMenu}>
                                        {link.text}
                                    </ScrollLink>
                                ))}
                                <div className="flex gap-2 pt-2">
                                    {socialButtons.map(({ icon: Icon, label }) => (
                                        <button
                                            key={label}
                                            className="w-full flex items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-lime-600 hover:text-white transition-colors">
                                            <Icon className="w-4 h-4" />
                                            {label}
                                        </button>
                                    ))}
                                </div>
                                <ScrollLink
                                    to='contact'
                                    spy={true}
                                    smooth={true}
                                    offset={-64}
                                    duration={600}
                                    className="w-full rounded-md bg-lime-600 px-4 py-3 text-sm font-medium text-white hover:bg-lime-700 transition-colors mt-2">
                                    Contact
                                </ScrollLink>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}