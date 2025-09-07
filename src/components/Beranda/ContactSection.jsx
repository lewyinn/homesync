"use client";

import { motion } from "framer-motion";
import { FiPhone, FiMapPin, FiMail, FiMessageSquare } from "react-icons/fi";
import contact from '@/data/home/contact.json'

export default function ContactSection() {
    const mapSrc =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31637.6407!2d106.8166667!3d-6.2000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e94f0:0x0!2sJakarta!5e0!3m2!1sen!2sid!4v0000000000000";

    return (
        <section id="contact" className="py-20 px-4 lg:px-0">
            <div className="container mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-blue-700">{contact.title.split(' ')[0]}</span> {contact.title.replace(contact.title.split(' ')[0] + ' ', '')}
                    </h2>
                    <p className="text-black/70 max-w-lg mx-auto">
                        {contact.desc}
                    </p>
                </motion.div>

                {/* Grid: Contacts + Map */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact methods */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {contact.telephone.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 rounded-xl bg-black/5 backdrop-blur-md border border-black/15 p-5">
                                <div className="p-3 bg-blue-500/15 rounded-lg text-blue-600 mt-1">
                                    <FiPhone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1 text-black">{item.title}</h3>
                                    <p className="text-black/70 text-sm">{item.no}</p>
                                    <p className="text-black/70 text-sm">{item.schedule}</p>
                                </div>
                            </div>
                        ))}
                        {contact.email.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 rounded-xl bg-black/5 backdrop-blur-md border border-black/15 p-5">
                                <div className="p-3 bg-blue-500/15 rounded-lg text-blue-600 mt-1">
                                    <FiMail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1 text-black">{item.title}</h3>
                                    <p className="text-black/70 text-sm">{item.email}</p>
                                    <p className="text-black/70 text-sm">{item.info}</p>
                                </div>
                            </div>
                        ))}
                        {contact.sosmed.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 rounded-xl bg-black/5 backdrop-blur-md border border-black/15 p-5">
                                <div className="p-3 bg-blue-500/15 rounded-lg text-blue-600 mt-1">
                                    <FiMessageSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1 text-black">{item.title}</h3>
                                    <p className="text-black/70 text-sm">Instagram: {item.instagram}</p>
                                    <p className="text-black/70 text-sm">Facebook: {item.facebook}</p>
                                    <p className="text-black/70 text-sm">LinkedIn: {item.linkedin}</p>
                                </div>
                            </div>
                        ))}
                        {contact.location.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 rounded-xl bg-black/5 backdrop-blur-md border border-black/15 p-5">
                                <div className="p-3 bg-blue-500/15 rounded-lg text-blue-600 mt-1">
                                    <FiMapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1 text-black">{item.title}</h3>
                                    <p className="text-black/70 text-sm">{item.address}</p>
                                    <p className="text-black/70 text-sm">{item.info}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Map + overlay card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative overflow-hidden rounded-2xl border border-black/15"
                    >
                        <div className="h-[400px] md:h-[520px]">
                            <iframe
                                title="Homesync Map"
                                src={mapSrc}
                                className="h-full w-full"
                                style={{ border: 0, filter: "grayscale(15%) contrast(105%)" }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        {/* overlay info (glass) */}
                        <div className="absolute left-4 bottom-4 md:left-5 md:bottom-5">
                            <div className="rounded-xl bg-neutral-200/70 backdrop-blur-md border border-black/15 p-4 text-black shadow-2xl w-[88vw] max-w-sm">
                                <div className="text-xs uppercase tracking-wider text-blue-600 font-semibold">
                                    HomeSync HQ
                                </div>
                                <p className="text-black/80 text-sm mt-1">
                                    Jl. Luxury Avenue 123, Jakarta, Indonesia
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <a
                                        href="https://maps.google.com/?q=HomeSync%20HQ%20Jakarta"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center px-3 py-2 rounded-lg bg-blue-600 text-neutral-200 font-semibold hover:bg-blue-800 transition"
                                    >
                                        Open in Google Maps
                                    </a>
                                    <a
                                        href={`mailto:${contact.email[0]?.email || 'info@endihom.com'}`}
                                        className="inline-flex items-center px-3 py-2 rounded-lg bg-black/10 text-black border border-black/15 hover:bg-black/20 transition"
                                    >
                                        Email Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                />
            </div>
        </section>
    );
}
