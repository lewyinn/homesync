import AboutUsSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/FooterComponents";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/NavbarComponents";
import ProductSection from "@/components/ProductSection";
import TestimonialSection from "@/components/TestimonialSection";

export default function Home() {
  return (
    <div className="px-4 md:px-6">
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
