import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "products.json");

export async function readAll() {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
}

export async function writeAll(items) {
    await fs.writeFile(filePath, JSON.stringify(items, null, 2), "utf-8");
}

export function toSlug(s) {
    return String(s || "")
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}
