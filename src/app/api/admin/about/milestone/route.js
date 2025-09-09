import { NextResponse } from "next/server";
import { readDoc, writeDoc } from "@/lib/blobJsonStore.server";

const NAME = "about/milestone";
const DEFAULTS = { timeline: [{ title: "", year: "", desc: "" }] };

export async function GET() {
    try {
        const data = await readDoc(NAME, DEFAULTS);
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Failed to read milestone.json" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        await writeDoc(NAME, body);
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Failed to save milestone.json" }, { status: 500 });
    }
}
