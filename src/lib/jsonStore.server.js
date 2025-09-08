import { promises as fs } from "fs";
import path from "path";
import { put, list } from "@vercel/blob";

const IS_VERCEL = !!process.env.VERCEL;
// Saat pakai Blob, Vercel inject env dengan prefix (default "BLOB_*").
// Kamu sudah connect Blob (homesync-blob) → env otomatis tersedia untuk read/write.
const HAS_BLOB = !!process.env.BLOB_URL; // dibuat otomatis saat connect

// Folder data lokal (dev)
const ROOT = path.join(process.cwd(), "src", "data");

// Helper: path blob untuk sebuah koleksi (misal "products" → data/products.json)
const blobKey = (name) => `data/${name}.json`;

// ---------- DEV (Filesystem) ----------
async function readFromFS(name) {
    const file = path.join(ROOT, `${name}.json`);
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw || (name === "posts" || name === "products" ? "[]" : "{}"));
}
async function writeToFS(name, data) {
    const file = path.join(ROOT, `${name}.json`);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

// ---------- PROD (Blob) ----------
async function readFromBlob(name, fallbackShape = "array") {
    // Cari objek dengan key persis data/<name>.json
    const key = blobKey(name);
    const { blobs } = await list({ prefix: key, limit: 1 });
    const found = blobs.find((b) => b.pathname === key);
    if (!found) {
        // belum ada → kembalikan bentuk default
        return fallbackShape === "array" ? [] : {};
    }
    const res = await fetch(found.url, { cache: "no-store" });
    if (!res.ok) return fallbackShape === "array" ? [] : {};
    const text = await res.text();
    try {
        return JSON.parse(text);
    } catch {
        return fallbackShape === "array" ? [] : {};
    }
}

async function writeToBlob(name, data) {
    const key = blobKey(name);
    const body = JSON.stringify(data, null, 2);
    await put(key, body, {
        access: "public",
        addRandomSuffix: false,          // overwrite file yang sama
        contentType: "application/json", // penting biar dibaca benar
    });
}

// ---------- Public API ----------
// posts/products adalah "array store"; single docs (kalau perlu nanti) bisa "object store".
export async function readArray(name) {
    if (IS_VERCEL && HAS_BLOB) return readFromBlob(name, "array");
    try { return await readFromFS(name); } catch (e) {
        if (e.code === "ENOENT") return [];
        throw e;
    }
}

export async function writeArray(name, arr) {
    if (IS_VERCEL && HAS_BLOB) return writeToBlob(name, arr);
    return writeToFS(name, arr);
}

// util umum
export function toSlug(s) {
    return String(s || "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
export function ensureUniqueSlug(items, base, excludeId = null) {
    let slug = base || "item";
    let n = 2;
    const taken = new Set(
        items
            .filter((p) => (excludeId == null ? true : p.id !== excludeId))
            .map((p) => p.slug)
    );
    while (taken.has(slug)) slug = `${base}-${n++}`;
    return slug;
}
export function nextId(items) {
    return items.reduce((m, it) => Math.max(m, Number(it.id) || 0), 0) + 1;
}
