import { NextResponse } from "next/server";
import { readArray, writeArray, toSlug, ensureUniqueSlug } from "@/lib/jsonStore.server";

export const runtime = "nodejs";

export async function GET(_req, { params }) {
    const { id } = params;
    const items = await readArray("posts");
    const item = items.find((p) => p.id === Number(id));
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
}

export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json();
    const items = await readArray("posts");
    const idx = items.findIndex((p) => p.id === Number(id));
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const current = items[idx];
    let newSlug = current.slug;
    if (body.title && body.title !== current.title) {
        const base = toSlug(body.title);
        newSlug = ensureUniqueSlug(items, base, current.id);
    }

    items[idx] = { ...current, ...body, slug: newSlug };
    await writeArray("posts", items);
    return NextResponse.json(items[idx]);
}

export async function DELETE(_req, { params }) {
    const { id } = params;
    const items = await readArray("posts");
    const idx = items.findIndex((p) => p.id === Number(id));
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const [deleted] = items.splice(idx, 1);
    await writeArray("posts", items);
    return NextResponse.json(deleted);
}
