import AboutUsSection from "@/components/Beranda/AboutSection";
import ContactSection from "@/components/Beranda/ContactSection";
import Footer from "@/components/layouts/FooterComponents";
import Navbar from "@/components/layouts/NavbarComponents";
import ProductSection from "@/components/Beranda/ProductSection";
import TestimonialSection from "@/components/Beranda/TestimonialSection";
import Hero from "@/components/Beranda/Hero";
import BlogSection from "@/components/Beranda/BlogSection";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="relative bg-hero">
        {/* overlay gradasi biar teks kontras */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 pointer-events-none" />
        
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <Hero />
      </div>

      <div className="container mx-auto px-2 md:px-8">
        <AboutUsSection />
        <ProductSection />
        <TestimonialSection />
        <BlogSection />
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
}
