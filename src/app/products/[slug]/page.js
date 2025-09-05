// src/app/products/[slug]/page.js
import { notFound } from "next/navigation";
import products from "@/data/products.json";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
    return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;               // ✅ await params (BUKAN await props)
    const item = products.find((p) => p.slug === slug);
    if (!item) return { title: "Property Not Found" };
    return {
        title: `${item.title} — Properties`,
        description: item.desc,
        openGraph: {
            title: item.title,
            description: item.desc,
            images: [{ url: item.cover }],
        },
    };
}

export default async function ProductDetailPage({ params }) {
    const { slug } = await params;               // ✅ await params (BUKAN await props)
    const item = products.find((p) => p.slug === slug);
    if (!item) notFound();
    return <ProductDetailClient item={item} />;
}
