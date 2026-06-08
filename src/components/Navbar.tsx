import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DreamGlobalLogo from "@/assets/DreamGlobalLogo.jpeg";
import { countryDestinations } from "@/data/countryDestinations";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const pageLinks = [
  { label: "FAQs", to: "/faqs" },
  { label: "Blogs", to: "/blogs" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);
  const [showChatTip, setShowChatTip] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const sectionHref = (href: string) => (isHomePage ? href : `/${href}`);
  const replaySection = (hash: string) => {
    window.dispatchEvent(
      new CustomEvent("dreamglobal:section-replay", { detail: { hash } })
    );
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowChatTip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      {/* ADMISSION ALERT */}
      <div className="gold-gradient-bg text-primary-foreground">
        <div className="container mx-auto flex items-center justify-center gap-2 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.12em] sm:text-sm">
          <Megaphone size={16} />
          <span>
            Multiple university admission intakes are open. Contact us now and hurry
            to secure your seat ! Free Counselling !!
          </span>
        </div>
      </div>

      {/* TOP BAR */}
      <div className="bg-secondary py-2 border-b border-white/10">
        <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-xs text-white/80 sm:text-sm md:flex-row md:justify-end md:gap-6">
          <a
            href="mailto:dreamglobalin@gmail.com"
            className="flex items-center gap-2 hover:text-gold transition-colors"
          >
            <Mail size={14} className="text-gold" />
            <span>dreamglobalin@gmail.com</span>
          </a>

          <a
            href="tel:+918848674757"
            className="flex items-center gap-2 hover:text-gold transition-colors"
          >
            <Phone size={14} className="text-gold" />
            <span>+91 88486 74757</span>
          </a>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="container relative mx-auto flex items-center justify-between px-4 py-3 sm:py-4">
        {/* LOGO */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3 font-bold tracking-wide"
        >
          <img
            src={DreamGlobalLogo}
            alt="Dream Global Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full"
          />
          <span className="dream-gradient-text text-2xl font-bold sm:text-4xl">
            DreamGlobal
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="ml-auto hidden items-center justify-end gap-5 xl:flex 2xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={sectionHref(link.href)}
              onClick={() => replaySection(link.href)}
              className="whitespace-nowrap text-sm text-muted-foreground transition hover:text-primary 2xl:text-base"
            >
              {link.label}
            </a>
          ))}

          {pageLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="whitespace-nowrap text-sm text-muted-foreground transition hover:text-primary 2xl:text-base"
            >
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setCountriesOpen(true)}
            onMouseLeave={() => setCountriesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCountriesOpen((current) => !current)}
              className="flex items-center gap-1 whitespace-nowrap text-sm text-muted-foreground transition hover:text-primary 2xl:text-base"
              aria-expanded={countriesOpen}
            >
              Countries
              <ChevronDown
                size={16}
                className={`transition ${countriesOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {countriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-lg border border-slate-200 bg-white py-2 shadow-xl"
                >
                  <p className="px-4 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-yellow-600">
                    Countries
                  </p>
                  <Link
                    to="/countries"
                    onClick={() => setCountriesOpen(false)}
                    className="block border-b border-slate-100 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-yellow-50"
                  >
                    All countries
                  </Link>
                  {countryDestinations.map((country) => (
                    <Link
                      key={country.id}
                      to={country.route}
                      onClick={() => setCountriesOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-yellow-50 hover:text-slate-950"
                    >
                      {country.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/privacy-policy"
            className="whitespace-nowrap text-sm text-muted-foreground transition hover:text-primary 2xl:text-base"
          >
            Privacy Policy
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="https://dreamglobal.edumilestones.com/"
              className="gold-gradient-bg whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Start Your Journey
            </a>

            <div className="relative ml-2 flex items-center justify-center">
              <AnimatePresence>
                {showChatTip && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 top-full z-50 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg"
                  >
                    Chat with us
                    <div className="absolute bottom-full right-4 border-b-4 border-l-4 border-r-4 border-transparent border-b-gray-900" />
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="absolute h-12 w-12 rounded-full bg-green-400 opacity-30 animate-ping " />

              <motion.a
                href="https://wa.me/918848674757"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg "
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                whileHover={{ scale: 1.12 }}
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={24} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/80 text-foreground xl:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-h-[calc(100vh-8rem)] overflow-y-auto border-t bg-background/95 backdrop-blur-md xl:hidden"
          >
            <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={sectionHref(link.href)}
                  onClick={() => {
                    replaySection(link.href);
                    setMobileOpen(false);
                  }}
                >
                  {link.label}
                </a>
              ))}

              {pageLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground"
                >
                  {link.label}
                </Link>
              ))}

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-yellow-600">
                  Countries
                </p>
                <div className="grid gap-2">
                  <Link
                    to="/countries"
                    onClick={() => setMobileOpen(false)}
                    className="font-semibold text-foreground"
                  >
                    All countries
                  </Link>
                  {countryDestinations.map((country) => (
                    <Link
                      key={country.id}
                      to={country.route}
                      onClick={() => setMobileOpen(false)}
                      className="text-foreground"
                    >
                      {country.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/privacy-policy"
                onClick={() => setMobileOpen(false)}
                className="text-foreground"
              >
                Privacy Policy
              </Link>

              <a
                href="https://dreamglobal.edumilestones.com/"
                className="gold-gradient-bg text-primary-foreground px-5 py-2.5 rounded-md text-center"
              >
                Start Your Journey
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
