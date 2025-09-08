// src/app/api/products/route.js
import { NextResponse } from "next/server";
import { readArray } from "@/lib/jsonStore.server";

export const runtime = "nodejs";

export async function GET() {
    try {
        const items = await readArray("products");
        items.sort((a, b) => Number(b.id) - Number(a.id));
        return NextResponse.json(items, { status: 200 });
    } catch (e) {
        console.error("GET /api/products:", e);
        return NextResponse.json([], { status: 200 });
    }
}
