import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "src", "data", "posts.json");

export async function readAllPosts() {
    try {
        const raw = await fs.readFile(dataPath, "utf-8");
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr : [];
    } catch (e) {
        if (e.code === "ENOENT") return [];
        throw e;
    }
}

export async function writeAllPosts(items) {
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    await fs.writeFile(dataPath, JSON.stringify(items, null, 4), "utf-8");
}

// sama seperti toSlug di productsStore
export function toSlug(s) {
    return (s || "")
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
