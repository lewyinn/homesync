"use client";

import Link from "next/link";
import React, { useState, useMemo, useEffect } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp, FaEdit, FaPlusSquare, FaSearch } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

async function jsonSafe(res) {
    const text = await res.text();
    try { return JSON.parse(text); } catch { return { error: text || res.statusText }; }
}

function DeleteButton({ id, onDeleted }) {
    const [loading, setLoading] = useState(false);

    async function onDelete() {
        const result = await MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                setLoading(true);
                const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
                const data = await jsonSafe(res);
                if (!res.ok) throw new Error(data?.error || "Delete failed");
                MySwal.fire("Deleted!", "Your post has been deleted.", "success");
                onDeleted?.(id);
            } catch (e) {
                console.error(e);
                MySwal.fire("Error!", e.message || "Failed to delete post.", "error");
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <button onClick={onDelete} disabled={loading} className="text-red-600 hover:text-red-700 p-1 disabled:opacity-60" title="Delete">
            <FiTrash2 className="w-4 h-4" />
        </button>
    );
}

export default function PostsPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/admin/posts", { cache: "no-store" });
                const data = await jsonSafe(res);
                if (!res.ok) throw new Error(data?.error || "Failed to fetch posts");
                setItems(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error(e);
                MySwal.fire("Error!", e.message || "Failed to load posts", "error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleSort = (field) => {
        if (sortField === field) setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        else { setSortField(field); setSortDirection("asc"); }
    };

    const filteredData = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return items.filter((item) =>
            item.title?.toLowerCase().includes(term) ||
            item.tag?.toLowerCase().includes(term) ||
            item.excerpt?.toLowerCase().includes(term) ||
            item.date?.toLowerCase().includes(term) ||
            item.slug?.toLowerCase().includes(term)
        );
    }, [items, searchTerm]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            const av = a?.[sortField] ?? "";
            const bv = b?.[sortField] ?? "";
            if (typeof av === "string" || typeof bv === "string") {
                return sortDirection === "asc"
                    ? String(av).localeCompare(String(bv))
                    : String(bv).localeCompare(String(av));
            }
            return sortDirection === "asc" ? av - bv : bv - av;
        });
    }, [filteredData, sortField, sortDirection]);

    const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
    const current = Math.min(currentPage, totalPages);
    const startIndex = (current - 1) * itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    const sortIcon = (field) =>
        sortField === field
            ? (sortDirection === "asc" ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />)
            : null;

    const handleDeleted = (deletedId) => {
        setItems((prev) => {
            const next = prev.filter((x) => x.id !== deletedId);
            const nextTotalPages = Math.max(1, Math.ceil(next.length / itemsPerPage));
            if (currentPage > nextTotalPages) setCurrentPage(nextTotalPages);
            return next;
        });
    };

    return (
        <main className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row sm:justify-between mb-6">
                <div className="flex flex-row md:flex-col-reverse justify-between items-start w-full sm:w-auto gap-0 md:gap-2 mb-4 md:mb-0">
                    <div className="flex flex-col gap-0 md:gap-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">Posts Management</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your blog posts</p>
                    </div>
                    <Link href="/admin/blogs/new" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <FaPlusSquare className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Add Post</span>
                    </Link>
                </div>

                <button onClick={() => setShowMobileSearch(!showMobileSearch)} className="sm:hidden flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                    <FaSearch className="w-4 h-4" />
                    <span>Search Feature</span>
                </button>
            </div>

            <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 transition-colors ${showMobileSearch ? "block" : "hidden sm:block"}`}>
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-colors">
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cover</th>
                                <th onClick={() => handleSort("title")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <div className="flex items-center space-x-1"><span>Title</span>{sortIcon("title")}</div>
                                </th>
                                <th onClick={() => handleSort("tag")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <div className="flex items-center space-x-1"><span>Tag</span>{sortIcon("tag")}</div>
                                </th>
                                <th onClick={() => handleSort("date")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <div className="flex items-center space-x-1"><span>Date</span>{sortIcon("date")}</div>
                                </th>
                                <th onClick={() => handleSort("read")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <div className="flex items-center space-x-1"><span>Read</span>{sortIcon("read")}</div>
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {loading ? (
                                <tr><td className="px-6 py-6 text-sm text-gray-500 dark:text-gray-400" colSpan={6}>Loading...</td></tr>
                            ) : paginatedData.length === 0 ? (
                                <tr><td className="px-6 py-6 text-sm text-gray-500 dark:text-gray-400" colSpan={6}>No data</td></tr>
                            ) : paginatedData.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4">{p.cover ? <img src={p.cover} alt="" className="w-16 h-12 object-cover rounded border" /> : <span className="text-xs text-gray-400">—</span>}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{p.title}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{p.slug}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{p.tag}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{p.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{p.read}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center space-x-2 justify-end">
                                            <Link href={`/admin/blogs/${p.id}/edit`} className="text-green-600 hover:text-green-700 p-1" title="Edit">
                                                <FaEdit className="w-4 h-4" />
                                            </Link>
                                            <DeleteButton id={p.id} onDeleted={handleDeleted} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile list sederhana */}
                <div className="lg:hidden">
                    {loading ? (
                        <div className="p-4 text-sm text-gray-500 dark:text-gray-400">Loading...</div>
                    ) : paginatedData.length === 0 ? (
                        <div className="p-4 text-sm text-gray-500 dark:text-gray-400">No data</div>
                    ) : paginatedData.map((p) => (
                        <div key={p.id} className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                            <div className="flex gap-3 mb-2">
                                {p.cover ? (
                                    <img src={p.cover} alt="" className="w-16 h-16 rounded object-cover border" />
                                ) : (
                                    <div className="w-16 h-16 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-400">No Img</div>
                                )}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{p.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{p.slug}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tag</p>
                                    <p className="text-sm text-gray-900 dark:text-white">{p.tag || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Date</p>
                                    <p className="text-sm text-gray-900 dark:text-white">{p.date || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Read</p>
                                    <p className="text-sm text-gray-900 dark:text-white">{p.read || "-"}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Link href={`/admin/blogs/${p.id}/edit`} className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm">
                                    <FaEdit className="w-4 h-4" />
                                    <span>Edit</span>
                                </Link>
                                <button
                                    onClick={async () => {
                                        const result = await MySwal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#d33",
                                            cancelButtonColor: "#6c757d",
                                            confirmButtonText: "Yes, delete it!",
                                        });
                                        if (result.isConfirmed) {
                                            const res = await fetch(`/api/admin/blogs/${p.id}`, { method: "DELETE" });
                                            if (res.ok) {
                                                MySwal.fire("Deleted!", "Your post has been deleted.", "success");
                                                handleDeleted(p.id);
                                            } else {
                                                MySwal.fire("Error!", "Failed to delete post.", "error");
                                            }
                                        }
                                    }}
                                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="px-4 sm:px-6 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            Showing {sortedData.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={current <= 1}
                                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaChevronLeft className="w-4 h-4" />
                            </button>

                            <div className="flex items-center space-x-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-1 text-sm rounded-md ${current === page
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={current >= totalPages}
                                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
