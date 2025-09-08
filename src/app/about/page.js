"use client";

import { motion } from "framer-motion";
import {
    FiAward,
    FiTarget,
    FiUsers,
    FiShield,
    FiTrendingUp,
    FiHome,
    FiCompass,
} from "react-icons/fi";
import hero from "@/data/about/hero.json";
import story from "@/data/about/story.json";
import whatwedo from "@/data/about/whatwedo.json";
import visimisi from "@/data/about/visimisi.json";
import values from "@/data/about/values.json";
import milestone from "@/data/about/milestone.json";

const pop = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function AboutPage() {
    const badgeIcons = [FiUsers, FiHome, FiTrendingUp];

    return (
        <main className="text-black">
            {/* HERO */}
            <section>
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(132,204,22,0.12),transparent_50%)]" />
                <div className="container mx-auto px-4 md:px-8 pt-32 md:pt-40">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        transition={{ staggerChildren: 0.06, duration: 0.6, ease: "easeOut" }}
                    >
                        <motion.h1 variants={pop} className="text-4xl md:text-5xl font-extrabold">
                            {hero.title.split(' ')[0]} <span className="text-blue-700">{hero.title.split(' ')[1]}</span>
                        </motion.h1>
                        <motion.p variants={pop} className="mt-4 max-w-2xl text-black/80">
                            {hero.desc}
                        </motion.p>

                        <motion.div variants={pop}
                            className="mt-6 flex flex-wrap items-center gap-4 text-sm text-black/70"
                        >
                            {hero.badges.map((badge, idx) => {
                                const Icon = badgeIcons[idx] || FiAward;
                                return (
                                    <span
                                        key={badge.title}
                                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-black/5 backdrop-blur-md border border-black/10"
                                    >
                                        <Icon /> {badge.title}
                                    </span>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* SEJARAH / OUR STORY */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        <motion.div
                            className="rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 p-6 md:p-8"
                            initial={pop.hidden}
                            whileInView={pop.show}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl md:text-3xl font-extrabold">{story.title || "Our Story"}</h2>
                            <p className="mt-3 text-black/80">{story.desc1}</p>
                            <p className="mt-3 text-black/80">{story.desc2}</p>

                        </motion.div>

                        <motion.div
                            className="rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 p-6 md:p-8"
                            initial={pop.hidden}
                            whileInView={pop.show}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h3 className="text-xl md:text-2xl font-bold">{whatwedo.title || "What We Do"}</h3>
                            <ul className="mt-4 space-y-3 text-black/85">
                                {whatwedo?.badges?.map((b, i) => (
                                    <li key={i} className="flex gap-3">
                                        <FiShield className="mt-1 text-blue-600 shrink-0" />
                                        {b.title}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 h-px bg-black/10" />
                            <p className="mt-4 text-sm text-black/60">
                                {whatwedo?.note}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* VISI & MISI */}
            <section className="py-16 md:py-20 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white rounded-2xl">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8"
                            initial={pop.hidden}
                            whileInView={pop.show}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl md:text-3xl font-extrabold">{visimisi.visi?.[0]?.title || "Visi"}</h2>
                            <p className="mt-3 text-white/80">
                                {visimisi.visi?.[0]?.desc}
                            </p>
                        </motion.div>

                        <motion.div
                            className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8"
                            initial={pop.hidden}
                            whileInView={pop.show}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h2 className="text-2xl md:text-3xl font-extrabold">{visimisi.misi?.[0]?.title || "Misi"}</h2>
                            <ul className="mt-4 space-y-3 text-white/85">
                                {visimisi.misi?.[0]?.badges?.map((b, i) => (
                                    <li key={i} className="flex gap-3">
                                        <FiTarget className="mt-1 text-blue-600 shrink-0" />
                                        {b.title} ok
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* VALUES */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold">{values.title}</h2>
                    <p className="mt-2 text-black/70">{values.desc}</p>

                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {values.value?.map((v, i) => {
                            // Pilih icon sesuai value
                            let Icon = FiAward;
                            if (v.title === "Integrity") Icon = FiShield;
                            else if (v.title === "Empathy") Icon = FiUsers;
                            else if (v.title === "Excellence") Icon = FiTrendingUp;
                            else if (v.title === "Guidance") Icon = FiCompass;
                            return (
                                <motion.div
                                    key={v.title}
                                    className="rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 p-5"
                                    initial={pop.hidden}
                                    whileInView={pop.show}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.45 }}
                                >
                                    <div className="text-blue-600 text-2xl">
                                        <Icon />
                                    </div>
                                    <h3 className="mt-3 font-semibold">{v.title}</h3>
                                    <p className="text-black/75 text-sm mt-1">{v.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* TIMELINE */}
            <section className="py-16 md:py-20 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white rounded-2xl">
                <div className="container mx-auto px-4 md:px-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold">Milestones</h2>
                    <div className="mt-6 relative">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/30" />
                        <div className="space-y-8">
                            {milestone.timeline?.map((t, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.45 }}
                                    className={`relative grid md:grid-cols-2 gap-6 items-start ${idx % 2 === 1 ? "md:text-left" : "md:text-right"}`}
                                >
                                    <div className={`hidden md:block ${idx % 2 === 1 ? "order-1" : "order-2"}`} />
                                    <div
                                        className={`relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-5 ${idx % 2 === 1 ? "order-2 md:order-1" : "order-1 md:order-2"}`}
                                    >
                                        <span className="text-blue-600 text-sm font-semibold">{t.year}</span>
                                        <h3 className="text-lg font-semibold mt-1">{t.title}</h3>
                                        <p className="text-white/75 text-sm mt-1">{t.desc}</p>
                                        <span className="absolute -left-2 top-6 h-4 w-4 rounded-full bg-blue-400 ring-8 ring-blue-400/20 md:-left-2 md:translate-x-0" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS STRIP */}
            <section className="py-12">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { k: "37K+", v: "Customers" },
                            { k: "40K+", v: "Units Ready" },
                            { k: "5K+", v: "Units Sold" },
                            { k: "4.8/5", v: "Average Rating" },
                        ].map((s) => (
                            <div
                                key={s.v}
                                className="rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 p-5 text-center"
                            >
                                <div className="text-2xl font-extrabold text-blue-600">{s.k}</div>
                                <div className="text-black/70 text-sm mt-1">{s.v}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-extrabold">
                                Siap menemukan <span className="text-blue-700">hunian impian</span>?
                            </h3>
                            <p className="text-black/75 mt-1">
                                Jelajahi properti pilihan atau hubungi konsultan kami untuk konsultasi gratis.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <a
                                href="/#products"
                                className="px-5 py-3 rounded-xl bg-blue-500 text-neutral-100 font-semibold hover:bg-blue-700 transition"
                            >
                                Browse Properties
                            </a>
                            <a
                                href="/#contact"
                                className="px-5 py-3 rounded-xl bg-black/10 text-black border border-black/15 hover:bg-black/20 transition"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
