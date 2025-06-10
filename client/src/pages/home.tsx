import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import PackagesSection from "@/components/PackagesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { initializeScrollAnimations } from "@/lib/smoothScroll";

export default function Home() {
  useEffect(() => {
    const cleanup = initializeScrollAnimations();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <GallerySection />
      <PackagesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
