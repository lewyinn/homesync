import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const size = bytes.byteLength;
    const MAX = 10 * 1024 * 1024;
    if (size > MAX) return NextResponse.json({ error: "File too large" }, { status: 413 });
    if (!/\.(png|jpe?g|gif|webp)$/i.test(file.name || "")) {
        return NextResponse.json({ error: "Invalid extension" }, { status: 400 });
    }

    const clean = (file.name || "cover").replace(/\s+/g, "-").toLowerCase();
    const pathname = `posts/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${clean}`;

    const { url } = await put(pathname, bytes, {
        access: "public",
        addRandomSuffix: false,
    });

    return NextResponse.json({ url });
}
