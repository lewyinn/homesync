"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaChevronCircleLeft } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function PageHomeHeadBlogs() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        title: "",
        desc: "",
    });

    // Load data
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/admin/home/head-blogs", { cache: "no-store" });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to fetch head-blogs");
                setForm({
                    title: data.title ?? "",
                    desc: data.desc ?? "",
                });
            } catch (e) {
                MySwal.fire("Error!", "Failed to load head-blogs data.", "error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/admin/home/head-blogs", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to save");

            MySwal.fire("Success!", "head-blogs updated successfully!", "success").then(() => router.refresh());
        } catch (error) {
            MySwal.fire("Error!", error.message, "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading head-blogs data...</div>;

    return (
        <main className="p-6">
            <div className="flex justify-between items-start gap-4 mb-2">
                <h1 className="text-2xl font-bold mb-6">Edit Home Head Blogs</h1>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input type="text" name="title" value={form.title} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg" />
                    </div>

                    {/* Desc */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Desc</label>
                        <input type="text" name="desc" value={form.desc} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg" />
                    </div>

                    <div className="md:col-span-2 flex justify-end">
                        <button type="submit" disabled={saving}
                            className="px-6 py-2 bg-blue-600 text-white rounded flex items-center gap-2">
                            {saving ? "Saving..." : "Save Changes"}
                            <FaCheckCircle />
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
