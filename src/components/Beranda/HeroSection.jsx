"use client";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

export default function HeroSection() {
    return (
        <section id="hero" className="text-black px-4 lg:px-0 py-28 md:py-36">
            <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold leading-tight">
                        <span className="text-lime-500">Discover</span> Modern Homes <br />
                        Tailored to Your <span className="text-lime-500">Lifestyle</span>
                    </motion.h1>

                    <p className="text-lg text-gray-500 max-w-lg">
                        Sell your sweet house for a super fantastic price! Looking for a comfortable,
                        strategic, and good place?
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <input
                            type="text"
                            placeholder="Enter an Address, City, Zip, Number"
                            className="w-full border-2 border-neutral-700 rounded-3xl py-4 pl-16 pr-4 text-neutral-700 focus:outline-none focus:ring-2 focus:ring-lime-500"/>
                        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 px-2 py-2 text-white text-4xl rounded-full" />
                    </div>

                    {/* Popular Locations */}
                    <div className="flex flex-wrap gap-3">
                        {['Dallas', 'Yogyakarta City', 'Jakarta', 'Ohio'].map((location) => (
                            <button
                                key={location}
                                className="cursor-pointer px-4 py-2 bg-transparent border hover:border-0 hover:bg-lime-600 hover:text-white rounded-full text-sm font-medium transition-colors">
                                {location}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Content - Testimonial Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-black border border-neutral-800 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-lime-500"></div>
                        <span className="text-sm font-medium text-lime-500">TOP TESTIMONIAL</span>
                    </div>

                    <blockquote className="mb-6">
                        <p className="text-xl italic mb-4 text-gray-400">
                            "Incredible Experience With Garment! Their Expertise And Dedication Made Finding Perfect..."
                        </p>
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-lime-500">★</span>
                            ))}
                            <span className="text-gray-400 ml-2">4.8</span>
                        </div>
                    </blockquote>

                    <div className="border-t border-neutral-800 pt-6">
                        <h3 className="text-xl text-lime-600 font-bold mb-2">Etalon City</h3>
                        <p className="text-gray-400 mb-4">
                            This premier development offers a range of high-end residential and commercial spaces,
                            each designed with meticulous attention to detail and cutting-edge.
                        </p>
                        <button className="cursor-pointer flex items-center gap-2 text-lime-500 hover:text-lime-400 transition-colors">
                            See Detail
                            <span className="text-xl">→</span>
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Featured Property at Bottom */}
            <div className="container mx-auto mt-16 bg-black border border-neutral-800 rounded-xl overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3 bg-black p-6">
                        <h3 className="text-xl font-bold mb-2 text-lime-500">Perumnas Trimulyo</h3>
                        <p className="text-gray-300 mb-4">Jl. Aetmaud Dimass, 90 Jakarta Sala.</p>
                        <button className="px-6 py-3 text-white bg-lime-600 hover:bg-lime-700 rounded-lg font-medium transition-colors">
                            Details
                        </button>
                    </div>
                    <div className="md:w-2/3 bg-neutral-800 h-64 md:h-auto">
                        {/* Placeholder for property image */}
                        <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
                            <span className="text-gray-400">Property Image</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}