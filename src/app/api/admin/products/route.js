import { NextResponse } from "next/server";
import { readAll, writeAll, toSlug } from "@/lib/productsStore";

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

export async function GET() {
    const items = await readAll();
    return NextResponse.json(items);
}

export async function POST(req) {
    const body = await req.json();
    const items = await readAll();

    const nextId = (items.at(-1)?.id ?? 0) + 1;

    // SELALU generate dari title (abaikan body.slug)
    const baseSlug = toSlug(body.title || `product-${nextId}`);
    const slug = ensureUniqueSlug(items, baseSlug);

    const newItem = {
        id: nextId,
        slug,
        title: body.title || "",
        location: body.location || "",
        year: body.year || "",
        size: body.size || "",
        desc: body.desc || "",
        badge: body.badge || "",
        type: body.type || "",
        cover: body.cover || "",
    };

    items.push(newItem);
    await writeAll(items);
    return NextResponse.json(newItem, { status: 201 });
}
