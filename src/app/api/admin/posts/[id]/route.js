import { NextResponse } from "next/server";
import {
    readAllPosts,
    writeAllPosts,
    toSlug,
    ensureUniqueSlug,
} from "@/lib/postsStore.server";
// (opsional) hapus file blob saat delete:
// import { del } from "@vercel/blob";

export const runtime = "nodejs";

export async function GET(_req, { params }) {
    const { id } = params;
    const items = await readAllPosts();
    const item = items.find((p) => p.id === Number(id));
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
}

export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json();
    const items = await readAllPosts();
    const idx = items.findIndex((p) => p.id === Number(id));
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const current = items[idx];

    // regenerate slug jika title berubah
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

export async function DELETE(_req, { params }) {
    const { id } = params;
    const items = await readAllPosts();
    const idx = items.findIndex((p) => p.id === Number(id));
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const [deleted] = items.splice(idx, 1);

    // (opsional) kalau mau hapus blob juga:
    // if (deleted.cover?.includes(".blob.vercel-storage.com")) {
    //   try { await del(deleted.cover); } catch (e) { console.error(e); }
    // }

    await writeAllPosts(items);
    return NextResponse.json(deleted);
}
