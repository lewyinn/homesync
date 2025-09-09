"use client";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export default function PageAboutWhatWeDo() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ title: "", badges: [{ title: "" }], note: "" });

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const r = await fetch("/api/admin/about/what-we-do", { cache: "no-store" });
                const d = await r.json();
                if (!r.ok) throw new Error(d.error || "Failed to fetch data");
                setForm({
                    title: d.title ?? "",
                    badges: Array.isArray(d.badges) && d.badges.length ? d.badges : [{ title: "" }],
                    note: d.note ?? "",
                });
            } catch {
                MySwal.fire("Error", "Failed to load data.", "error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    const handleBadge = (i, v) =>
        setForm((p) => {
            const arr = [...p.badges]; arr[i] = { title: v }; return { ...p, badges: arr };
        });
    const add = () => setForm((p) => ({ ...p, badges: [...p.badges, { title: "" }] }));
    const remove = (i) =>
        setForm((p) => {
            const arr = p.badges.filter((_, idx) => idx !== i);
            return { ...p, badges: arr.length ? arr : [{ title: "" }] };
        });

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const r = await fetch("/api/admin/about/what-we-do", {
                method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
            });
            const d = await r.json();
            if (!r.ok) throw new Error(d.error || "Failed to save");
            MySwal.fire("Success", "What We Do updated!", "success");
        } catch (err) {
            MySwal.fire("Error", err.message, "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading…</div>;

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit What We Do</h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:p-8">
                <form onSubmit={submit} className="grid grid-cols-1 gap-6">
                    <input className="w-full px-4 py-2 border rounded-lg" name="title" value={form.title} onChange={handleChange} placeholder="Title" />
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="font-semibold">Badges</h2>
                            <button type="button" onClick={add} className="text-blue-600">+ Add</button>
                        </div>
                        {form.badges.map((b, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <input className="w-full px-3 py-2 border rounded" value={b.title}
                                    onChange={(e) => handleBadge(i, e.target.value)} placeholder="Badge" />
                                <button type="button" onClick={() => remove(i)} className="px-3 rounded bg-red-500 text-white">-</button>
                            </div>
                        ))}
                    </div>
                    <input className="w-full px-4 py-2 border rounded-lg" name="note" value={form.note} onChange={handleChange} placeholder="Note" />
                    <div className="flex justify-end">
                        <button disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded flex items-center gap-2">
                            {saving ? "Saving..." : "Save Changes"} <FaCheckCircle />
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
