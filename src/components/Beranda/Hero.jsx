"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { FaStar } from "react-icons/fa";

const pop = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Hero() {
    return (
        <section className="px-4 lg:px-0 py-28 md:py-48">
            <div className="container mx-auto px-2 md:px-8">
                <div className="relative z-[1] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                    {/* Left: Copy */}
                    <motion.div
                        className="lg:col-span-6 text-white"
                        initial="hidden"
                        animate="show"
                        transition={{ staggerChildren: 0.06, duration: 0.6, ease: "easeOut" }}
                    >
                        <motion.h1
                            variants={pop}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
                        >
                            Discover <span className="text-blue-700">Modern Homes</span>
                            <br /> Tailored to Your{" "}
                            <span className="underline decoration-blue-600">Lifestyle</span>
                        </motion.h1>

                        <motion.p variants={pop} className="mt-4 text-white/85 max-w-2xl">
                            Temukan rumah strategis, nyaman, dan modern sesuai kebutuhan Anda.
                            Beli, jual, atau sewa — semua lebih mudah dengan HomeSync.
                        </motion.p>

                        {/* CTA */}
                        <motion.div variants={pop} className="mt-8 flex flex-wrap items-center gap-3">
                            <ScrollLink
                                to="products"
                                smooth={true}
                                duration={500}
                                offset={-70}
                                href="#products"
                                className="px-5 py-3 rounded-xl bg-blue-600 text-neutral-200 font-semibold hover:bg-blue-800 transition"
                            >
                                Browse Properties
                            </ScrollLink>
                            <ScrollLink
                                to="contact"
                                smooth={true}
                                duration={500}
                                offset={-70}
                                href="#contact"
                                className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/15 hover:bg-white/20 transition">
                                Contact Us
                            </ScrollLink>
                        </motion.div>

                        {/* Trust badge */}
                        <motion.div variants={pop} className="mt-5 flex items-center gap-3 text-white/85">
                            <FaStar className="h-5 w-5 text-blue-600" />
                            <span>Trusted by 1,200+ homeowners • Rating 4.8/5</span>
                        </motion.div>

                        {/* Bullet benefits */}
                        <motion.ul
                            variants={pop}
                            className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl text-sm">
                            {[
                                "Listing terkurasi & up-to-date",
                                "Konsultan responsif & profesional",
                                "Transaksi aman & transparan",
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="rounded-xl border border-white/10 bg-black/10 backdrop-blur-xs text-white px-4 py-3"
                                >
                                    {item}
                                </li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Right: Highlight card */}
                    <motion.div
                        className="lg:col-span-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}>
                        <div className="glass flex flex-col rounded-2xl p-5 md:p-6 text-white shadow-2xl gap-4">
                            <div className="flex flex-col items-start gap-2">
                                <div className="text-xs uppercase tracking-wider text-blue-600 font-semibold">
                                    Top Testimonial
                                </div>
                                <blockquote className="text-lg italic text-white/90">
                                    “Pengalaman mencari rumah jadi gampang banget. Timnya responsif dan profesional!”
                                </blockquote>
                            </div>
                            <div className="h-px bg-white/10" />
                            <div className="flex flex-col items-start gap-2">
                                <div className="text-xs uppercase tracking-wider text-blue-600 font-semibold">
                                    Featured Project
                                </div>
                                <blockquote className="text-lg italic text-white/90">
                                    “Hunian premium dengan akses strategis, desain kontemporer, dan fasilitas lengkap.”
                                </blockquote>
                            </div>
                            <div className="h-px bg-white/10" />
                            <div className="flex flex-col items-start gap-2">
                                <div className="text-blue-600 font-semibold">
                                    Etalon City
                                </div>
                                <p className="text-white/80 text-sm">
                                    Kawasan hunian modern dengan akses premium, desain kontemporer, dan fasilitas lengkap.
                                </p>
                                <ScrollLink 
                                    to="products"
                                    smooth={true}
                                    duration={500}
                                    offset={-70}
                                    className="cursor-pointer inline-flex items-center gap-2 text-blue-600 hover:underline" >
                                    See Detail →
                                </ScrollLink>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
