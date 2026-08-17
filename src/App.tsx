import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingContactTabs from "./components/FloatingContactTabs.tsx";
import ScrollManager from "./components/ScrollManager.tsx";
import Admin from "./pages/Admin.tsx";
import BookConsultation from "./pages/BookConsultation.tsx";
import CareerCounselling from "./pages/CareerCounselling.tsx";
import Contact from "./pages/Contact.tsx";
import Founder from "./pages/Founder.tsx";
import Landing from "./pages/Landing.tsx";
import BlogPost from "./pages/higher-studies/BlogPost.tsx";
import Blogs from "./pages/higher-studies/Blogs.tsx";
import CallbackLanding from "./pages/higher-studies/CallbackLanding.tsx";
import Countries from "./pages/higher-studies/Countries.tsx";
import CountryPage from "./pages/higher-studies/CountryPage.tsx";
import FAQs from "./pages/higher-studies/FAQs.tsx";
import Index from "./pages/higher-studies/Index.tsx";
import MBBS from "./pages/higher-studies/MBBS.tsx";
import MBBSGuide from "./pages/higher-studies/MBBSGuide.tsx";
import NotFound from "./pages/NotFound.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import SuccessLetters from "./pages/higher-studies/SuccessLetters.tsx";
import Testimonials from "./pages/Testimonials.tsx";

const queryClient = new QueryClient();

const SameTabLinkHandler = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[target='_blank']") as HTMLAnchorElement | null;

      if (!anchor || !anchor.href) return;
      if (anchor.href.startsWith("tel:") || anchor.href.startsWith("mailto:")) return;

      event.preventDefault();
      window.location.href = anchor.href;
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <ScrollManager />
        <SameTabLinkHandler />
        <FloatingContactTabs />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/book-consultation" element={<BookConsultation />} />
          <Route path="/callback" element={<CallbackLanding />} />
          <Route path="/callback/:countryId" element={<CallbackLanding />} />
          <Route path="/career-counselling" element={<CareerCounselling />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:countryId" element={<CountryPage />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/higher-studies" element={<Index />} />
          <Route path="/mbbs" element={<MBBS />} />
          <Route path="/mbbs/guide" element={<MBBSGuide />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/success-letters" element={<SuccessLetters />} />
          <Route path="/testimonials" element={<Testimonials />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
