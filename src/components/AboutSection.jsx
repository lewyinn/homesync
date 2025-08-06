"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUsers, FaBuilding, FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import Building from '../../public/assets/Apartment.png';

export default function AboutUsSection() {

    return (
        <section id="about" className="text-black px-4 lg:px-0 py-28 md:py-36">
            <div className="container mx-auto grid lg:grid-cols-2 gap-2 md:gap-12 items-start">
                {/* Left Content */}
                <div className='flex justify-start items-center space-x-1'>
                    <FaHome className='text-2xl font-medium' />
                    <h2 className="text-2xl font-normal">
                        About Us
                    </h2>
                </div>
                {/* Right Content */}
                <div className='flex flex-col items-start space-y-4'>
                    <p className='text-4xl text-neutral-900 font-medium'>
                        Endihom is the largest property website that has been helping millions of mars people to find their dream homes.
                    </p>
                </div>
            </div>
            <div className="container mx-auto mt-16">
                <div className="bg-black rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 md:p-12">
                    {/* Left Image */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 -mx-6 md:-mx-12 -my-12 z-10 pb-8 md:pb-0">
                        <Image
                            src={Building}
                            alt="Building"
                            width={600}
                            height={500}
                            className="rounded-2xl object-cover w-full h-auto"
                        />
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2 mt-8 md:mt-0 flex flex-col items-center md:items-end z-10">
                        <div className="flex flex-wrap gap-6 md:gap-10 mb-6 justify-center md:justify-end">
                            <StatItem icon={<FaUsers />} label="Customers" value="37K+" />
                            <StatItem icon={<FaBuilding />} label="Units Ready" value="40K+" />
                            <StatItem icon={<FaShoppingCart />} label="Units Sold" value="5K+" />
                        </div>

                        <button className="group inline-flex items-center gap-2 px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition">
                            Start Selling <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </motion.div>

                    {/* Background Circles */}
                    <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 bg-gradient-to-tr from-gray-800 to-black/90 rounded-l-full z-0"></div>
                </div>

                {/* Scroll Down Indicator */}
                <div className="text-black text-2xl text-center mt-6 animate-bounce">▼</div>
            </div>
        </section>
    );
};

const StatItem = ({ icon, label, value }) => (
    <div className="flex flex-col items-center md:items-end space-y-2">
        <div className="flex items-center space-x-2 text-lime-400 font-bold text-xl md:text-5xl">
            {icon}
            <span className='text-lg md:text-4xl'>{value}</span>
        </div>
        <span className="text-sm md:text-xl text-gray-400">{label}</span>
    </div>
);