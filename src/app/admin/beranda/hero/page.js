"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaChevronCircleLeft } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function PageHomeHero() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [form, setForm] = useState({
        title: "",
        subtitle: "",
        tagline: "",
        backgroundUrl: "",
        badges: "",
        features: [{ title: "" }]
    });

    // Load data
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/admin/home/hero", { cache: "no-store" });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to fetch hero");
                setForm({
                    title: data.title ?? "",
                    subtitle: data.subtitle ?? "",
                    tagline: data.tagline ?? "",
                    backgroundUrl: data.backgroundUrl ?? "",
                    badges: data.badges ?? "",
                    features: Array.isArray(data.features) && data.features.length ? data.features : [{ title: "" }]
                });
                setImagePreview(data.backgroundUrl || null);
            } catch (e) {
                MySwal.fire("Error!", "Failed to load hero data.", "error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (field, idx, key, value) => {
        setForm((prev) => {
            const arr = [...prev[field]];
            arr[idx] = { ...arr[idx], [key]: value };
            return { ...prev, [field]: arr };
        });
    };

    const addItem = (field, empty) => {
        setForm((prev) => ({ ...prev, [field]: [...prev[field], empty] }));
    };

    const removeItem = (field, idx, empty) => {
        setForm((prev) => {
            const arr = prev[field].filter((_, i) => i !== idx);
            return { ...prev, [field]: arr.length ? arr : [empty] };
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);
        try {
            const res = await fetch("/api/admin/home/hero/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Upload failed");

            setForm((prev) => ({ ...prev, backgroundUrl: data.url }));
            setImagePreview(URL.createObjectURL(file));
            MySwal.fire("Success!", "Background uploaded.", "success");
        } catch (err) {
            MySwal.fire("Error!", "Upload failed.", "error");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/admin/home/hero", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to save");

            MySwal.fire("Success!", "Hero updated successfully!", "success").then(() => router.refresh());
        } catch (error) {
            MySwal.fire("Error!", error.message, "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading hero data...</div>;

    return (
        <main className="p-6">
            <div className="flex justify-between items-start gap-4 mb-2">
                <h1 className="text-2xl font-bold mb-6">Edit Home Hero</h1>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input type="text" name="title" value={form.title} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg" />
                    </div>

                    {/* Subtitle */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Subtitle</label>
                        <input type="text" name="subtitle" value={form.subtitle} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg" />
                    </div>

                    {/* Tagline */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Tagline</label>
                        <textarea name="tagline" rows="3" value={form.tagline} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"></textarea>
                    </div>

                    {/* Background */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Background Image</label>
                        <div className="mt-1 flex flex-col items-center border-2 border-dashed rounded-md p-6">
                            {imagePreview ? (
                                <img src={imagePreview} className="w-32 h-32 object-cover mb-3 rounded" />
                            ) : (
                                <FiUploadCloud className="w-12 h-12 text-gray-400 mb-3" />
                            )}
                            <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="md:col-span-2">
                        <h2 className="font-semibold mb-2">Badges</h2>
                        <input type="text" name="badges" value={form.badges} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg" />
                    </div>

                    {/* Features */}
                    <div className="md:col-span-2">
                        <h2 className="font-semibold mb-2">Features</h2>
                        {form.features.map((f, idx) => (
                            <div key={idx} className="grid grid-cols-3 gap-2 mb-2">
                                <input type="text" placeholder="Title" value={f.title}
                                    onChange={(e) => handleArrayChange("features", idx, "title", e.target.value)}
                                    className="px-3 py-2 border rounded-lg" />
                                <button type="button" onClick={() => removeItem("features", idx, { title: "" })}
                                    className="px-3 py-2 bg-red-500 text-white rounded">-</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addItem("features", { title: "" })}
                            className="px-4 py-2 bg-green-500 text-white rounded">+ Add Quote</button>
                    </div>

                    <div className="md:col-span-2 flex justify-end">
                        <button type="submit" disabled={saving || uploading}
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
