import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Megaphone, Menu, X, Mail, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DreamGlobalLogo from "@/assets/DreamGlobalLogo.jpeg";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#features" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
        <div className="container mx-auto flex flex-col md:flex-row md:justify-end items-center gap-2 md:gap-6 text-white/80 text-xs sm:text-sm">
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
      <div className="container relative mx-auto flex items-center justify-between py-3 sm:py-4 ">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 font-bold tracking-wide"
        >
          <img
            src={DreamGlobalLogo}
            alt="Dream Global Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full"
          />
          <span className="dream-gradient-text text-3xl sm:text-4xl font-bold">
            DreamGlobal
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={sectionHref(link.href)}
              onClick={() => replaySection(link.href)}
              className="text-base lg:text-lg text-muted-foreground hover:text-primary transition"
            >
              {link.label}
            </a>
          ))}

          <Link
            to="/privacy-policy"
            className="text-base lg:text-lg text-muted-foreground hover:text-primary transition"
          >
            Privacy Policy
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="https://dreamglobal.edumilestones.com/"
              className="gold-gradient-bg text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90"
            >
              Start Your Journey
            </a>

            <div className="relative flex items-center justify-center translate-x-6 ml-3">
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
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
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
            className="md:hidden bg-background/95 backdrop-blur-md border-t"
          >
            <div className="container mx-auto py-4 flex flex-col gap-4">
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
