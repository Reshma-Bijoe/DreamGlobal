import { Globe, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#features" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-16 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[1fr_0.8fr_0.8fr] gap-12">
        {/* Brand */}
        <div>
          <a href="#hero" className="font-heading text-2xl font-bold tracking-wide">
            <span className="gold-gradient-text">Dream</span>
            <span className="text-white">Global</span>
          </a>
          <p className="text-white/70 text-sm mt-4 leading-relaxed">
            Empowering students worldwide to achieve their international education and career dreams.
          </p>
          <div className="flex gap-4 mt-6">
            <a
              href="https://wa.me/918848674757"
              target="_blank"
              rel="noopener noreferrer"
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
                <a href={link.href} className="text-sm text-white/70 hover:text-gold transition-colors">
                  {link.label}
                </a>
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
              <span>BT ARCADE, Bus Stand, Hill Rd, near PRIVATE, PERUMPRAYIL, Periyar Nagar, Aluva, Kerala 683101</span>
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
