import { Globe, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { WHATSAPP_URL } from "@/lib/careerCounsellingData";
import { DREAMGLOBAL_ADDRESS } from "@/components/LocationMap";
import { DREAMGLOBAL_LOGO_URL } from "@/lib/branding";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#features" },
];

const pageLinks = [
  { label: "Career Counselling", to: "/career-counselling" },
  { label: "Founder", to: "/founder" },
  { label: "Contact", to: "/contact" },
  { label: "MBBS Abroad", to: "/mbbs" },
  { label: "Countries", to: "/countries" },
  { label: "Success Letters", to: "/success-letters" },
  { label: "FAQs", to: "/faqs" },
  { label: "Blogs", to: "/blogs" },
  { label: "Privacy Policy", to: "/privacy-policy" },
];

const Footer = () => {
  const location = useLocation();
  const isHigherStudiesPage = location.pathname === "/higher-studies";
  const isLandingPage = location.pathname === "/";
  const sectionHref = (href: string) =>
    isLandingPage || isHigherStudiesPage ? href : `/${href}`;
  const replaySection = (hash: string) => {
    window.dispatchEvent(
      new CustomEvent("dreamglobal:section-replay", { detail: { hash } })
    );
  };

  return (
    <footer className="bg-secondary text-white py-16 px-4">
      <div className="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-[1fr_0.75fr_0.75fr_0.85fr]">
        {/* Brand */}
        <div>
          <Link
            to="/higher-studies"
            className="inline-flex items-center gap-3 font-heading text-2xl font-bold tracking-wide"
          >
            <img src={DREAMGLOBAL_LOGO_URL} alt="DreamGlobal logo" width={56} height={56} className="h-14 w-14 object-contain" loading="lazy" />
            <span>
            <span className="gold-gradient-text">Dream</span>
            <span className="text-white">Global</span>
            </span>
          </Link>
          <p className="text-white/70 text-sm mt-4 leading-relaxed">
            Empowering students worldwide to achieve their international education and career dreams.
          </p>
          <div className="flex gap-4 mt-6">
            <a
              href={WHATSAPP_URL}
              className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/50 transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
            {["facebook", "instagram", "linkedin"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/50 transition-colors"
                aria-label={s}
              >
                <Globe size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={sectionHref(link.href)}
                  onClick={() => replaySection(link.href)}
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/mbbs"
                className="text-sm text-white/70 transition-colors hover:text-gold"
              >
                MBBS Abroad
              </Link>
            </li>
            <li>
              <a
                href="https://dreamglobal.edumilestones.com/login/global-admissions/"
                className="text-sm text-white/70 transition-colors hover:text-gold"
              >
                Start Your Journey
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-heading text-lg font-semibold text-white">
            Resources
          </h4>
          <ul className="space-y-2.5">
            {pageLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-white/70 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4 text-white">Contact Info</h4>
          <div className="space-y-3 text-sm text-white/70">
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-gold mt-0.5 flex-shrink-0" />
              <span>dreamglobalin@gmail.com</span>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={16} className="text-gold mt-0.5 flex-shrink-0" />
              <span>+91 8848674757</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
              <span>{DREAMGLOBAL_ADDRESS}</span>
            </div>

          </div>
        </div>
      </div>

      <div className="container mx-auto mt-12 pt-6 border-t border-white/20 text-center text-xs text-white/50">
        © {new Date().getFullYear()} DreamGlobal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
