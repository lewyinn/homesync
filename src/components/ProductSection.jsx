"use client";
import { motion } from "framer-motion";

export default function ProductSection() {
    const properties = [
        {
            title: "553 Chalybeate",
            location: "Woodland, STJouis, 3033",
            size: "800 m²",
            year: "2021",
            description: "Interior features gorgeous tongue & groove mill work, custom cabinetry, top of the line appliances in both kitchens. Tennessee fadstone fireplaces, and dual laundry rooms.",
            tag: "New View"
        },
        {
            title: "Luxury Living",
            location: "Bantu Residence",
            size: "650 m²",
            year: "2020",
            description: "Step into a world where elegance and ease come together in perfect harmony. Each home is designed with high-end finishes and ample living spaces.",
            tag: "Penthouse"
        },
        {
            title: "Minimalist Haven",
            location: "Loszec Calurang",
            size: "450 m²",
            year: "2022",
            description: "Enjoy a sophisticated lifestyle with breathtaking city views, sleek design, and modern conveniences at your doorstep.",
            tag: "Apartment"
        }
    ];

    const categories = ["All", "Penthouse", "Apartment", "New"];

    return (
        <section id="products" className="text-gray-200">
            <div className="max-w-7xl md:max-w-5/6 bg-neutral-950 rounded-4xl mx-auto px-12 py-20">
                {/* Inquiry Section */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mb-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-lime-500 text-xl font-bold mb-2">Direct Inquiry</h3>
                            <h2 className="text-3xl font-bold mb-4">Meet our professional consultant for free!</h2>
                            <p className="text-gray-400 mb-6">
                                You can ask any questions related to property with our professional
                            </p>
                            <button className="px-6 py-3 bg-lime-600 hover:bg-lime-700 rounded-lg font-medium transition-colors">
                                Contact now
                            </button>
                        </div>
                        <div className="bg-neutral-800 rounded-lg h-64 flex items-center justify-center">
                            <span className="text-gray-400">Consultant Image</span>
                        </div>
                    </div>
                </div>

                {/* Best Choice Section */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        <span className="text-lime-500">Best</span> choice for you
                    </h2>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === "All"
                                        ? "bg-lime-600 text-gray-900"
                                        : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Property Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Property Image Placeholder */}
                            <div className="h-48 bg-neutral-800 flex items-center justify-center relative">
                                <span className="text-gray-400">Property Image</span>
                                <span className="absolute top-4 right-4 bg-lime-600 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                                    {property.tag}
                                </span>
                            </div>

                            {/* Property Details */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                                <div className="flex justify-between text-gray-400 text-sm mb-4">
                                    <span>{property.location}</span>
                                    <span>{property.year}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                                    <span>{property.size}</span>
                                </div>
                                <p className="text-gray-400 mb-6 line-clamp-3">{property.description}</p>
                                <button className="w-full py-3 border border-lime-500 text-lime-500 hover:bg-lime-500 hover:text-gray-900 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                                    See More
                                    <span>→</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}