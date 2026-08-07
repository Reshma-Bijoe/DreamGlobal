import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingContactTabs from "./components/FloatingContactTabs.tsx";
import ScrollManager from "./components/ScrollManager.tsx";
import Admin from "./pages/Admin.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import Blogs from "./pages/Blogs.tsx";
import CallbackLanding from "./pages/CallbackLanding.tsx";
import CareerCounselling from "./pages/CareerCounselling.tsx";
import Countries from "./pages/Countries.tsx";
import CountryPage from "./pages/CountryPage.tsx";
import FAQs from "./pages/FAQs.tsx";
import Index from "./pages/Index.tsx";
import Landing from "./pages/Landing.tsx";
import MBBS from "./pages/MBBS.tsx";
import MBBSGuide from "./pages/MBBSGuide.tsx";
import NotFound from "./pages/NotFound.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import SuccessLetters from "./pages/SuccessLetters.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <ScrollManager />
        <FloatingContactTabs />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/callback" element={<CallbackLanding />} />
          <Route path="/callback/:countryId" element={<CallbackLanding />} />
          <Route path="/career-counselling" element={<CareerCounselling />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:countryId" element={<CountryPage />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/higher-studies" element={<Index />} />
          <Route path="/mbbs" element={<MBBS />} />
          <Route path="/mbbs/guide" element={<MBBSGuide />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/success-letters" element={<SuccessLetters />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
