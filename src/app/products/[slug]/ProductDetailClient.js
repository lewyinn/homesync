"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiHome, FiMapPin, FiCalendar, FiMaximize, FiArrowLeft } from "react-icons/fi";

export default function ProductDetailClient({ item }) {
    return (
        <main className="text-black min-h-screen pt-8 pb-16">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute -z-10 inset-0 bg-[radial-gradient(ellipse_at_top,rgba(132,204,22,0.12),transparent_65%)]" />
                <div className="container mx-auto px-4 md:px-8 pt-14 md:pt-20 z-50">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Link href="/products" className="cursor-pointer inline-flex items-center gap-2 text-black/70 hover:text-black transition">
                            <FiArrowLeft /> Back to Properties
                        </Link>
                        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold">{item.title}</h1>
                        <p className="mt-2 text-black/70">{item.location}</p>
                    </motion.div>

                    {/* Cover */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.05 }} className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-black/5">
                        <div className="relative aspect-[16/8] md:aspect-[16/6]">
                            <img src={item.cover} alt={item.title} className="h-full w-full object-cover" />
                            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-blue-600 text-neutral-200 text-xs font-semibold">
                                {item.badge}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="mt-8">
                <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-3 gap-8">
                    {/* Main */}
                    <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-2">
                        <h2 className="text-xl font-semibold">Overview</h2>
                        <p className="mt-3 text-black/75 leading-relaxed">{item.desc}</p>

                        <div className="mt-6 grid sm:grid-cols-2 gap-4">
                            <div className="rounded-xl border border-black/10 bg-black/5 p-4 flex items-center gap-3">
                                <FiHome className="text-black/70" />
                                <div>
                                    <div className="text-xs text-black/60">Type</div>
                                    <div className="font-semibold">{item.type}</div>
                                </div>
                            </div>
                            <div className="rounded-xl border border-black/10 bg-black/5 p-4 flex items-center gap-3">
                                <FiCalendar className="text-black/70" />
                                <div>
                                    <div className="text-xs text-black/60">Year</div>
                                    <div className="font-semibold">{item.year}</div>
                                </div>
                            </div>
                            <div className="rounded-xl border border-black/10 bg-black/5 p-4 flex items-center gap-3">
                                <FiMaximize className="text-black/70" />
                                <div>
                                    <div className="text-xs text-black/60">Size</div>
                                    <div className="font-semibold">{item.size}</div>
                                </div>
                            </div>
                            <div className="rounded-xl border border-black/10 bg-black/5 p-4 flex items-center gap-3">
                                <FiMapPin className="text-black/70" />
                                <div>
                                    <div className="text-xs text-black/60">Location</div>
                                    <div className="font-semibold">{item.location}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 rounded-2xl border border-black/10 bg-black/5 p-5">
                            <h3 className="font-semibold text-lg">Highlights</h3>
                            <ul className="mt-3 list-disc pl-5 text-black/75 space-y-1">
                                <li>Desain kontemporer & detail premium</li>
                                <li>Akses strategis ke pusat kota & transportasi</li>
                                <li>Ruang terang dengan tata letak efisien</li>
                            </ul>
                        </div>
                    </motion.article>

                    {/* Side card / CTA */}
                    <motion.aside initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="lg:col-span-1">
                        <div className="rounded-2xl border border-black/10 bg-black/5 p-5">
                            <h3 className="text-lg font-semibold">Tertarik properti ini?</h3>
                            <p className="text-sm text-black/70 mt-2">Hubungi tim kami untuk jadwal tur dan info lebih lanjut.</p>
                            <a
                                href="#contact"
                                className="mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-800 hover:text-neutral-200 transition text-sm font-semibold w-full"
                            >
                                Contact Us →
                            </a>
                            <div className="mt-4 text-xs text-black/60">
                                Badge: <span className="text-black font-medium">{item.badge}</span>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </section>
        </main>
    );
}
