import { NextResponse } from "next/server";
import { readArray, writeArray, toSlug, ensureUniqueSlug, nextId } from "@/lib/jsonStore.server";

export const runtime = "nodejs";

export async function GET() {
    const items = await readArray("products");
    items.sort((a, b) => Number(b.id) - Number(a.id));
    return NextResponse.json(items);
}

export async function POST(req) {
    const body = await req.json();
    const items = await readArray("products");

    const id = nextId(items);
    const baseSlug = toSlug(body.title || `product-${id}`);
    const slug = ensureUniqueSlug(items, baseSlug);

    const newItem = {
        id,
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
    await writeArray("products", items);
    return NextResponse.json(newItem, { status: 201 });
}
