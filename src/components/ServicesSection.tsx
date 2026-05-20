import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import useSectionReplay from "@/hooks/use-section-replay";
import {
  Globe,
  BookOpen,
  UserCheck,
  FileText,
  CalendarClock,
  GraduationCap,
  ClipboardCheck,
  Plane,
  Ticket,
} from "lucide-react";

const services = [
  { icon: Globe, title: "Country & University Selection", desc: "Expert guidance on choosing the right destination and institution for your goals." },
  { icon: BookOpen, title: "Course Mapping & Career Alignment", desc: "Align your academic choices with long-term career aspirations." },
  { icon: UserCheck, title: "Profile Building & Portfolio Development", desc: "Craft a compelling profile that stands out to top universities." },
  { icon: FileText, title: "SOP, LOR & Essay Support", desc: "Professional assistance with statements of purpose, letters, and essays." },
  { icon: CalendarClock, title: "Application Strategy & Timeline", desc: "Strategic planning to meet every deadline with confidence." },
  { icon: GraduationCap, title: "Scholarship & Financial Aid", desc: "Unlock funding opportunities to make your dream affordable." },
  { icon: ClipboardCheck, title: "Test Prep Recommendations", desc: "Guidance on IELTS, TOEFL, GRE, GMAT, and other required tests." },
  { icon: Plane, title: "Visa & Pre-Departure Assistance", desc: "Smooth transitions with visa processing, accommodation, and orientation." },
  { icon: Ticket, title: "Travel Booking & Ticketing", desc: "End-to-end travel arrangements for a hassle-free journey." },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });
  const replayKey = useSectionReplay("#services");

  return (
    <section id="services" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          key={`services-heading-${replayKey}`}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.2em] uppercase text-sm font-medium mb-3">
            What We Offer
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold">
            Our <span className="gold-gradient-text">Services</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={`${service.title}-${replayKey}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-6 group hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg gold-gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <service.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
