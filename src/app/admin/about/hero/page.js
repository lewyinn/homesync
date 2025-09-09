"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export default function PageAboutHero() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        title: "",
        desc: "",
        badges: [{ title: "" }],
    });

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/admin/about/hero", { cache: "no-store" });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to fetch hero");
                setForm({
                    title: data.title ?? "",
                    desc: data.desc ?? "",
                    badges:
                        Array.isArray(data.badges) && data.badges.length
                            ? data.badges
                            : [{ title: "" }],
                });
            } catch (e) {
                MySwal.fire("Error!", "Failed to load hero data.", "error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleBadgeChange = (idx, value) => {
        setForm((p) => {
            const arr = [...p.badges];
            arr[idx] = { title: value };
            return { ...p, badges: arr };
        });
    };

    const addBadge = () =>
        setForm((p) => ({ ...p, badges: [...p.badges, { title: "" }] }));

    const removeBadge = (idx) =>
        setForm((p) => {
            const arr = p.badges.filter((_, i) => i !== idx);
            return { ...p, badges: arr.length ? arr : [{ title: "" }] };
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/admin/about/hero", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to save");
            MySwal.fire("Success!", "Hero updated successfully!", "success");
        } catch (error) {
            MySwal.fire("Error!", error.message, "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading about data...</div>;

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit About — Hero</h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Judul besar"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Subtitle / Description</label>
                        <input
                            name="desc"
                            value={form.desc}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Deskripsi singkat"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold mb-2">Badges</h2>
                            <button type="button" onClick={addBadge} className="px-3 py-2 bg-blue-100 text-blue-700 rounded flex items-center gap-2">
                                <FaPlus /> Add
                            </button>
                        </div>
                        {form.badges.map((b, idx) => (
                            <div key={idx} className="flex gap-2 mb-2">
                                <input
                                    value={b.title}
                                    onChange={(e) => handleBadgeChange(idx, e.target.value)}
                                    className="px-3 py-2 border rounded-lg w-full"
                                    placeholder="Teks badge"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeBadge(idx)}
                                    className="px-3 py-2 bg-red-100 text-red-700 rounded"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 bg-blue-600 text-white rounded flex items-center gap-2"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                            <FaCheckCircle />
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
