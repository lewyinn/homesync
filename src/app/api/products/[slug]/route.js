// src/app/api/products/[slug]/route.js
import { NextResponse } from "next/server";
import { readArray } from "@/lib/jsonStore.server";

export const runtime = "nodejs";

export async function GET(_req, { params }) {
  try {
    const { slug } = params;
    const items = await readArray("products");
    const item = items.find((p) => p.slug === slug);
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item, { status: 200 });
  } catch (e) {
    console.error("GET /api/products/[slug]:", e);
    return NextResponse.json({ error: "Failed to load" }, { status: 500 });
  }
}
