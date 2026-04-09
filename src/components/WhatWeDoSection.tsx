import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const WhatWeDoSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-primary tracking-[0.2em] uppercase text-sm font-medium mb-3">
            Our Mission
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            What We <span className="gold-gradient-text">Do</span>
          </h2>
          <p className="text-primary/80 font-heading text-lg md:text-xl italic mb-8">
            "Enabling Global Talent" is our mantra
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed text-center"
        >
          <p>
            At DreamGlobal, we are dedicated to your holistic well-being and professional
            success through personalized solutions. We offer a comprehensive platform
            encompassing career planning and professional development.
          </p>
          <p>
            Our specialists guide students through choosing subjects, selecting universities,
            exploring job roles, and setting long-term career goals. Whether it's undergraduate,
            postgraduate, diploma, or pathway programs abroad, we simplify every step with
            clarity and confidence.
          </p>
        </motion.div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center mt-12 gap-4">
          <div className="h-px w-16 bg-primary/30" />
          <div className="w-2 h-2 rounded-full gold-gradient-bg" />
          <div className="h-px w-16 bg-primary/30" />
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
