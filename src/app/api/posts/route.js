import { NextResponse } from "next/server";
import { readArray } from "@/lib/jsonStore.server"; // yang sudah pakai Blob

export const runtime = "nodejs";

export async function GET() {
    try {
        const items = await readArray("posts"); // baca data/posts.json dari Blob (prod) / FS (dev)
        // urutkan terbaru di atas (opsional)
        items.sort((a, b) => Number(b.id) - Number(a.id));
        return NextResponse.json(items, { status: 200 });
    } catch (e) {
        console.error("GET /api/posts", e);
        return NextResponse.json([], { status: 200 }); // fallback aman
    }
}