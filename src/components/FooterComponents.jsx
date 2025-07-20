"use client";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { FiMessageSquare, FiMail, FiTwitter, FiInstagram } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-neutral-950 text-gray-300 py-12 -mx-6 px-8 lg:px-0 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    {/* Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-xl font-bold mb-6">
                            Have something to talk about with our professionals?
                        </h3>
                        <div className="relative max-w-md">
                            <input
                                type="email"
                                placeholder="Your email here"
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 pl-4 pr-32 text-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-500"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-lime-600 hover:bg-lime-700 rounded-md text-sm font-medium transition-colors">
                                Send
                            </button>
                        </div>
                    </motion.div>

                    {/* Contact Methods */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap gap-6"
                    >
                        {[
                            { icon: FiMessageSquare, label: "Whatsapp", link: "#" },
                            { icon: FiMail, label: "Email", link: "#" },
                            { icon: FiTwitter, label: "Twitter", link: "#" },
                            { icon: FiInstagram, label: "Instagram", link: "#" },
                            { label: "Think", link: "#" },
                        ].map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                className="flex items-center gap-2 text-gray-400 hover:text-lime-500 transition-colors"
                            >
                                {item.icon && <item.icon className="w-5 h-5" />}
                                <span>{item.label}</span>
                                {index < 4 && <span className="text-lime-500 ml-2"><FaArrowRight/></span>}
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="h-px bg-neutral-800 w-full mb-8"></div>

                {/* Bottom Section */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap gap-6"
                    >
                        {["About", "Services", "Agents", "Contact"].map((item, index) => (
                            <a
                                key={index}
                                href="#"
                                className="text-gray-400 hover:text-lime-500 transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </motion.div>

                    {/* Copyright */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-gray-500 text-sm md:text-right"
                    >
                        <div className="mb-2">Find your dream house</div>
                        <div>+628 8218 8271 311</div>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}