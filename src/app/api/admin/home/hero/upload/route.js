import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file || !file.name) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // simpan ke folder public/uploads
        const bytes = Buffer.from(await file.arrayBuffer());
        const uploadDir = path.join(process.cwd(), "public", "uploads", "home", "hero");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        const filePath = path.join(uploadDir, file.name);
        fs.writeFileSync(filePath, bytes);

        // URL publik
        const url = `/uploads/home/hero/${file.name}`;

        return NextResponse.json({ url }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
