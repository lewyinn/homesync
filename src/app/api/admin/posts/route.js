import { NextResponse } from "next/server";
import {
    readAllPosts,
    writeAllPosts,
    toSlug,
    ensureUniqueSlug,
} from "@/lib/postsStore.server";

export const runtime = "nodejs";

export async function GET() {
    const items = await readAllPosts();
    items.sort((a, b) => Number(b.id) - Number(a.id));
    return NextResponse.json(items);
}

export async function POST(req) {
    const body = await req.json();
    const items = await readAllPosts();

    // cari id max lalu +1 (aman meskipun data acak)
    const nextId =
        items.reduce((m, it) => Math.max(m, Number(it.id) || 0), 0) + 1;

    // slug otomatis dari title
    const baseSlug = toSlug(body.title || `post-${nextId}`);
    const slug = ensureUniqueSlug(items, baseSlug);

    const newItem = {
        id: nextId,
        slug,
        title: body.title || "",
        tag: body.tag || "",
        date: body.date || "",
        read: body.read || "",
        excerpt: body.excerpt || "",
        cover: body.cover || "", // URL Blob
        content: body.content || "", // TEXT (bukan array)
    };

    items.push(newItem);
    await writeAllPosts(items);
    return NextResponse.json(newItem, { status: 201 });
}
