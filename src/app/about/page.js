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

const pop = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function AboutPage() {
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
                            About <span className="text-blue-700">HomeSync</span>
                        </motion.h1>
                        <motion.p variants={pop} className="mt-4 max-w-2xl text-black/80">
                            Kami membantu orang menemukan hunian modern yang nyaman, strategis, dan
                            sesuai gaya hidup—dengan proses yang transparan dan dukungan konsultan
                            yang profesional.
                        </motion.p>

                        <motion.div
                            variants={pop}
                            className="mt-6 flex flex-wrap items-center gap-4 text-sm text-black/70"
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-black/5 backdrop-blur-md border border-black/10">
                                <FiUsers /> 37K+ Customers
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-black/5 backdrop-blur-md border border-black/10">
                                <FiHome /> 40K+ Units Ready
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-black/5 backdrop-blur-md border border-black/10">
                                <FiTrendingUp /> 5K+ Units Sold
                            </span>
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
                            <h2 className="text-2xl md:text-3xl font-extrabold">Our Story</h2>
                            <p className="mt-3 text-black/80">
                                HomeSync lahir dari kebutuhan untuk menyederhanakan proses jual-beli
                                dan sewa properti. Berawal dari tim kecil konsultan properti dan
                                software engineer, kami membangun platform yang mengedepankan
                                verifikasi listing, data transparan, dan pengalaman pengguna yang
                                intuitif.
                            </p>
                            <p className="mt-3 text-black/80">
                                Hari ini, kami bermitra dengan pengembang, perbankan, serta layanan
                                terkait untuk menghadirkan pilihan hunian yang berkualitas dan
                                dapat dipercaya di berbagai kota besar.
                            </p>
                        </motion.div>

                        <motion.div
                            className="rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 p-6 md:p-8"
                            initial={pop.hidden}
                            whileInView={pop.show}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h3 className="text-xl md:text-2xl font-bold">What We Do</h3>
                            <ul className="mt-4 space-y-3 text-black/85">
                                <li className="flex gap-3">
                                    <FiShield className="mt-1 text-blue-600 shrink-0" />
                                    Verifikasi listing dan kelengkapan legalitas untuk keamanan transaksi.
                                </li>
                                <li className="flex gap-3">
                                    <FiCompass className="mt-1 text-blue-600 shrink-0" />
                                    Rekomendasi hunian sesuai preferensi lokasi, budget, dan gaya hidup.
                                </li>
                                <li className="flex gap-3">
                                    <FiAward className="mt-1 text-blue-600 shrink-0" />
                                    Pendampingan konsultan dari survey, negosiasi, hingga serah terima.
                                </li>
                            </ul>
                            <div className="mt-6 h-px bg-black/10" />
                            <p className="mt-4 text-sm text-black/60">
                                *Kami terus mengembangkan fitur baru agar proses pencarian hingga transaksi
                                makin cepat, aman, dan menyenangkan.
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
                            <h2 className="text-2xl md:text-3xl font-extrabold">Visi</h2>
                            <p className="mt-3 text-white/80">
                                Menjadi platform properti paling dipercaya yang menyelaraskan manusia,
                                hunian, dan teknologi—menciptakan pengalaman menemukan rumah yang
                                elegan, cepat, dan transparan.
                            </p>
                        </motion.div>

                        <motion.div
                            className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8"
                            initial={pop.hidden}
                            whileInView={pop.show}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h2 className="text-2xl md:text-3xl font-extrabold">Misi</h2>
                            <ul className="mt-4 space-y-3 text-white/85">
                                <li className="flex gap-3">
                                    <FiTarget className="mt-1 text-blue-600 shrink-0" />
                                    Menghadirkan listing akurat & up-to-date dengan kurasi ketat.
                                </li>
                                <li className="flex gap-3">
                                    <FiUsers className="mt-1 text-blue-600 shrink-0" />
                                    Memberikan pendampingan profesional yang ramah dan responsif.
                                </li>
                                <li className="flex gap-3">
                                    <FiTrendingUp className="mt-1 text-blue-600 shrink-0" />
                                    Memaksimalkan nilai bagi pembeli, penjual, dan mitra.
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* VALUES */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold">Our Values</h2>
                    <p className="mt-2 text-black/70">Prinsip-prinsip yang kami pegang dalam melayani Anda.</p>

                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { icon: <FiShield />, title: "Integrity", desc: "Jujur, jelas, dan bertanggung jawab." },
                            { icon: <FiUsers />, title: "Empathy", desc: "Mendengar kebutuhan, memberi solusi." },
                            { icon: <FiAward />, title: "Excellence", desc: "Detail rapi, standar tinggi." },
                            { icon: <FiCompass />, title: "Guidance", desc: "Mengarahkan dengan data & pengalaman." },
                        ].map((v) => (
                            <motion.div
                                key={v.title}
                                className="rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 p-5"
                                initial={pop.hidden}
                                whileInView={pop.show}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.45 }}
                            >
                                <div className="text-blue-600 text-2xl">{v.icon}</div>
                                <h3 className="mt-3 font-semibold">{v.title}</h3>
                                <p className="text-black/75 text-sm mt-1">{v.desc}</p>
                            </motion.div>
                        ))}
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
                            {[
                                {
                                    year: "2022",
                                    title: "Mulai Beroperasi",
                                    desc: "Mendisrupsi pencarian properti dengan verifikasi listing & UI modern.",
                                    side: "left",
                                },
                                {
                                    year: "2023",
                                    title: "Kemitraan Strategis",
                                    desc: "Kolaborasi dengan pengembang & lembaga keuangan terpilih.",
                                    side: "right",
                                },
                                {
                                    year: "2024",
                                    title: "Ekspansi Multi-Kota",
                                    desc: "Menjangkau lebih banyak wilayah dan pilihan properti.",
                                    side: "left",
                                },
                                {
                                    year: "2025",
                                    title: "Smart Matching",
                                    desc: "Rilis rekomendasi cerdas berbasis preferensi & aktivitas pengguna.",
                                    side: "right",
                                },
                            ].map((t, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.45 }}
                                    className={`relative grid md:grid-cols-2 gap-6 items-start ${t.side === "right" ? "md:text-left" : "md:text-right"
                                        }`}
                                >
                                    <div className={`hidden md:block ${t.side === "right" ? "order-1" : "order-2"}`} />
                                    <div
                                        className={`relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-5 ${t.side === "right" ? "order-2 md:order-1" : "order-1 md:order-2"
                                            }`}
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
