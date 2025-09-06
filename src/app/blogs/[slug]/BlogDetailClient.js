"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogDetailClient({ item, others }) {
    return (
        <main className="text-black min-h-screen pt-8 pb-16">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(132,204,22,0.12),transparent_70%)] -z-10" />
                <div className="container mx-auto px-4 md:px-8 pt-16 md:pt-24 z-50">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href="/blogs"
                            className="text-black/70 hover:text-black transition"
                        >
                            ← Back to Blogs
                        </Link>
                        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold">
                            {item.title}
                        </h1>
                        <div className="mt-2 text-sm text-black/60 flex items-center gap-2">
                            <span className="px-2 py-1 rounded-full bg-black/10 border border-black/15 text-black/80">
                                {item.tag}
                            </span>
                            <span>•</span>
                            <span>{item.date}</span>
                            <span>•</span>
                            <span>{item.read}</span>
                        </div>
                    </motion.div>

                    {/* Cover */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-black/5"
                    >
                        <div className="relative aspect-[16/7] md:aspect-[16/6]">
                            <img
                                src={item.cover}
                                alt={item.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content + Sidebar */}
            <section className="mt-10">
                <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-4 gap-8">
                    {/* Content (3/4) */}
                    <motion.article
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="lg:col-span-3"
                    >
                        <div className="prose prose-neutral max-w-none">
                            <p className="text-black/80 leading-relaxed">
                                {item.content}
                            </p>
                        </div>

                        {/* CTA / Share */}
                        <div className="mt-8 rounded-2xl border border-black/10 bg-black/5 p-5">
                            <h3 className="font-semibold text-lg">Bagikan artikel ini</h3>
                            <div className="mt-3 flex gap-3 text-sm">
                                <a className="underline hover:no-underline" href="#">
                                    Copy Link
                                </a>
                                <a className="underline hover:no-underline" href="#">
                                    Share WhatsApp
                                </a>
                                <a className="underline hover:no-underline" href="#">
                                    Share X
                                </a>
                            </div>
                        </div>
                    </motion.article>

                    {/* Sidebar (1/4) */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            <h3 className="text-sm font-semibold text-black/70 tracking-wide">
                                Artikel Lainnya
                            </h3>

                            {others.map((p, idx) => (
                                <motion.article
                                    key={p.slug}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                                    className="overflow-hidden rounded-xl bg-black/5 backdrop-blur-md border border-black/10 hover:border-black/25 transition"
                                >
                                    <Link href={`/blogs/${p.slug}`} className="block">
                                        <div className="aspect-[16/10] overflow-hidden">
                                            <img
                                                src={p.cover}
                                                alt={p.title}
                                                className="h-full w-full object-cover hover:scale-[1.03] transition duration-500"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <div className="mb-1 flex items-center gap-2 text-[11px] text-black/70">
                                                <span className="px-2 py-0.5 rounded-full bg-black/10 border border-black/15">
                                                    {p.tag}
                                                </span>
                                                <span>•</span>
                                                <span>{p.read}</span>
                                            </div>
                                            <h4 className="text-sm font-semibold leading-snug line-clamp-2">
                                                {p.title}
                                            </h4>
                                            <p className="mt-1 text-xs text-black/70 line-clamp-2">
                                                {p.excerpt}
                                            </p>
                                            <span className="mt-2 inline-block text-blue-400 text-xs">
                                                Read more →
                                            </span>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
