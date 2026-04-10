import { useState, useEffect } from "react";
import { Menu, X, Mail, Phone } from "lucide-react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg shadow-background/50" : "bg-transparent"
      }`}
    >
      {/* --- NEW TOP BAR START --- */}
    <div className="hidden md:block bg-secondary py-2 border-b border-white/10">
      <div className="container mx-auto flex justify-end gap-6 text-white/80 text-sm">
        <a href="mailto:dreamglobalin@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
          <Mail size={14} className="text-gold" />
          <span>dreamglobalin@gmail.com</span>
        </a>
        <a href="tel:+918848674757" className="flex items-center gap-2 hover:text-gold transition-colors">
          <Phone size={14} className="text-gold" />
          <span>+91 88486 74757</span>
        </a>
      </div>
    </div>
    {/* --- NEW TOP BAR END --- */}
      <div className="container mx-auto flex items-center justify-between py-4">
        <a href="#hero" className="flex items-center gap-3 font-heading text-5xl font-bold tracking-wide">
          <img src={DreamGlobalLogo} alt="Dream Global Logo" className="h-12 w-12 rounded-full" />
          <span>
            <span className="gold-gradient-text">Dream</span>
            <span className="gold-gradient-text">Global</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://dreamglobal.edumilestones.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="gold-gradient-bg text-primary-foreground px-5 py-2 rounded-md text-base font-semibold hover:opacity-90 transition-opacity"
          >
            Start Your Journey
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-md border-t border-border overflow-hidden"
          >
            <div className="container mx-auto py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://dreamglobal.edumilestones.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-gradient-bg text-primary-foreground px-5 py-2.5 rounded-md text-base font-semibold text-center"
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
