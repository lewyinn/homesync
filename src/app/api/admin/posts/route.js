import { NextResponse } from "next/server";
import { readAllPosts, writeAllPosts, toSlug } from "@/lib/postsStore";

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

export async function GET() {
    const items = await readAllPosts();
    // bisa di-sort terbaru dulu, mis. berdasarkan id desc
    items.sort((a, b) => b.id - a.id);
    return NextResponse.json(items);
}

export async function POST(req) {
    const body = await req.json();
    const items = await readAllPosts();

    const nextId = (items.at(-1)?.id ?? 0) + 1;

    // slug selalu otomatis dari title
    const baseSlug = toSlug(body.title || `post-${nextId}`);
    const slug = ensureUniqueSlug(items, baseSlug);

    const newItem = {
        id: nextId,
        slug,
        title: body.title || "",
        tag: body.tag || "",
        date: body.date || "",      // biarkan input manual string (sesuai format kamu)
        read: body.read || "",      // mis: "5 min read"
        excerpt: body.excerpt || "",
        cover: body.cover || "",    // path public: /uploads/xxx
        content: body.content || "",// TEXT (bukan array)
    };

    items.push(newItem);
    await writeAllPosts(items);
    return NextResponse.json(newItem, { status: 201 });
}
