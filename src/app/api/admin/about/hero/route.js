import { NextResponse } from "next/server";
import { readDoc, writeDoc } from "@/lib/blobJsonStore.server";

const NAME = "about/hero";

export async function GET() {
    try {
        const data = await readDoc(NAME, { title: "", desc: "", badges: [] });
        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({ error: "Failed to read hero.json" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        await writeDoc(NAME, body);
        return NextResponse.json({ ok: true });
    } catch (e) {
        return NextResponse.json({ error: "Failed to save hero.json" }, { status: 500 });
    }
}
