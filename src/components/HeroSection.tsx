import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const text = "International Education Experts".split("");

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
          <p className="font-bold tracking-[0.03em] uppercase text-1xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
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
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white">
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
              target="_blank"
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;