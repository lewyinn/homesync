// src/lib/blobJsonStore.server.js
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
    return JSON.parse(raw || "{}");
}

async function writeToFS(name, data) {
    const file = path.join(ROOT, `${name}.json`);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

async function writeToBlob(name, data) {
    await put(blobKey(name), JSON.stringify(data, null, 2), {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "application/json",
    });
}

async function readFromBlobOrSeed(name, fallback) {
    const key = blobKey(name);
    const { blobs } = await list({ prefix: key, limit: 1 });
    const found = blobs.find((b) => b.pathname === key);

    if (!found) {
        // ⬇️ seed sekali dari FS atau fallback
        try {
            const fsData = await readFromFS(name);
            await writeToBlob(name, fsData);
            return fsData;
        } catch {
            if (typeof fallback !== "undefined") {
                await writeToBlob(name, fallback);
                return fallback;
            }
            return {};
        }
    }

    const res = await fetch(found.url, { cache: "no-store" });
    const text = await res.text();
    try {
        return JSON.parse(text);
    } catch {
        return {};
    }
}

export async function readDoc(name, fallback = {}) {
    if (IS_VERCEL && HAS_BLOB) return readFromBlobOrSeed(name, fallback);
    try {
        return await readFromFS(name);
    } catch {
        return fallback;
    }
}

export async function writeDoc(name, data) {
    if (IS_VERCEL && HAS_BLOB) return writeToBlob(name, data);
    return writeToFS(name, data);
}
