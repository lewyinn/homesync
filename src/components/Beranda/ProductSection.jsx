"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { FiHome, FiStar } from "react-icons/fi";
import inquiry from "@/data/home/inquiry.json"; // ini tetap boleh statis

const ALL = "All";

async function jsonSafe(res) {
    const text = await res.text();
    try { return JSON.parse(text); } catch { return []; }
}

export default function ProductSection() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeCategory, setActiveCategory] = useState(ALL);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/products", { cache: "no-store" });
                const data = await jsonSafe(res);
                const arr = Array.isArray(data) ? data : [];
                // sort terbaru (opsional)
                arr.sort((a, b) => Number(b.id) - Number(a.id));
                setProducts(arr);
            } catch (e) {
                console.error(e);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // kategori dinamis + ALL di depan
    const categories = useMemo(() => {
        const s = new Set(products.map((p) => p.type).filter(Boolean));
        return [ALL, ...Array.from(s)];
    }, [products]);

    // ambil 3 item sesuai kategori
    const filteredProducts = useMemo(() => {
        const list =
            activeCategory === ALL
                ? products
                : products.filter((p) => p.type === activeCategory);
        return list.slice(0, 3);
    }, [products, activeCategory]);

    return (
        <section id="products" className="text-gray-200 px-4 lg:px-0">
            <div className="container mx-auto bg-neutral-950 rounded-4xl px-6 md:px-12 py-20 md:py-12">
                {/* Inquiry Section */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mb-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-blue-600 text-xl font-bold mb-2">
                                {inquiry.tagline}
                            </h3>
                            <h2 className="text-3xl font-bold mb-4">{inquiry.title}</h2>
                            <p className="text-gray-400 mb-6">{inquiry.subtitle}</p>
                            <ScrollLink
                                to="contact"
                                smooth
                                duration={500}
                                offset={-70}
                                className="cursor-pointer px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                            >
                                Contact now
                            </ScrollLink>
                        </div>
                        <div className="bg-neutral-800 rounded-lg h-64 flex items-center justify-center">
                            <span className="text-gray-400">Consultant Image</span>
                        </div>
                    </div>
                </div>

                {/* Best Choice Section */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        <span className="text-blue-700">Best</span> choice for you
                    </h2>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                                        ? "bg-blue-600 text-gray-300"
                                        : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Property Grid */}
                {loading ? (
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center text-white/80">
                        Loading products…
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center text-white/80">
                        No products yet.
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((p, idx) => (
                            <motion.article
                                key={p.id}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: idx * 0.06 }}
                                className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/80 transition overflow-hidden flex flex-col"
                            >
                                {/* Cover */}
                                <Link
                                    href={`/products/${p.slug}`}
                                    className="relative block h-44 md:h-48 overflow-hidden"
                                >
                                    <img
                                        src={p.cover}
                                        alt={p.title}
                                        className="h-full w-full object-cover hover:scale-[1.04] transition duration-500"
                                        loading="lazy"
                                    />
                                    {p.badge && (
                                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-600 text-neutral-100 text-xs font-semibold">
                                            {p.badge}
                                        </span>
                                    )}
                                </Link>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-xs text-white/60">
                                        <FiHome className="opacity-80" />
                                        <span>{p.type}</span>
                                        {p.year && (
                                            <>
                                                <span>•</span>
                                                <span>{p.year}</span>
                                            </>
                                        )}
                                        {p.size && (
                                            <>
                                                <span>•</span>
                                                <span>{p.size}</span>
                                            </>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-semibold mt-1">{p.title}</h3>
                                    <p className="text-sm text-white/70">{p.location}</p>

                                    <p className="text-sm text-white/75 mt-3 line-clamp-3">
                                        {p.desc}
                                    </p>

                                    <div className="mt-auto pt-4 flex items-center justify-between">
                                        <Link
                                            href={`/products/${p.slug}`}
                                            className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-800 hover:text-neutral-200 transition text-sm font-semibold"
                                        >
                                            See More →
                                        </Link>
                                        <span className="inline-flex items-center gap-1 text-xs text-white/60">
                                            <FiStar className="text-blue-600" /> Curated
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
