"use client";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export default function PageAboutValues() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ title: "", desc: "", value: [{ title: "", desc: "" }] });

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const r = await fetch("/api/admin/about/values", { cache: "no-store" });
                const d = await r.json();
                if (!r.ok) throw new Error(d.error || "Failed to fetch values");
                setForm({
                    title: d.title ?? "",
                    desc: d.desc ?? "",
                    value: Array.isArray(d.value) && d.value.length ? d.value : [{ title: "", desc: "" }],
                });
            } catch {
                MySwal.fire("Error", "Failed to load values data.", "error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    const handleArrayChange = (i, k, v) =>
        setForm((p) => {
            const arr = [...p.value];
            arr[i] = { ...arr[i], [k]: v };
            return { ...p, value: arr };
        });
    const add = () => setForm((p) => ({ ...p, value: [...p.value, { title: "", desc: "" }] }));
    const remove = (i) =>
        setForm((p) => {
            const arr = p.value.filter((_, idx) => idx !== i);
            return { ...p, value: arr.length ? arr : [{ title: "", desc: "" }] };
        });

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const r = await fetch("/api/admin/about/values", {
                method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
            });
            const d = await r.json();
            if (!r.ok) throw new Error(d.error || "Failed to save");
            MySwal.fire("Success", "Values updated!", "success");
        } catch (err) {
            MySwal.fire("Error", err.message, "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading…</div>;

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Our Values</h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:p-8">
                <form onSubmit={submit} className="grid grid-cols-1 gap-6">
                    <input className="w-full px-4 py-2 border rounded-lg" name="title" value={form.title} onChange={handleChange} placeholder="Title" />
                    <input className="w-full px-4 py-2 border rounded-lg" name="desc" value={form.desc} onChange={handleChange} placeholder="Description" />
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="font-semibold">Values</h2>
                            <button type="button" onClick={add} className="text-blue-600">+ Add</button>
                        </div>
                        {form.value.map((v, i) => (
                            <div key={i} className="grid md:grid-cols-2 gap-2 mb-2">
                                <input className="px-3 py-2 border rounded-lg" placeholder="Title"
                                    value={v.title} onChange={(e) => handleArrayChange(i, "title", e.target.value)} />
                                <input className="px-3 py-2 border rounded-lg" placeholder="Description"
                                    value={v.desc} onChange={(e) => handleArrayChange(i, "desc", e.target.value)} />
                                <div className="md:col-span-2 text-right">
                                    <button type="button" onClick={() => remove(i)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
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
