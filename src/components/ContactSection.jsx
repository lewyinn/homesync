"use client";
import { motion } from "framer-motion";
import { FiPhone, FiMapPin, FiMail, FiMessageSquare } from "react-icons/fi";

export default function ContactSection() {
    return (
        <section id="contact" className="py-20 px-4 lg:px-0">
            <div className="max-w-4xl md:max-w-5/6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-lime-500">Get In</span> Touch
                    </h2>
                    <p className="text-gray-400 max-w-lg mx-auto">
                        Our team is ready to assist you with any inquiries about our properties and services.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Methods */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-lime-500/10 rounded-lg text-lime-500 mt-1">
                                <FiPhone className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Call Us</h3>
                                <p className="text-gray-400">+1 (234) 567-8900</p>
                                <p className="text-gray-400 text-sm">Mon-Fri, 9AM-6PM</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-lime-500/10 rounded-lg text-lime-500 mt-1">
                                <FiMail className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Email Us</h3>
                                <p className="text-gray-400">info@endihom.com</p>
                                <p className="text-gray-400 text-sm">Response within 24 hours</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visit Us */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-lime-500/10 rounded-lg text-lime-500 mt-1">
                                <FiMapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Visit Us</h3>
                                <p className="text-gray-400">123 Luxury Avenue</p>
                                <p className="text-gray-400">Beverly Hills, CA 90210</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-lime-500/10 rounded-lg text-lime-500 mt-1">
                                <FiMessageSquare className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Social Media</h3>
                                <div className="flex gap-4 mt-2">
                                    <a href="#" className="text-gray-400 hover:text-lime-500 transition-colors">Instagram</a>
                                    <a href="#" className="text-gray-400 hover:text-lime-500 transition-colors">Facebook</a>
                                    <a href="#" className="text-gray-400 hover:text-lime-500 transition-colors">LinkedIn</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Element */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 h-px bg-gradient-to-r from-transparent via-lime-500 to-transparent"
                />
            </div>
        </section>
    );
}