import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AdmissionCarousel from "@/components/AdmissionCarousel";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import ServicesSection from "@/components/ServicesSection";
import FeatureHighlight from "@/components/FeatureHighlight";
import ContactSection from "@/components/ContactSection";
import LocalGuidance from "@/components/LocalGuidance";
import Footer from "@/components/Footer";
import FounderSpotlight from "@/components/FounderSpotlight";
import ServiceMarquee from "@/components/ServiceMarquee";
import { studyAbroadBand, studyCountryBand } from "@/lib/careerCounsellingData";

const Index = () => {
  return (
    <div className="career-theme relative isolate min-h-screen overflow-hidden bg-[#eef9fb]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(214,163,41,0.26),transparent_28%),radial-gradient(circle_at_84%_14%,rgba(142,214,237,0.54),transparent_32%),radial-gradient(circle_at_28%_42%,rgba(214,163,41,0.16),transparent_30%),radial-gradient(circle_at_78%_56%,rgba(142,214,237,0.34),transparent_34%),radial-gradient(circle_at_18%_82%,rgba(214,163,41,0.14),transparent_30%),linear-gradient(180deg,#eaf8fb_0%,#f7fcff_42%,#eef9fb_72%,#f8fbff_100%)]" />
      <Navbar />
      <div className="pt-[128px] md:pt-[118px]">
        <ServiceMarquee items={studyCountryBand} duration="52s" />
      </div>
      <HeroSection />
      <ServiceMarquee items={studyAbroadBand} />
      <AdmissionCarousel />
      <WhatWeDoSection />
      <ServicesSection />
      <FeatureHighlight />
      <FounderSpotlight
        label="Study Abroad Mentor"
        title="Global admissions guidance backed by certified career insight."
        copy="Mr. Bijoe Thomas combines international education counselling, career analysis, profile strategy, and decades of global leadership experience to help students choose study-abroad pathways that fit their strengths, budget, and long-term goals."
        note="Certified support for study abroad, profile strategy, and international admissions"
      />
      <LocalGuidance focus="study" />
      <ContactSection showBottomDivider />
      <Footer />
    </div>
  );
};

export default Index;
