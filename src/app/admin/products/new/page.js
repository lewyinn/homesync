"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaChevronCircleLeft } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// helper kecil: hanya untuk preview di UI (server tetap sumber kebenaran)
const toSlug = (s) =>
    (s || "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export default function CreateProductPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        slug: "", // hanya untuk preview UI
        location: "",
        year: "",
        size: "",
        desc: "",
        badge: "",
        type: "",
        cover: "",
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);
        try {
            const res = await fetch("/api/admin/products/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Upload failed");

            setForm((prev) => ({ ...prev, cover: data.url }));
            setImagePreview(URL.createObjectURL(file));
            MySwal.fire("Success!", "Image uploaded successfully.", "success");
        } catch (error) {
            console.error(error);
            MySwal.fire("Error!", "Failed to upload image.", "error");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // server yang bikin slug; kita tidak kirim slug dari client
        const { slug: _omit, ...payload } = form;

        try {
            const res = await fetch("/api/admin/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to create product");

            MySwal.fire({
                title: "Success!",
                text: "Product added successfully!",
                icon: "success",
            }).then(() => {
                router.push("/admin/products");
            });
        } catch (error) {
            console.error(error);
            MySwal.fire("Error!", `Failed to add product: ${error.message}`, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="p-6">
            <div className="flex justify-between items-start gap-4 mb-2">
                <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
                <Link
                    href="/admin/products"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <FaChevronCircleLeft className="w-5 h-5 inline mr-2" />
                    Back to List
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:p-8 transition-colors">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
                >
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Product Title"
                        />
                    </div>

                    {/* Slug (Preview only) */}
                    <div>
                        <label
                            htmlFor="slug"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                        >
                            Slug (auto)
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            value={toSlug(form.title)}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500"
                            title="Generated from title when saved"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Slug dibuat otomatis saat disimpan (unik).
                        </p>
                    </div>

                    {/* Type (Select) */}
                    <div>
                        <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                        >
                            Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Type</option>
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Premium">Premium</option>
                        </select>
                    </div>

                    {/* Badge */}
                    <div>
                        <label
                            htmlFor="badge"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                        >
                            Badge
                        </label>
                        <input
                            type="text"
                            id="badge"
                            name="badge"
                            value={form.badge}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., New View, Featured"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                        >
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Woodland, Stivens 1013"
                        />
                    </div>

                    {/* Year */}
                    <div>
                        <label
                            htmlFor="year"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                        >
                            Year
                        </label>
                        <input
                            type="text"
                            id="year"
                            name="year"
                            value={form.year}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 2024"
                        />
                    </div>

                    {/* Size */}
                    <div>
                        <label
                            htmlFor="size"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                        >
                            Size
                        </label>
                        <input
                            type="text"
                            id="size"
                            name="size"
                            value={form.size}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 800 m²"
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label
                            htmlFor="desc"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                        >
                            Description
                        </label>
                        <textarea
                            id="desc"
                            name="desc"
                            rows="6"
                            value={form.desc}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter product description here..."
                        ></textarea>
                    </div>

                    {/* Cover Picture */}
                    <div className="md:col-span-2">
                        <label
                            htmlFor="cover"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                        >
                            Cover Image
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mx-auto w-32 h-32 object-cover rounded"
                                    />
                                ) : (
                                    <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                )}
                                <div className="flex text-sm text-gray-600 dark:text-gray-300">
                                    <label
                                        htmlFor="cover-upload"
                                        className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                    >
                                        <span>{uploading ? "Uploading..." : "Unggah file"}</span>
                                        <input
                                            id="cover-upload"
                                            name="cover"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            disabled={uploading}
                                            className="sr-only"
                                        />
                                    </label>
                                    <p className="pl-1">atau tarik dan lepas</p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    PNG, JPG, GIF hingga 10MB
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2 flex justify-end mt-4">
                        <button
                            type="submit"
                            disabled={loading || uploading}
                            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating..." : "Create Product"}
                            <FaCheckCircle className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
