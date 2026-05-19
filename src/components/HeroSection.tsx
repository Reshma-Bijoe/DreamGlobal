import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { useRef, useState, useEffect } from 'react';


const HeroSection = () => {
  const text = "International Education Experts".split("");
  const quoteRef = useRef<HTMLDivElement>(null);
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
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Light overlay (keeps image visible) */}
      <div className="absolute inset-0 bg-secondary/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* ✨ Responsive Glow Text */}
          <p className="font-semibold tracking-[0.03em] uppercase text-1xl sm:text-2xl md:text-3xl lg:text-3xl mb-4">
            {text.map((char, index) => (
              <span
                key={index}
                className="inline-block animate-glow-letter"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(var(--gold-dark)), hsl(var(--gold)), hsl(var(--gold-light)))",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>

          {/* Heading */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl :text-6xl font-bold leading-tight mb-6 text-white">
            Your Global Future{" "}
            <span className="gold-gradient-text">Begins Here</span>
          </h1>

          {/* Subtext */}
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            Empowering students to achieve international education and career success
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://dreamglobal.edumilestones.com/"
              rel="noopener noreferrer"
              className="gold-gradient-bg text-primary-foreground px-8 py-3.5 rounded-md font-semibold text-base hover:opacity-90 transition-opacity hover:scale-105 transform duration-200"
            >
              Start Your Journey
            </a>

            <a
              href="#contact"
              className="border border-white/40 text-white px-8 py-3.5 rounded-md font-semibold text-base hover:bg-white/10 transition-all duration-200 hover:scale-105 transform"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#061226] to-transparent" />
       {/* Quote box */}
      <div
        ref={quoteRef}
        className={`absolute bottom-6 left-4 right-4 z-30 rounded-lg border px-5 py-4 text-[10px] font-medium leading-snug shadow-sm transition-colors duration-300 sm:left-8 sm:right-auto sm:w-[44rem] sm:px-7 sm:py-5 sm:text-sm md:w-[35rem] ${
          quoteOnLight
            ? "border-gray-900/25 text-gray-950"
            : "border-white/30 text-white"
        }`}
      >
        <p className="m-0 text-center drop-shadow-lg">
          <strong className="gold-gradient-text block text-base sm:text-lg lg:1 font-semibold leading-tight">
            <u>
              We Prioritize Individual Success Over Volume Business !!
            </u>
          </strong>
          <em className="block mt-1 text-[10px] sm:text-sm leading-snug">
            Every student&rsquo;s success matters deeply to us. We provide personalized
            counselling, intricate mentoring, and dedicated end-to-end support with
            individual attention at every step. Our focus is on successful
            outcomes, not volume-driven business.
          </em>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
