"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function PageAboutVisiMisi() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        visi: [{ title: "", desc: "" }],
        misi: [{ title: "", badges: [{ title: "" }] }]
    });

    // Load data
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/admin/about/visi-misi", { cache: "no-store" });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to fetch visi-misi");
                setForm({
                    visi: Array.isArray(data.visi) && data.visi.length ? data.visi : [{ title: "", desc: "" }],
                    misi: Array.isArray(data.misi) && data.misi.length ? data.misi : [{ title: "", badges: [{ title: "" }] }]
                });
            } catch (e) {
                MySwal.fire("Error!", "Failed to load visi-misi data.", "error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Visi
    const handleVisiChange = (idx, key, value) => {
        setForm((prev) => {
            const arr = [...prev.visi];
            arr[idx] = { ...arr[idx], [key]: value };
            return { ...prev, visi: arr };
        });
    };

    // Misi
    const handleMisiChange = (idx, key, value) => {
        setForm((prev) => {
            const arr = [...prev.misi];
            arr[idx] = { ...arr[idx], [key]: value };
            return { ...prev, misi: arr };
        });
    };

    // Badges in Misi
    const handleBadgeChange = (misiIdx, badgeIdx, value) => {
        setForm((prev) => {
            const misiArr = [...prev.misi];
            const badgesArr = [...misiArr[misiIdx].badges];
            badgesArr[badgeIdx] = { title: value };
            misiArr[misiIdx].badges = badgesArr;
            return { ...prev, misi: misiArr };
        });
    };

    const addBadge = (misiIdx) => {
        setForm((prev) => {
            const misiArr = [...prev.misi];
            misiArr[misiIdx].badges.push({ title: "" });
            return { ...prev, misi: misiArr };
        });
    };

    const removeBadge = (misiIdx, badgeIdx) => {
        setForm((prev) => {
            const misiArr = [...prev.misi];
            const badgesArr = misiArr[misiIdx].badges.filter((_, i) => i !== badgeIdx);
            misiArr[misiIdx].badges = badgesArr.length ? badgesArr : [{ title: "" }];
            return { ...prev, misi: misiArr };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/admin/about/visi-misi", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to save");

            MySwal.fire("Success!", "Visi Misi updated successfully!", "success").then(() => router.refresh());
        } catch (error) {
            MySwal.fire("Error!", error.message, "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading visi misi data...</div>;

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Visi & Misi</h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                    {/* Visi */}
                    <div>
                        <h2 className="font-semibold mb-2">Visi</h2>
                        {form.visi.map((v, idx) => (
                            <div key={idx} className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Judul Visi"
                                    value={v.title}
                                    onChange={e => handleVisiChange(idx, "title", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg mb-2"
                                />
                                <textarea
                                    placeholder="Deskripsi Visi"
                                    value={v.desc}
                                    onChange={e => handleVisiChange(idx, "desc", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Misi */}
                    <div>
                        <h2 className="font-semibold mb-2">Misi</h2>
                        {form.misi.map((m, misiIdx) => (
                            <div key={misiIdx} className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Judul Misi"
                                    value={m.title}
                                    onChange={e => handleMisiChange(misiIdx, "title", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg mb-2"
                                />
                                <div>
                                    <h3 className="text-sm font-medium mb-1">Isi Misi</h3>
                                    {m.badges.map((b, badgeIdx) => (
                                        <div key={badgeIdx} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                placeholder="Isi badge"
                                                value={b.title}
                                                onChange={e => handleBadgeChange(misiIdx, badgeIdx, e.target.value)}
                                                className="px-3 py-2 border rounded-lg w-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
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