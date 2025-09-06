import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // limit sederhana (10MB)
    const MAX = 10 * 1024 * 1024;
    if (buffer.length > MAX) {
        return NextResponse.json({ error: "File too large" }, { status: 413 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "posts");
    await fs.mkdir(uploadDir, { recursive: true });

    const base = path.basename(file.name).replace(/\s+/g, "-");
    const random = Math.random().toString(36).slice(2, 8);
    const filename = `${Date.now()}-${random}-${base}`;
    const filepath = path.join(uploadDir, filename);

    await fs.writeFile(filepath, buffer);

    return NextResponse.json({ url: `/uploads/posts/${filename}` });
}
