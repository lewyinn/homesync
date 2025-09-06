import { NextResponse } from "next/server";
import { readAllPosts, writeAllPosts, toSlug } from "@/lib/postsStore";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

function ensureUniqueSlug(items, base, excludeId = null) {
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

export async function GET(req, ctx) {
    const { id } = await ctx.params;
    const items = await readAllPosts();
    const item = items.find((p) => p.id === Number(id));
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
}

export async function PUT(req, ctx) {
    const { id } = await ctx.params;
    const body = await req.json();
    const items = await readAllPosts();
    const idx = items.findIndex((p) => p.id === Number(id));
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const current = items[idx];

    // regenerate slug hanya kalau title berubah
    let newSlug = current.slug;
    if (body.title && body.title !== current.title) {
        const base = toSlug(body.title);
        newSlug = ensureUniqueSlug(items, base, current.id);
    }

    items[idx] = {
        ...current,
        ...body,
        slug: newSlug,
    };

    await writeAllPosts(items);
    return NextResponse.json(items[idx]);
}

export async function DELETE(req, ctx) {
    const { id } = await ctx.params;
    const items = await readAllPosts();
    const idx = items.findIndex((p) => p.id === Number(id));
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const [deletedItem] = items.splice(idx, 1);

    // kalau cover disimpan di /public/uploads, hapus file-nya (opsional)
    if (deletedItem.cover && deletedItem.cover.startsWith("/uploads/posts")) {
        try {
            const rel = deletedItem.cover.replace(/^\//, "");
            const filePath = path.join(process.cwd(), "public", rel);
            await fs.unlink(filePath);
        } catch (e) {
            // abaikan error if not found
            console.error("Failed to delete cover:", e);
        }
    }

    await writeAllPosts(items);
    return NextResponse.json(deletedItem);
}
