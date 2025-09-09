import { NextResponse } from "next/server";
import { readDoc, writeDoc } from "@/lib/blobJsonStore.server";

const NAME = "about/whatwedo";
const DEFAULTS = { title: "", badges: [{ title: "" }], note: "" };

export async function GET() {
    try {
        const data = await readDoc(NAME, DEFAULTS);
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Failed to read whatwedo.json" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        await writeDoc(NAME, body);
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Failed to save whatwedo.json" }, { status: 500 });
    }
}
