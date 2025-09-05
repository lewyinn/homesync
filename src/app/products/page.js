"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiSearch, FiX, FiHome, FiStar } from "react-icons/fi";
import products from "@/data/products.json";

const ALL = "All";
const TYPES = [ALL, "House", "Apartment", "Premium"];

export default function ProductsPage() {
    const [query, setQuery] = useState("");
    const [activeType, setActiveType] = useState(ALL);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return products.filter((p) => {
            const matchType = activeType === ALL || p.type === activeType;
            const matchQuery =
                q.length === 0 ||
                p.title.toLowerCase().includes(q) ||
                p.location.toLowerCase().includes(q) ||
                p.desc.toLowerCase().includes(q);
            return matchType && matchQuery;
        });
    }, [query, activeType]);

    return (
        <main className="text-black min-h-screen pt-8 pb-16">
            {/* Top banner mini */}
            <section className="relative overflow-hidden">
                {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(132,204,22,0.12),transparent_80%)]" /> */}
                <div className="container mx-auto px-4 md:px-8 pt-16 md:pt-32">
                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold">
                            Our <span className="text-blue-700">Properties</span>
                        </h1>
                        <p className="mt-3 text-black/70 max-w-2xl mx-auto">
                            Pilihan properti eksklusif yang telah kami kurasi untuk Anda — hunian modern dengan lokasi strategis dan desain elegan.
                        </p>
                    </motion.div>

                    {/* Search + Filter Bar */}
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="mt-8 rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 p-3">
                        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
                            {/* Search */}
                            <div className="relative flex-1">
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Cari judul, lokasi, atau kata kunci…"
                                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-transparent text-black placeholder:text-black/50 outline-none"
                                />
                                <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black/60" />
                                {query && (
                                    <button aria-label="Clear" onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 hover:text-black/90">
                                        <FiX className="h-5 w-5" />
                                    </button>
                                )}
                            </div>

                            {/* Type filters */}
                            <div className="flex flex-wrap gap-2">
                                {TYPES.map((t) => {
                                    const active = activeType === t;
                                    return (
                                        <button
                                            key={t}
                                            onClick={() => setActiveType(t)}
                                            className={[
                                                "px-3 md:px-4 py-2 rounded-xl border text-sm transition",
                                                active ? "bg-blue-600 text-neutral-200 border-blue-400" : "bg-black/5 text-black/80 border-black/10 hover:bg-black/10",
                                            ].join(" ")}
                                        >
                                            {t}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Meta info */}
                        <div className="mt-2 text-xs text-black/60">
                            {filtered.length} result{filtered.length !== 1 ? "s" : ""}{" "}
                            {activeType !== ALL && (
                                <span className="ml-1">
                                    • filter: <span className="text-blue-400">{activeType}</span>
                                </span>
                            )}
                            {query && (
                                <span className="ml-1">
                                    • search: <span className="text-blue-400">“{query}”</span>
                                </span>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Cards */}
            <section className="mt-10">
                <div className="container mx-auto px-4 md:px-8">
                    {filtered.length === 0 ? (
                        <div className="rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 p-8 text-center">
                            <p className="text-black/80">Tidak ada properti yang cocok dengan pencarianmu. Coba ubah kata kunci atau filter tipe.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((p, idx) => (
                                <motion.article
                                    key={p.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                                    className="rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 hover:border-blue-400/80 transition overflow-hidden flex flex-col"
                                >
                                    {/* Cover */}
                                    <Link href={`/products/${p.slug}`} className="relative block h-44 md:h-48 overflow-hidden">
                                        <img src={p.cover} alt={p.title} className="h-full w-full object-cover hover:scale-[1.04] transition duration-500" loading="lazy" />
                                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-600 text-neutral-200 text-xs font-semibold">{p.badge}</span>
                                    </Link>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-xs text-black/60">
                                            <FiHome className="opacity-80" />
                                            <span>{p.type}</span>
                                            <span>•</span>
                                            <span>{p.year}</span>
                                            <span>•</span>
                                            <span>{p.size}</span>
                                        </div>

                                        <h3 className="text-lg font-semibold mt-1">
                                            <Link href={`/products/${p.slug}`} className="hover:underline">
                                                {p.title}
                                            </Link>
                                        </h3>
                                        <p className="text-sm text-black/70">{p.location}</p>

                                        <p className="text-sm text-black/75 mt-3 line-clamp-3">{p.desc}</p>

                                        <div className="mt-auto pt-4 flex items-center justify-between">
                                            <Link href={`/products/${p.slug}`} className="px-4 py-2 rounded-lg border border-blue-600 text-blue-400 hover:bg-blue-800 hover:text-neutral-200 transition text-sm font-semibold">
                                                See More →
                                            </Link>
                                            <span className="inline-flex items-center gap-1 text-xs text-black/60">
                                                <FiStar className="text-blue-400" /> Curated
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
