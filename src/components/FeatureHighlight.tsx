import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Users, Award, Clock } from "lucide-react";

const features = [
  { icon: Shield, title: "Trusted Expertise", desc: "Decade-long track record of successful admissions worldwide." },
  { icon: Users, title: "Personalized Mentorship", desc: "Dedicated counselors who understand your unique aspirations." },
  { icon: Award, title: "Top University Network", desc: "Partnerships with 500+ universities across 20+ countries." },
  { icon: Clock, title: "End-to-End Support", desc: "From first consultation to airport drop — we're with you." },
];

const FeatureHighlight = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Gold accent background stripe */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, hsl(45 70% 55%) 0px, hsl(45 70% 55%) 1px, transparent 1px, transparent 40px)`
      }} />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.2em] uppercase text-sm font-medium mb-3">
            The DreamGlobal Advantage
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold">
            Why Choose <span className="gold-gradient-text">Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex gap-5 p-6 rounded-lg border border-primary/20 bg-card/40 hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full gold-gradient-bg flex items-center justify-center flex-shrink-0">
                <f.icon size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold mb-1 text-foreground">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlight;
