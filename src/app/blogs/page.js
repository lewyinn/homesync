"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";

const ALL = "All";
const STATIC_TAGS = [ALL, "Tips", "News", "Guides", "Inspiration"]; // fallback kalau mau tetap ada opsi default

async function jsonSafe(res) {
    const text = await res.text();
    try { return JSON.parse(text); } catch { return []; }
}

export default function BlogsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState("");
    const [activeTag, setActiveTag] = useState(ALL);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/posts", { cache: "no-store" });
                const data = await jsonSafe(res);
                const arr = Array.isArray(data) ? data : [];
                // sort terbaru dulu (id lebih besar dianggap terbaru)
                arr.sort((a, b) => Number(b.id) - Number(a.id));
                setPosts(arr);
            } catch (e) {
                console.error(e);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Buat daftar tags dinamis (dengan fallback static)
    const tags = useMemo(() => {
        const set = new Set(STATIC_TAGS); // mulai dari static supaya opsi tetap ada
        for (const p of posts) if (p?.tag) set.add(p.tag);
        // pastikan ALL selalu di depan
        const arr = Array.from(set).filter(t => t !== ALL);
        arr.sort(); // opsional
        return [ALL, ...arr];
    }, [posts]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return posts.filter((p) => {
            const matchTag = activeTag === ALL || p.tag === activeTag;
            const matchQuery =
                q.length === 0 ||
                p.title?.toLowerCase().includes(q) ||
                p.excerpt?.toLowerCase().includes(q) ||
                p.tag?.toLowerCase().includes(q);
            return matchTag && matchQuery;
        });
    }, [posts, query, activeTag]);

    return (
        <main className="text-black min-h-screen pt-8 pb-16">
            {/* Top banner */}
            <section className="relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-8 pt-16 md:pt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold">
                            Our <span className="text-blue-700">Blogs</span>
                        </h1>
                        <p className="mt-3 text-black/70 max-w-2xl mx-auto">
                            Kumpulan artikel kurasi tim kami—tips, tren, dan insight properti
                            terbaru untuk membantumu mengambil keputusan.
                        </p>
                    </motion.div>

                    {/* Search + Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="mt-8 rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 p-3"
                    >
                        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
                            {/* Search */}
                            <div className="relative flex-1">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black/60" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Cari judul, tag, atau kata kunci…"
                                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-transparent text-black placeholder:text-black/50 outline-none"
                                />
                                {query && (
                                    <button
                                        aria-label="Clear"
                                        onClick={() => setQuery("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 hover:text-black/90"
                                    >
                                        <FiX className="h-5 w-5" />
                                    </button>
                                )}
                            </div>

                            {/* Tag filters */}
                            <div className="flex flex-wrap gap-2">
                                {tags.map((t) => {
                                    const active = activeTag === t;
                                    return (
                                        <button
                                            key={t}
                                            onClick={() => setActiveTag(t)}
                                            className={[
                                                "px-3 md:px-4 py-2 rounded-xl border text-sm transition",
                                                active
                                                    ? "bg-blue-600 text-neutral-200 border-blue-400"
                                                    : "bg-black/5 text-black/80 border-black/10 hover:bg-black/10",
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
                            {loading ? "Loading…" : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`}
                            {activeTag !== ALL && !loading && (
                                <span className="ml-1">
                                    • tag: <span className="text-blue-400">{activeTag}</span>
                                </span>
                            )}
                            {query && !loading && (
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
                    {loading ? (
                        <div className="rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 p-8 text-center">
                            <p className="text-black/80">Memuat artikel…</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 p-8 text-center">
                            <p className="text-black/80">
                                Tidak ada artikel yang cocok. Coba ubah kata kunci atau pilih tag lain.
                            </p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((p, idx) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                                >
                                    <article className="group overflow-hidden rounded-2xl bg-black/5 backdrop-blur-md border border-black/15 hover:border-black/25 transition">
                                        <div className="aspect-[16/10] overflow-hidden">
                                            <img
                                                src={p.cover}
                                                alt={p.title}
                                                className="h-full w-full object-cover group-hover:scale-[1.05] transition duration-500"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <div className="mb-2 flex items-center gap-2 text-xs text-black/70">
                                                <span className="px-2 py-1 rounded-full bg-black/10 border border-black/15 text-black/80">
                                                    {p.tag}
                                                </span>
                                                <span>•</span>
                                                <span>{p.date}</span>
                                                <span>•</span>
                                                <span>{p.read}</span>
                                            </div>
                                            <h3 className="text-black font-semibold text-lg leading-snug">
                                                {p.title}
                                            </h3>
                                            <p className="mt-2 text-black/75 text-sm">{p.excerpt}</p>
                                            <Link
                                                href={`/blogs/${p.slug}`}
                                                className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
                                            >
                                                Read more →
                                            </Link>
                                        </div>
                                    </article>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
