"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function PageAboutMilestone() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        timeline: [
            { title: "", year: "", desc: "" }
        ]
    });

    // Load data
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/admin/about/milestone", { cache: "no-store" });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to fetch milestone");
                setForm({
                    timeline: Array.isArray(data.timeline) && data.timeline.length ? data.timeline : [{ title: "", year: "", desc: "" }]
                });
            } catch (e) {
                MySwal.fire("Error!", "Failed to load milestone data.", "error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Timeline handlers
    const handleTimelineChange = (idx, key, value) => {
        setForm((prev) => {
            const arr = [...prev.timeline];
            arr[idx] = { ...arr[idx], [key]: value };
            return { ...prev, timeline: arr };
        });
    };

    const addTimeline = () => {
        setForm((prev) => ({ ...prev, timeline: [...prev.timeline, { title: "", year: "", desc: "" }] }));
    };

    const removeTimeline = (idx) => {
        setForm((prev) => {
            const arr = prev.timeline.filter((_, i) => i !== idx);
            return { ...prev, timeline: arr.length ? arr : [{ title: "", year: "", desc: "" }] };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/admin/about/milestone", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to save");

            MySwal.fire("Success!", "Milestone updated successfully!", "success").then(() => router.refresh());
        } catch (error) {
            MySwal.fire("Error!", error.message, "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading milestone data...</div>;

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Milestone Timeline</h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                    <div>
                        <h2 className="font-semibold mb-2">Timeline</h2>
                        {form.timeline.map((item, idx) => (
                            <div key={idx} className="mb-4 border-b pb-4 flex flex-col gap-2 relative">
                                <input
                                    type="text"
                                    placeholder="Judul"
                                    value={item.title}
                                    onChange={e => handleTimelineChange(idx, "title", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Tahun"
                                    value={item.year}
                                    onChange={e => handleTimelineChange(idx, "year", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg mb-2"
                                />
                                <textarea
                                    placeholder="Deskripsi"
                                    value={item.desc}
                                    onChange={e => handleTimelineChange(idx, "desc", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                                <button type="button" onClick={() => removeTimeline(idx)} className="absolute right-0 top-0 text-red-500 p-2"><FaTrash /></button>
                            </div>
                        ))}
                        <button type="button" onClick={addTimeline} className="px-3 py-2 bg-blue-100 text-blue-700 rounded flex items-center gap-2"><FaPlus />Tambah Timeline</button>
                    </div>
                    <div className="flex justify-end">
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