import { NextResponse } from "next/server";
import { readArray, writeArray, toSlug, ensureUniqueSlug, nextId } from "@/lib/jsonStore.server";

export const runtime = "nodejs";

export async function GET() {
    const items = await readArray("posts");
    items.sort((a, b) => Number(b.id) - Number(a.id));
    return NextResponse.json(items);
}

export async function POST(req) {
    const body = await req.json();
    const items = await readArray("posts");

    const id = nextId(items);
    const baseSlug = toSlug(body.title || `post-${id}`);
    const slug = ensureUniqueSlug(items, baseSlug);

    const newItem = {
        id,
        slug,
        title: body.title || "",
        tag: body.tag || "",
        date: body.date || "",
        read: body.read || "",
        excerpt: body.excerpt || "",
        cover: body.cover || "",
        content: body.content || "", // pakai textarea
    };

    items.push(newItem);
    await writeArray("posts", items);
    return NextResponse.json(newItem, { status: 201 });
}
