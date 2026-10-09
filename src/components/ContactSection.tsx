import SectionDivider from "@/components/SectionDivider";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import useSectionReplay from "@/hooks/use-section-replay";
import LocationMap, { DREAMGLOBAL_ADDRESS } from "@/components/LocationMap";

const ContactSection = ({ showBottomDivider = false }: { showBottomDivider?: boolean }) => {
  const ref = useRef(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const replayKey = useSectionReplay("#contact");
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
    <section id="contact" className="section-padding bg-transparent" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          key={`contact-heading-${replayKey}`}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SectionDivider label="Get In Touch" className="mb-3" />
          <h2 className="career-heading font-heading text-3xl font-bold md:text-5xl">
            Contact <span className="gold-gradient-text">Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            key={`contact-cards-${replayKey}`}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            {/* Email */}
            <a
              href="mailto:dreamglobalin@gmail.com"
              className="career-card group flex items-start gap-4 rounded-2xl p-6 transition-all duration-300 hover:border-[color:var(--career-primary)]/40"
            >
              <div className="career-gold-pill flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105">
                <Mail size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="career-heading mb-1 font-heading text-lg font-semibold">Email Us</h3>
                <p className="career-copy text-sm">dreamglobalin@gmail.com</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+918848674757"
              className="career-card group flex items-start gap-4 rounded-2xl p-6 transition-all duration-300 hover:border-[color:var(--career-primary)]/40"
            >
              <div className="career-gold-pill flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105">
                <Phone size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="career-heading mb-1 font-heading text-lg font-semibold">Call Us</h3>
                <p className="career-copy text-sm">+91 88486 74757</p>
              </div>
            </a>

            <div className="career-card flex items-start gap-4 rounded-2xl p-6">
              <div className="career-gold-pill flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                <MapPin size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="career-heading mb-1 font-heading text-lg font-semibold">Visit Us</h3>
                <p className="career-copy text-sm leading-6">{DREAMGLOBAL_ADDRESS}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-full min-h-[320px]"
          >
            <LocationMap className="h-full" />
          </motion.div>
        </div>
        {showBottomDivider && (
          <div aria-hidden="true" className="mx-auto mt-12 flex w-full max-w-[34rem] items-center gap-4">
            <span className="h-px flex-1 bg-[color:var(--career-primary)]" />
            <span className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--career-primary)]" />
            <span className="h-px flex-1 bg-[color:var(--career-primary)]" />
          </div>
        )}
      </div>

     
    </section>
  );
};

export default ContactSection;
