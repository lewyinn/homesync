"use client";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export default function PageAboutVisiMisi() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        visi: [{ title: "", desc: "" }],
        misi: [{ title: "", badges: [{ title: "" }] }],
    });

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const r = await fetch("/api/admin/about/visi-misi", { cache: "no-store" });
                const d = await r.json();
                if (!r.ok) throw new Error(d.error || "Failed to fetch visi-misi");
                setForm({
                    visi: Array.isArray(d.visi) && d.visi.length ? d.visi : [{ title: "", desc: "" }],
                    misi: Array.isArray(d.misi) && d.misi.length ? d.misi : [{ title: "", badges: [{ title: "" }] }],
                });
            } catch {
                MySwal.fire("Error", "Failed to load visi-misi data.", "error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleVisi = (i, k, v) =>
        setForm((p) => {
            const arr = [...p.visi]; arr[i] = { ...arr[i], [k]: v }; return { ...p, visi: arr };
        });
    const handleMisi = (i, k, v) =>
        setForm((p) => {
            const arr = [...p.misi]; arr[i] = { ...arr[i], [k]: v }; return { ...p, misi: arr };
        });
    const handleBadge = (mi, bi, v) =>
        setForm((p) => {
            const m = [...p.misi]; const bs = [...m[mi].badges]; bs[bi] = { title: v }; m[mi].badges = bs; return { ...p, misi: m };
        });

    const addVisi = () => setForm((p) => ({ ...p, visi: [...p.visi, { title: "", desc: "" }] }));
    const addMisi = () => setForm((p) => ({ ...p, misi: [...p.misi, { title: "", badges: [{ title: "" }] }] }));
    const addBadge = (mi) => setForm((p) => { const m = [...p.misi]; m[mi].badges.push({ title: "" }); return { ...p, misi: m }; });

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const r = await fetch("/api/admin/about/visi-misi", {
                method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
            });
            const d = await r.json();
            if (!r.ok) throw new Error(d.error || "Failed to save");
            MySwal.fire("Success", "Visi & Misi updated!", "success");
        } catch (err) {
            MySwal.fire("Error", err.message, "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading…</div>;

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Visi & Misi</h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:p-8">
                <form onSubmit={submit} className="grid grid-cols-1 gap-6">
                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold">Visi</h2>
                            <button type="button" onClick={addVisi} className="text-blue-600">+ Add</button>
                        </div>
                        {form.visi.map((v, i) => (
                            <div key={i} className="grid md:grid-cols-2 gap-2 mb-2">
                                <input className="px-3 py-2 border rounded" placeholder="Title" value={v.title}
                                    onChange={(e) => handleVisi(i, "title", e.target.value)} />
                                <input className="px-3 py-2 border rounded" placeholder="Description" value={v.desc}
                                    onChange={(e) => handleVisi(i, "desc", e.target.value)} />
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold">Misi</h2>
                            <button type="button" onClick={addMisi} className="text-blue-600">+ Add</button>
                        </div>
                        {form.misi.map((m, mi) => (
                            <div key={mi} className="border rounded p-4 mb-3">
                                <input className="w-full px-3 py-2 border rounded mb-2" placeholder="Title"
                                    value={m.title} onChange={(e) => handleMisi(mi, "title", e.target.value)} />
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-sm font-medium">Badges / Points</h3>
                                    <button type="button" onClick={() => addBadge(mi)} className="text-blue-600">+ Add</button>
                                </div>
                                {m.badges.map((b, bi) => (
                                    <div key={bi} className="mb-2">
                                        <input className="w-full px-3 py-2 border rounded" placeholder="Point"
                                            value={b.title} onChange={(e) => handleBadge(mi, bi, e.target.value)} />
                                    </div>
                                ))}
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
