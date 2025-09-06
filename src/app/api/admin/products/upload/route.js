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

    const uploadDir = path.join(process.cwd(), "public", "uploads", "products");
    await fs.mkdir(uploadDir, { recursive: true });

    // sanitize filename basic
    const base = path.basename(file.name).replace(/\s+/g, "-");
    const filename = `${Date.now()}-${base}`;
    const filepath = path.join(uploadDir, filename);

    await fs.writeFile(filepath, buffer);

    // return public path
    return NextResponse.json({ url: `/uploads/products/${filename}` });
}