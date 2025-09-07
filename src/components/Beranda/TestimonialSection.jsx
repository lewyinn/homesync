"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import headTestimonial from '@/data/home/head-testimonial.json';

export default function TestimonialSection() {
    const testimonials = [
        {
            id: 1,
            name: "Gregg Bergstrom",
            position: "Marketing Executive",
            quote: "Working with Living was a fantastic experience from start to finish. They listened to exactly what I wanted, and within a few short weeks, I found my dream home.",
            rating: 5
        },
        {
            id: 2,
            name: "Fraoud Jack",
            position: "Salim Group Assistant",
            quote: "I am not sure how you can have a better agent than Endihome and their entire team. If we ever need to sell our current home, we know exactly who to call.",
            rating: 5
        },
        {
            id: 3,
            name: "Chelle",
            position: "Services Business",
            quote: "The service was exceptional from beginning to end. They understood exactly what we were looking for and delivered beyond our expectations.",
            rating: 4
        },
        {
            id: 4,
            name: "Sarah Johnson",
            position: "Tech Entrepreneur",
            quote: "Found my perfect office space through Endihom. The team's knowledge of commercial properties is unmatched in the industry.",
            rating: 5
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const constraintsRef = useRef(null);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    return (
        <section id="testimonials" className="py-20 px-4 lg:px-0">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold mb-4">
                        <span className="text-blue-700">{headTestimonial.title.split(' ')[0]}</span> {headTestimonial.title.replace(headTestimonial.title.split(' ')[0] + ' ', '')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        {headTestimonial.desc}
                    </motion.p>
                </div>

                {/* Swipeable Testimonials */}
                <div className="relative overflow-hidden">
                    <div className="flex justify-between items-center mb-8">
                        <button
                            onClick={prevTestimonial}
                            className="p-2 rounded-full bg-neutral-800 text-blue-600 hover:bg-blue-800 hover:text-gray-200 transition-colors">
                            <FiChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-blue-500' : 'bg-neutral-700'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextTestimonial}
                            className="p-2 rounded-full bg-neutral-800 text-blue-600 hover:bg-blue-800 hover:text-gray-200 transition-colors">
                            <FiChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    <motion.div
                        ref={constraintsRef}
                        className="relative h-[428px]">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                drag="x"
                                dragConstraints={constraintsRef}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x > 50) prevTestimonial();
                                    if (info.offset.x < -50) nextTestimonial();
                                }}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{
                                    scale: index === currentIndex ? 1 : 0.9,
                                    opacity: index === currentIndex ? 1 : 0.7,
                                    x: `${(index - currentIndex) * 100}%`
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className={`absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col justify-center ${index === currentIndex ? "z-10" : "z-0"
                                    }`}
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`text-xl ${i < testimonial.rating ? "text-blue-600" : "text-neutral-700"
                                                }`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>

                                <blockquote className="text-2xl italic text-gray-300 mb-8">
                                    "{testimonial.quote}"
                                </blockquote>

                                <div>
                                    <h3 className="text-xl font-bold text-blue-600">{testimonial.name}</h3>
                                    <p className="text-gray-400">{testimonial.position}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}