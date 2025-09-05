import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 md:px-8 py-24 text-center text-black">
            <h2 className="text-2xl font-bold">Property Not Found</h2>
            <p className="mt-2 text-black/70">Maaf, properti yang kamu cari tidak tersedia.</p>
            <Link href="/products" className="mt-4 inline-block text-lime-400 hover:underline">
                ← Back to Properties
            </Link>
        </div>
    );
}
