import { promises as fs } from "fs";
import path from "path";
import { put, list } from "@vercel/blob";

const IS_VERCEL = !!process.env.VERCEL;
const HAS_BLOB = !!process.env.BLOB_URL;
const ROOT = path.join(process.cwd(), "src", "data");
const blobKey = (name) => `data/${name}.json`;

async function readFromFS(name) {
    const file = path.join(ROOT, `${name}.json`);
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw || "[]");
}
async function writeToBlob(name, data) {
    await put(blobKey(name), JSON.stringify(data, null, 2), {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,    
        contentType: "application/json",
    });
}
async function readFromBlobOrSeed(name) {
    const key = blobKey(name);
    const { blobs } = await list({ prefix: key, limit: 1 });
    const found = blobs.find((b) => b.pathname === key);
    if (!found) {
        // ⬇️ seed sekali dari FS jika ada
        try {
            const fsData = await readFromFS(name);
            await writeToBlob(name, fsData);
            return fsData;
        } catch {
            return []; // tidak ada file lokal → mulai kosong
        }
    }
    const res = await fetch(found.url, { cache: "no-store" });
    const text = await res.text();
    try { return JSON.parse(text); } catch { return []; }
}

export async function readArray(name) {
    if (IS_VERCEL && HAS_BLOB) return readFromBlobOrSeed(name);
    try { return await readFromFS(name); } catch (e) { return []; }
}
export async function writeArray(name, arr) {
    if (IS_VERCEL && HAS_BLOB) return writeToBlob(name, arr);
    const file = path.join(ROOT, `${name}.json`);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(arr, null, 2), "utf-8");
}
export function toSlug(s) { return String(s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") }
export function ensureUniqueSlug(items, base, excludeId = null) { let slug = base || "item", n = 2; const t = new Set(items.filter(p => excludeId == null ? true : p.id !== excludeId).map(p => p.slug)); while (t.has(slug)) slug = `${base}-${n++}`; return slug }
export function nextId(items) { return items.reduce((m, it) => Math.max(m, Number(it.id) || 0), 0) + 1 }