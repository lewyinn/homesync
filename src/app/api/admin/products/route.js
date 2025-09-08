import { NextResponse } from "next/server";
import { readAllProducts, writeAllProducts, toSlug, ensureUniqueSlug, nextId } from "@/lib/productsStore.server";

export const runtime = "nodejs";

export async function GET() {
    const items = await readAllProducts();
    items.sort((a, b) => Number(b.id) - Number(a.id));
    return NextResponse.json(items);
}

export async function POST(req) {
    const body = await req.json();
    const items = await readAllProducts();

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
        cover: body.cover || "", // URL dari Vercel Blob
    };

    items.push(newItem);
    await writeAllProducts(items);
    return NextResponse.json(newItem, { status: 201 });
}
