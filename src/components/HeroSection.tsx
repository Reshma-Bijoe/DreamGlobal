import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Globe2, MapPinned } from "lucide-react";
import businessSchool from "@/assets/study-abroad/business-school.jpg";
import classroom from "@/assets/study-abroad/classroom.jpg";
import designStudio from "@/assets/study-abroad/design-studio.jpg";
import graduationPathway from "@/assets/study-abroad/graduation-pathway.jpg";
import mbbsSimulation from "@/assets/study-abroad/mbbs-simulation.jpg";
import stemLab from "@/assets/study-abroad/stem-lab.jpg";

const heroSlides = [
  {
    src: classroom,
    alt: "International students learning together in a university classroom",
    title: "Global Classrooms",
    text: "Learn with diverse peers in programs that match your strengths and goals.",
  },
  {
    src: stemLab,
    alt: "International students collaborating in a university STEM lab",
    title: "STEM and Research",
    text: "Explore future-ready programs with practical lab and research exposure.",
  },
  {
    src: mbbsSimulation,
    alt: "Medical students practicing in a university simulation lab",
    title: "MBBS Pathways",
    text: "Compare medical routes carefully with eligibility, recognition, and budget in mind.",
  },
  {
    src: businessSchool,
    alt: "Students presenting in an international business school classroom",
    title: "Business and Management",
    text: "Build a profile for global business, analytics, finance, and management programs.",
  },
  {
    src: designStudio,
    alt: "Architecture and design students reviewing studio work abroad",
    title: "Design and Architecture",
    text: "Shape portfolios and creative pathways for studio-led international programs.",
  },
  {
    src: graduationPathway,
    alt: "International graduates celebrating on a university campus",
    title: "Confident Outcomes",
    text: "Plan from admission to arrival with a roadmap that feels personal and practical.",
  },
];

const studyAbroadPoints = [
  "Choose the right country, university, and course with clarity",
  "Build a stronger profile for admissions and scholarships",
  "Get end-to-end support from applications to pre-departure",
];

const HeroSection = () => {
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroImageIndex((current) => (current + 1) % heroSlides.length);
    }, 3400);

    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = heroSlides[heroImageIndex];

  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-8 pl-3 pr-10 pt-10 sm:px-4 md:pb-9 md:pt-12"
    >
      <div className="container mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-[calc(100%+1.5rem)] max-w-[calc(100vw-3.75rem)] sm:w-auto sm:max-w-none"
        >
          <p className="career-eyebrow">International Education Experts</p>
          <h1 className="career-heading mt-5 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Your Global Future Begins Here.
          </h1>
          <p className="mt-5 text-lg font-semibold text-[color:var(--career-primary-deep)] sm:text-xl">
            Study abroad guidance for students who want the right fit, not a
            random shortlist.
          </p>
          <p className="career-copy mt-5 max-w-2xl text-sm leading-7 sm:text-base sm:leading-8">
            DreamGlobal helps you compare destinations, courses, universities,
            admissions timelines, scholarships, travel documents, and
            pre-departure steps so every decision feels practical and personal.
          </p>

          <div className="mt-6 grid max-w-2xl gap-3">
            {studyAbroadPoints.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[color:var(--career-primary)] shadow-[0_0_14px_rgba(200,138,24,0.45)]" />
                <span className="text-sm font-semibold leading-6 text-[color:var(--career-primary-ink)]">
                  {point}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-nowrap">
            <a
              href="https://dreamglobal.edumilestones.com/login/global-admissions/"
              rel="noopener noreferrer"
              className="career-primary-button inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold shadow-[0_14px_30px_-16px_rgba(200,138,24,0.95)] transition hover:-translate-y-0.5 sm:whitespace-nowrap"
            >
              Start Your Journey
              <ArrowRight size={17} />
            </a>
            <Link
              to="/book-consultation"
              className="career-primary-button inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold shadow-[0_14px_30px_-16px_rgba(200,138,24,0.95)] transition hover:-translate-y-0.5 sm:whitespace-nowrap"
            >
              <CalendarCheck size={17} />
              Book Free Consultation
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="study-hero-visual relative sm:mx-auto sm:w-full sm:max-w-none lg:translate-x-14 xl:translate-x-24"
        >
          <div className="career-glass-card relative aspect-[4/5] min-h-[26rem] overflow-hidden rounded-2xl sm:aspect-[5/4] lg:min-h-[29rem] xl:min-h-[30rem]">
            <motion.img
              key={activeSlide.src}
              src={activeSlide.src}
              alt={activeSlide.alt}
              className="h-full w-full object-cover"
              initial={{ opacity: 0.2, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061D3D] via-[#061D3D]/76 to-transparent p-4 pt-20 text-white sm:p-6">
              <div className="w-full rounded-xl border border-white/15 bg-[#061D3D]/78 p-4 shadow-2xl shadow-[#061D3D]/35 backdrop-blur-md sm:p-5">
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-[color:var(--career-primary)]">
                  Global pathway
                </p>
                <h2 className="mt-2 font-heading text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl">
                  {activeSlide.title}
                </h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/90 md:text-base">
                  {activeSlide.text}
                </p>
              </div>
            </div>
          </div>

          <div className="career-card absolute -left-3 top-3 whitespace-nowrap rounded-full px-3 py-2 text-[0.72rem] font-bold text-[color:var(--career-primary-ink)] sm:top-8 sm:px-4 sm:py-3 sm:text-sm">
            <Globe2
              className="mr-2 inline-block text-[color:var(--career-primary)]"
              size={15}
            />
            25+ Countries of Opportunities
          </div>
          <div className="career-gold-pill relative z-10 -mt-4 ml-4 w-fit rounded-full px-4 py-3 text-sm font-bold sm:absolute sm:bottom-4 sm:right-4 sm:ml-0 sm:mt-0">
            <MapPinned className="mr-2 inline-block" size={17} />
            Profile-Led Admissions
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
