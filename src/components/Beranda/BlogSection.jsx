"use client";

import Link from "next/link";
import posts from "@/data/posts";
import headBlogs from '@/data/home/head-blogs.json';

export default function BlogSection() {
    const blogsToShow = posts.slice(0, 3); // Show only the latest 3 posts

    return (
        <section id="blog" className="py-14 md:py-20">
            <div className="container mx-auto px-2 md:px-8">
                <div className="mb-8 md:mb-10 flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-black">
                            {headBlogs.title.split(' ')[0]} <span className="text-blue-700">{headBlogs.title.replace(headBlogs.title.split(' ')[0] + ' ', '')}</span>
                        </h2>
                        <p className="mt-2 text-black/70">
                            {headBlogs.desc}
                        </p>
                    </div>
                    <Link
                        href="/blogs"
                        className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-blue-600 text-gray-200 font-semibold hover:bg-blue-800 transition"
                    >
                        See all articles
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {blogsToShow.map((p) => (
                        <article
                            key={p.id}
                            className="cursor-pointer group overflow-hidden rounded-2xl bg-black/5 backdrop-blur-md border border-black/15 hover:border-black/25 transition"
                        >
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
                                    href={'/blogs/' + p.slug}
                                    className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
                                >
                                    Read more →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-6 sm:hidden">
                    <Link
                        href="#"
                        className="inline-flex w-full justify-center px-4 py-3 rounded-xl bg-blue-500 text-neutral-900 font-semibold hover:bg-blue-400 transition"
                    >
                        See all articles
                    </Link>
                </div>
            </div>
        </section>
    );
}
