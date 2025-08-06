import AboutUsSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/FooterComponents";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/NavbarComponents";
import ProductSection from "@/components/ProductSection";
import TestimonialSection from "@/components/TestimonialSection";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="container mx-auto px-2 md:px-8">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutUsSection />

        {/* Product Section */}
        <ProductSection />

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* Contact Section */}
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}
