import { NextResponse } from "next/server";
import { readAll, writeAll, toSlug } from "@/lib/productsStore";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

function ensureUniqueSlug(items, base, excludeId = null) {
    let slug = base;
    let counter = 2;
    const taken = new Set(
        items
            .filter(p => (excludeId == null ? true : p.id !== excludeId))
            .map(p => p.slug)
    );
    while (taken.has(slug)) slug = `${base}-${counter++}`;
    return slug;
}

export async function GET(req, ctx) {
    const { id } = await ctx.params;
    const items = await readAll();
    const item = items.find((p) => p.id === Number(id));
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
}

export async function PUT(req, ctx) {
    const { id } = await ctx.params;
    const body = await req.json();
    const items = await readAll();
    const idx = items.findIndex((p) => p.id === Number(id));
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const current = items[idx];

    // hitung slug baru HANYA jika title berubah; abaikan body.slug
    let newSlug = current.slug;
    if (body.title && body.title !== current.title) {
        const base = toSlug(body.title);
        newSlug = ensureUniqueSlug(items, base, current.id);
    }

    items[idx] = { ...current, ...body, slug: newSlug };
    await writeAll(items);
    return NextResponse.json(items[idx]);
}

export async function DELETE(req, ctx) {
    const { id } = await ctx.params;
    const items = await readAll();
    const idx = items.findIndex((p) => p.id === Number(id));
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const [deletedItem] = items.splice(idx, 1);

    if (deletedItem.cover) {
        try {
            // FIX: cover biasanya '/uploads/xxx', jadi normalisasi dulu
            const rel = deletedItem.cover.replace(/^\//, "");
            const filePath = path.join(process.cwd(), "public", rel);
            await fs.unlink(filePath);
        } catch (error) {
            console.error(`Failed to delete image file: ${deletedItem.cover}`, error);
        }
    }

    await writeAll(items);
    return NextResponse.json(deletedItem);
}
