import { notFound } from "next/navigation";
import posts from "@/data/posts.json";
import BlogDetailClient from "./BlogDetailClient";

export function generateStaticParams() {
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const item = posts.find((p) => p.slug === slug);
    if (!item) return { title: "Blog Not Found" };
    return {
        title: `${item.title} — Blog`,
        description: item.excerpt,
        openGraph: {
            title: item.title,
            description: item.excerpt,
            images: [{ url: item.cover }]
        }
    };
}

export default async function BlogDetailPage({ params }) {
    const { slug } = await params;
    const item = posts.find((p) => p.slug === slug);
    if (!item) notFound();

    const others = posts.filter((p) => p.slug !== slug);
    return <BlogDetailClient item={item} others={others} />;
}
