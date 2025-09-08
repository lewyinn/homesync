import { kv } from "@vercel/kv";
import { promises as fs } from "fs";
import path from "path";

const IS_PROD = !!process.env.VERCEL;
const KV_KEY = "posts";
const FILE_PATH = path.join(process.cwd(), "src", "data", "posts.json");

export async function readAllPosts() {
    if (IS_PROD) {
        const data = await kv.get(KV_KEY);
        if (!data) {
            // seed sekali dari file lokal bila ada
            try {
                const raw = await fs.readFile(FILE_PATH, "utf-8");
                const arr = JSON.parse(raw);
                await kv.set(KV_KEY, arr);
                return Array.isArray(arr) ? arr : [];
            } catch {
                return [];
            }
        }
        return Array.isArray(data) ? data : [];
    } else {
        try {
            const raw = await fs.readFile(FILE_PATH, "utf-8");
            const arr = JSON.parse(raw);
            return Array.isArray(arr) ? arr : [];
        } catch (e) {
            if (e.code === "ENOENT") return [];
            throw e;
        }
    }
}

export async function writeAllPosts(items) {
    if (IS_PROD) {
        await kv.set(KV_KEY, items);
    } else {
        await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
        await fs.writeFile(FILE_PATH, JSON.stringify(items, null, 4), "utf-8");
    }
}

export function toSlug(s) {
    return (s || "")
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function ensureUniqueSlug(items, base, excludeId = null) {
    let slug = base || "post";
    let counter = 2;
    const taken = new Set(
        items
            .filter((p) => (excludeId == null ? true : p.id !== excludeId))
            .map((p) => p.slug)
    );
    while (taken.has(slug)) slug = `${base}-${counter++}`;
    return slug;
}
