import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AdmissionCarousel from "@/components/AdmissionCarousel";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import ServicesSection from "@/components/ServicesSection";
import FeatureHighlight from "@/components/FeatureHighlight";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AdmissionCarousel />
      <WhatWeDoSection />
      <ServicesSection />
      <FeatureHighlight />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
