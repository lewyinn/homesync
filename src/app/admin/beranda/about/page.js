"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaChevronCircleLeft } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function PageHomeAbout() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        subtitle: "",
        badges: [{ icon: "", title: "", value: ""}],
    });

    // Load data
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/admin/home/about", { cache: "no-store" });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to fetch about");
                setForm({
                    title: data.title ?? "",
                    subtitle: data.subtitle ?? "",
                    badges: Array.isArray(data.badges) && data.badges.length ? data.badges : [{ title: "" }]
                });
            } catch (e) {
                MySwal.fire("Error!", "Failed to load about data.", "error");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/admin/home/about", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to save");

            MySwal.fire("Success!", "About updated successfully!", "success").then(() => router.refresh());
        } catch (error) {
            MySwal.fire("Error!", error.message, "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading about data...</div>;

    return (
        <main className="p-6">
            <div className="flex justify-between items-start gap-4 mb-2">
                <h1 className="text-2xl font-bold mb-6">Edit Home About</h1>
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

                    {/* Badges */}
                    <div className="md:col-span-2">
                        <h2 className="font-semibold mb-2">Badges</h2>
                        {form.badges.map((f, idx) => (
                            <div key={idx} className="flex justify-start gap-4 space-y-3">
                                <span>
                                    <p>Title Badges</p>
                                    <input type="text" placeholder="Subtitle" value={f.title}
                                        onChange={(e) => handleArrayChange("badges", idx, "title", e.target.value)}
                                        className="px-3 py-2 border rounded-lg" />
                                </span>
                                <span>
                                    <p>Value Badges</p>
                                    <input type="text" placeholder="Icon" value={f.value}
                                        onChange={(e) => handleArrayChange("badges", idx, "value", e.target.value)}
                                        className="px-3 py-2 border rounded-lg" />
                                </span>
                            </div>
                        ))}
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
