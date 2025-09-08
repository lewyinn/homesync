import { notFound } from "next/navigation";
import { readArray } from "@/lib/jsonStore.server"; // util yang kita pakai di semua API
import BlogDetailClient from "./BlogDetailClient";

// Selalu ambil data segar (Blob) – jangan cache build-time
export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
    const { slug } = await params;                 // Next 15: params = Promise
    const posts = await readArray("posts");        // baca dari Blob/FS
    const item = posts.find((p) => p.slug === slug);
    if (!item) return { title: "Blog Not Found" };
    return {
        title: `${item.title} — Blog`,
        description: item.excerpt,
        openGraph: {
            title: item.title,
            description: item.excerpt,
            images: item.cover ? [{ url: item.cover }] : [],
        },
    };
}

// (Opsional) Kalau mau SSG saat build dari seed FS, boleh aktifkan ini.
// Tapi karena data dinamis dari Blob, biasanya lebih aman dinonaktifkan.
// export async function generateStaticParams() {
//   const posts = await readArray("posts");
//   return posts.map((p) => ({ slug: p.slug }));
// }

export default async function BlogDetailPage({ params }) {
    const { slug } = await params;
    const posts = await readArray("posts");

    const item = posts.find((p) => p.slug === slug);
    if (!item) notFound();

    // Tampilkan beberapa artikel lain (opsional: sort dulu)
    const others = posts
        .filter((p) => p.slug !== slug)
        .slice(0, 6);

    return <BlogDetailClient item={item} others={others} />;
}
