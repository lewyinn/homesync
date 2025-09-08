"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaChevronCircleLeft } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const TAGS = ["Guides", "News", "Tips", "Inspiration"];

const toSlug = (s) =>
    (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

async function jsonSafe(res) {
    const text = await res.text();
    try { return JSON.parse(text); } catch { return { error: text || res.statusText }; }
}

export default function CreatePostPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: "", slug: "", tag: "", date: "", read: "", excerpt: "", content: "", cover: "",
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
        const fd = new FormData();
        fd.append("file", file);

        setUploading(true);
        try {
            const res = await fetch("/api/admin/posts/upload", { method: "POST", body: fd });
            const data = await jsonSafe(res);
            if (!res.ok) throw new Error(data?.error || "Upload failed");
            setForm((prev) => ({ ...prev, cover: data.url }));
            setImagePreview(URL.createObjectURL(file));
            MySwal.fire("Success!", "Image uploaded successfully.", "success");
        } catch (e) {
            console.error(e);
            MySwal.fire("Error!", e.message || "Failed to upload image.", "error");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { slug: _omit, ...payload } = form; // slug dibuat server
        try {
            const res = await fetch("/api/admin/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await jsonSafe(res);
            if (!res.ok) throw new Error(data?.error || "Failed to create post");
            MySwal.fire({ title: "Success!", text: "Post added successfully!", icon: "success" })
                .then(() => router.push("/admin/blogs"));
        } catch (e) {
            console.error(e);
            MySwal.fire("Error!", e.message || "Failed to add post.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="p-6">
            <div className="flex justify-between items-start gap-4 mb-2">
                <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
                <Link href="/admin/blogs" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <FaChevronCircleLeft className="w-5 h-5 inline mr-2" /> Back to List
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:p-8 transition-colors">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                        <input id="title" name="title" value={form.title} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" placeholder="Post Title" />
                    </div>

                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium mb-1">Slug (auto)</label>
                        <input id="slug" name="slug" value={toSlug(form.title)} readOnly className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500" />
                    </div>

                    <div>
                        <label htmlFor="tag" className="block text-sm font-medium mb-1">Tag</label>
                        <select id="tag" name="tag" value={form.tag} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg">
                            <option value="">Select Tag</option>
                            {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
                        <input id="date" name="date" value={form.date} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g., Aug 14, 2025" />
                    </div>

                    <div>
                        <label htmlFor="read" className="block text-sm font-medium mb-1">Read</label>
                        <input id="read" name="read" value={form.read} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g., 6 min read" />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="excerpt" className="block text-sm font-medium mb-1">Excerpt</label>
                        <textarea id="excerpt" name="excerpt" rows="3" value={form.excerpt} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
                        <textarea id="content" name="content" rows="10" value={form.content} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Cover Image</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                {imagePreview ? <img src={imagePreview} alt="Preview" className="mx-auto w-32 h-32 object-cover rounded" /> : <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />}
                                <div className="flex text-sm">
                                    <label htmlFor="cover-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                                        <span>{uploading ? "Uploading..." : "Unggah file"}</span>
                                        <input id="cover-upload" type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="sr-only" />
                                    </label>
                                    <p className="pl-1">atau tarik dan lepas</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP hingga 10MB</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end mt-4">
                        <button type="submit" disabled={loading || uploading} className="inline-flex justify-center py-2 px-6 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                            {loading ? "Creating..." : "Create Post"} <FaCheckCircle className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
