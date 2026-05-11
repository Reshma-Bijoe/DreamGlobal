import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, Phone } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [quoteOnLight, setQuoteOnLight] = useState(false);

  useEffect(() => {
    const getBrightness = (color: string) => {
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (!match) return null;

      const [, r, g, b, a] = match;
      if (a !== undefined && Number(a) < 0.35) return null;

      return (Number(r) * 299 + Number(g) * 587 + Number(b) * 114) / 1000;
    };

    const updateQuoteContrast = () => {
      const quote = quoteRef.current;
      if (!quote) return;

      if (window.scrollY < window.innerHeight * 0.75) {
        setQuoteOnLight(false);
        return;
      }

      const rect = quote.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const previousPointerEvents = quote.style.pointerEvents;

      quote.style.pointerEvents = "none";
      const elements = document.elementsFromPoint(x, y);
      quote.style.pointerEvents = previousPointerEvents;

      for (const element of elements) {
        if (quote.contains(element)) continue;

        let current: Element | null = element;
        while (current && current !== document.documentElement) {
          const brightness = getBrightness(
            window.getComputedStyle(current).backgroundColor
          );

          if (brightness !== null) {
            setQuoteOnLight(brightness > 180);
            return;
          }

          current = current.parentElement;
        }
      }
    };

    updateQuoteContrast();
    window.addEventListener("scroll", updateQuoteContrast, { passive: true });
    window.addEventListener("resize", updateQuoteContrast);

    return () => {
      window.removeEventListener("scroll", updateQuoteContrast);
      window.removeEventListener("resize", updateQuoteContrast);
    };
  }, []);

  return (
    <section id="contact" className="section-padding bg-muted/50" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary tracking-[0.2em] uppercase text-sm font-medium mb-3">
            Get In Touch
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Contact <span className="gold-gradient-text">Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            {/* Email */}
            <a
              href="mailto:info@dreamglobal.com"
              className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Mail size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Email Us</h3>
                <p className="text-muted-foreground text-sm">dreamglobalin@gmail.com</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+919876543210"
              className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Phone size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Call Us</h3>
                <p className="text-muted-foreground text-sm">+91 88486 74757</p>
              </div>
            </a>

            {/* Address 
            <div className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-primary-foreground" />
              </div>
              */}
              {/* <------lines for address starts here------->
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Visit Us</h3>
                <p className="text-muted-foreground text-sm">BT ARCADE, Bus Stand, Hill Rd, near PRIVATE, PERUMPRAYIL, Periyar Nagar, Aluva, Kerala 683101</p>
              </div>
              <------lines for address ends here------->
              
            </div>
             */}
          </motion.div>

          {/* Map 
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-lg overflow-hidden border border-border h-full min-h-[320px]"
          >
            */}
            {/* <-----lines for map embed starts here----->
            <iframe
              title="DreamGlobal Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15711.560393494448!2d76.34072507140984!3d10.108081274544604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x81105dc8b24ce16d%3A0x7d87ab00dd3c6554!2sDreamGlobal!5e0!3m2!1sen!2sin!4v1775750841789!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <-----lines for map embed ends here----->
          </motion.div>
          */} 
        </div>
      </div>

     
    </section>
  );
};

export default ContactSection;
