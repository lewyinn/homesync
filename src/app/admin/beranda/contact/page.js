"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaChevronCircleLeft } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function PageHomeContact() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        desc: "",
        telephone: [{ title: "", no: "", schedule: ""}],
        email: [{ title: "", email: "", info: ""}],
        sosmed: [{ title: "", instagram: "", facebook: "", linkedin: ""}],
        location: [{ title: "", address: "", info: ""}]
    });

    // Load data
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/admin/home/contact", { cache: "no-store" });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to fetch contact");
                setForm({
                    title: data.title ?? "",
                    desc: data.desc ?? "",
                    telephone: Array.isArray(data.telephone) && data.telephone.length ? data.telephone : [{ title: "" }],
                    email: Array.isArray(data.email) && data.email.length ? data.email : [{ title: "" }],
                    sosmed: Array.isArray(data.sosmed) && data.sosmed.length ? data.sosmed : [{ title: "" }],
                    location: Array.isArray(data.location) && data.location.length ? data.location : [{ title: "" }]
                });
            } catch (e) {
                MySwal.fire("Error!", "Failed to load contact data.", "error");
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
            const res = await fetch("/api/admin/home/contact", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to save");

            MySwal.fire("Success!", "Contact updated successfully!", "success").then(() => router.refresh());
        } catch (error) {
            MySwal.fire("Error!", error.message, "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading contact data...</div>;

    return (
        <main className="p-6">
            <div className="flex justify-between items-start gap-4 mb-2">
                <h1 className="text-2xl font-bold mb-6">Edit Home Contact</h1>
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
                        <input type="text" name="desc" value={form.desc} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg" />
                    </div>

                    {/* Telephone */}
                    <div className="md:col-span-2">
                        <h2 className="font-semibold mb-2">Telephone</h2>
                        {form.telephone.map((f, idx) => (
                            <div key={idx} className="grid grid-cols-3 gap-2 mb-2">
                                <span className="grid">
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" placeholder="Title" value={f.title}
                                        onChange={(e) => handleArrayChange("telephone", idx, "title", e.target.value)}
                                        className="px-3 py-2 border rounded-lg" />
                                </span>
                                <span className="grid">
                                    <label className="block text-sm font-medium mb-1">No</label>
                                    <input type="text" placeholder="No" value={f.no}
                                        onChange={(e) => handleArrayChange("telephone", idx, "no", e.target.value)}
                                        className="px-3 py-2 border rounded-lg" />
                                </span>
                                <span className="grid">
                                    <label className="block text-sm font-medium mb-1">Schedule</label>
                                    <input type="text" placeholder="Icon" value={f.schedule}
                                        onChange={(e) => handleArrayChange("telephone", idx, "schedule", e.target.value)}
                                        className="px-3 py-2 border rounded-lg" />
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2">
                        <h2 className="font-semibold mb-2">Email</h2>
                        {form.email.map((f, idx) => (
                            <div key={idx} className="grid grid-cols-3 gap-2 mb-2">
                                <span className="grid">
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" placeholder="Title" value={f.title}
                                        onChange={(e) => handleArrayChange("email", idx, "title", e.target.value)}
                                        className="px-3 py-2 border rounded-lg" />
                                </span>
                                <span className="grid">
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input type="text" placeholder="Email" value={f.email}
                                        onChange={(e) => handleArrayChange("email", idx, "email", e.target.value)}
                                        className="px-3 py-2 border rounded-lg" />
                                </span>
                                <span className="grid">
                                    <label className="block text-sm font-medium mb-1">notes</label>
                                    <input type="text" placeholder="Notes" value={f.info}
                                        onChange={(e) => handleArrayChange("email", idx, "info", e.target.value)}
                                        className="px-3 py-2 border rounded-lg" />
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Sosmed */}
                    <div className="md:col-span-2">
                        <h2 className="font-semibold mb-2">Sosmed</h2>
                        {form.sosmed.map((f, idx) => (
                            <div key={idx} className="grid grid-cols-3 gap-2 mb-2">
                                <span className="grid">
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" placeholder="Title" value={f.title}
                                        onChange={(e) => handleArrayChange("sosmed", idx, "title", e.target.value)}
                                        className="px-3 py-2 border rounded-lg" />
                                </span>
                                <span className="grid"> 
                                    <label className="block text-sm font-medium mb-1">Instagram</label>
                                    <input type="text" placeholder="Instagram" value={f.instagram}
                                        onChange={(e) => handleArrayChange("sosmed", idx, "instagram", e.target.value)}
                                        className="px-3 py-2 border rounded-lg" />
                                </span>
                                <span className="grid">
                                    <label className="block text-sm font-medium mb-1">Facebook</label>
                                    <input type="text" placeholder="Facebook" value={f.facebook}
                                        onChange={(e) => handleArrayChange("sosmed", idx, "facebook", e.target.value)}
                                        className="px-3 py-2 border rounded-lg" />
                                </span>
                                <span className="grid">
                                    <label className="block text-sm font-medium mb-1">Linkedin</label>
                                    <input type="text" placeholder="Linkedin" value={f.linkedin}
                                        onChange={(e) => handleArrayChange("sosmed", idx, "linkedin", e.target.value)}
                                        className="px-3 py-2 border rounded-lg" />
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Location */}
                    <div className="md:col-span-2">
                        <h2 className="font-semibold mb-2">Location</h2>
                        {form.location.map((f, idx) => (
                            <div key={idx} className="grid grid-cols-3 gap-2 mb-2">
                                <span className="grid">
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" placeholder="Title" value={f.title}
                                        onChange={(e) => handleArrayChange("location", idx, "title", e.target.value)}
                                        className="px-3 py-2 border rounded-lg" />
                                </span>
                                <span className="grid">
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <input type="text" placeholder="Address" value={f.address}
                                        onChange={(e) => handleArrayChange("location", idx, "address", e.target.value)}
                                        className="px-3 py-2 border rounded-lg" />
                                </span>
                                <span className="grid">
                                    <label className="block text-sm font-medium mb-1">Info</label>
                                    <input type="text" placeholder="Info" value={f.info}
                                        onChange={(e) => handleArrayChange("location", idx, "info", e.target.value)}
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
