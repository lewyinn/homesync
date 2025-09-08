// src/app/products/[slug]/page.js
import { notFound } from "next/navigation";
import { readArray } from "@/lib/jsonStore.server";
import ProductDetailClient from "./ProductDetailClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

// (Opsional SSG) Jika mau build static dari seed FS, bisa aktifkan.
// export async function generateStaticParams() {
//   const items = await readArray("products");
//   return items.map((p) => ({ slug: p.slug }));
// }

export async function generateMetadata({ params }) {
    const { slug } = await params; // Next 15: params adalah Promise
    const items = await readArray("products");
    const item = items.find((p) => p.slug === slug);
    if (!item) return { title: "Property Not Found" };
    return {
        title: `${item.title} — Properties`,
        description: item.desc,
        openGraph: {
            title: item.title,
            description: item.desc,
            images: item.cover ? [{ url: item.cover }] : [],
        },
    };
}

export default async function ProductDetailPage({ params }) {
    const { slug } = await params;
    const items = await readArray("products");
    const item = items.find((p) => p.slug === slug);
    if (!item) notFound();
    return <ProductDetailClient item={item} />;
}
