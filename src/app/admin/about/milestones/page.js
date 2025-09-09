"use client";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export default function PageAboutMilestone() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ timeline: [{ title: "", year: "", desc: "" }] });

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const r = await fetch("/api/admin/about/milestone", { cache: "no-store" });
                const d = await r.json();
                if (!r.ok) throw new Error(d.error || "Failed to fetch milestone");
                setForm({
                    timeline: Array.isArray(d.timeline) && d.timeline.length ? d.timeline : [{ title: "", year: "", desc: "" }],
                });
            } catch {
                MySwal.fire("Error", "Failed to load milestone data.", "error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleChange = (i, k, v) =>
        setForm((p) => {
            const arr = [...p.timeline];
            arr[i] = { ...arr[i], [k]: v };
            return { ...p, timeline: arr };
        });

    const add = () => setForm((p) => ({ ...p, timeline: [...p.timeline, { title: "", year: "", desc: "" }] }));
    const remove = (i) =>
        setForm((p) => {
            const arr = p.timeline.filter((_, idx) => idx !== i);
            return { ...p, timeline: arr.length ? arr : [{ title: "", year: "", desc: "" }] };
        });

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const r = await fetch("/api/admin/about/milestone", {
                method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
            });
            const d = await r.json();
            if (!r.ok) throw new Error(d.error || "Failed to save");
            MySwal.fire("Success", "Milestone updated!", "success");
        } catch (err) {
            MySwal.fire("Error", err.message, "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading…</div>;

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Milestone</h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:p-8">
                <form onSubmit={submit} className="grid grid-cols-1 gap-6">
                    {form.timeline.map((t, i) => (
                        <div key={i} className="border p-4 rounded-lg">
                            <input className="w-full mb-2 px-3 py-2 border rounded" placeholder="Title"
                                value={t.title} onChange={(e) => handleChange(i, "title", e.target.value)} />
                            <input className="w-full mb-2 px-3 py-2 border rounded" placeholder="Year"
                                value={t.year} onChange={(e) => handleChange(i, "year", e.target.value)} />
                            <textarea className="w-full px-3 py-2 border rounded" placeholder="Description"
                                value={t.desc} onChange={(e) => handleChange(i, "desc", e.target.value)} />
                            <div className="mt-2 text-right">
                                <button type="button" onClick={() => remove(i)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-between">
                        <button type="button" onClick={add} className="px-4 py-2 bg-gray-100 rounded">+ Add Timeline</button>
                        <button disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded flex items-center gap-2">
                            {saving ? "Saving..." : "Save Changes"} <FaCheckCircle />
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
