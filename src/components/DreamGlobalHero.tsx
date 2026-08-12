import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  Compass,
  GraduationCap,
  Handshake,
  Plane,
  Route,
  ShieldCheck,
  Sparkles,
  Telescope,
  UsersRound,
} from "lucide-react";
import heroBgLand from "@/assets/hero-bg-land.png";

const journeySteps = [
  {
    title: "Discover",
    text: "Your strengths and passions",
    icon: Compass,
  },
  {
    title: "Explore",
    text: "Right career options and courses",
    icon: GraduationCap,
  },
  {
    title: "Choose",
    text: "Best universities and destinations",
    icon: Route,
  },
  {
    title: "Achieve",
    text: "A successful career and a global future",
    icon: Plane,
  },
];

const features = [
  {
    title: "Personalised Guidance",
    text: "Every student is unique. Every plan is personalised.",
    icon: UsersRound,
  },
  {
    title: "Expert Counsellors",
    text: "Experienced professionals who truly care.",
    icon: ShieldCheck,
  },
  {
    title: "End-to-End Support",
    text: "Right from career discovery to global opportunities.",
    icon: Handshake,
  },
  {
    title: "Global Perspective",
    text: "Connecting you to world-class education and careers.",
    icon: Telescope,
  },
  {
    title: "Student & Parent Focus",
    text: "Guiding students and reassuring parents at every step.",
    icon: BookOpenCheck,
  },
];

const stats = [
  { value: "1000+", label: "Students Guided", icon: UsersRound },
  { value: "150+", label: "Career Options Explored", icon: GraduationCap },
  { value: "200+", label: "Universities & Partners", icon: Building2 },
  { value: "25+", label: "Countries of Opportunities", icon: Telescope },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.12 },
  },
};

const MantraCard = ({ className = "" }: { className?: string }) => (
  <motion.div
    variants={fadeUp}
    className={`w-full max-w-[500px] rounded-lg border border-white/70 bg-white/62 p-4 shadow-[0_20px_50px_-34px_rgba(10,35,66,0.42)] backdrop-blur-xl sm:p-5 ${className}`}
  >
    <div className="grid gap-4 sm:grid-cols-[6rem_1fr] sm:items-center">
      <div className="flex items-center gap-3 sm:block">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#C88A18]/12 text-[#C88A18]">
          <Sparkles size={21} />
        </span>
        <p className="text-[0.68rem] font-bold uppercase leading-4 tracking-[0.2em] text-[#0A2342] sm:mt-3">
          Our
          <br />
          Mantra
        </p>
      </div>
      <p className="font-heading text-[1.18rem] font-semibold leading-tight text-[#0A2342] sm:text-[1.34rem]">
        Transforming Talent & Potential into Success and Prosperity. Building
        Futures <span className="text-[#C88A18]">Beyond Borders.</span>
      </p>
    </div>
  </motion.div>
);

const DreamGlobalHero = () => {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-[#FCF9F3]">
      <div
        className="relative min-h-[auto] overflow-hidden pt-[82px] md:pt-[96px] lg:min-h-[620px]"
        style={{
          background:
            "linear-gradient(90deg, #fcf8f0 0%, #faf8f2 28%, #f4f7f7 43%, #e7f3fb 65%, #dceeff 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 top-[82px] md:top-[96px]"
        >
          <img
            src={heroBgLand}
            alt="Student with backpack standing before an international university"
            className="h-full w-full object-cover object-[58%_center] md:object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#fcf8f0_0%,rgba(252,248,240,0.98)_19%,rgba(252,248,240,0.74)_36%,rgba(252,248,240,0.2)_49%,rgba(252,248,240,0)_60%)]" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#f8fbff]/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071F41]/38 to-transparent" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 flex min-h-[560px] w-full flex-col items-center px-[clamp(1rem,3.8vw,58px)] pb-16 pt-7 text-center sm:min-h-[590px] md:items-start md:text-left lg:min-h-[524px] lg:pb-16 lg:pt-5"
        >
          <div className="mx-auto max-w-[540px] md:mx-0 md:max-w-[45vw] lg:max-w-[37vw] xl:max-w-[540px]">
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.78, ease: "easeOut" }}
              className="font-heading text-[clamp(2.7rem,4.35vw,4.35rem)] font-bold leading-[0.96] text-[#0A2342]"
            >
              Your Future
              <br />
              Deserves the
              <br />
              <span className="text-[#C88A18]">Right Direction.</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="mx-auto mt-5 flex w-full max-w-[20rem] items-center sm:max-w-[25rem] md:mx-0 lg:max-w-[27rem]">
              <span className="h-px flex-1 bg-[#C88A18]" />
              <span className="mx-3 h-2.5 w-2.5 rotate-45 bg-[#C88A18]" />
              <span className="h-px flex-1 bg-[#C88A18]" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-[520px] text-[0.74rem] font-extrabold uppercase tracking-[0.11em] text-[#0A2342] sm:text-[0.86rem] md:mx-0"
            >
              Career Counselling{" "}
              <span className="mx-2 text-[#C88A18]">|</span> Higher Education{" "}
              <span className="mx-2 text-[#C88A18]">|</span> Study Abroad
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-[480px] text-base leading-7 text-[#405067] sm:text-[1.05rem] sm:leading-8 md:mx-0"
            >
              Discover your strengths, explore the right possibilities and build
              a personalised pathway towards your future.
            </motion.p>

            <motion.div
              variants={stagger}
              className="mt-7 flex flex-col justify-center gap-4 sm:flex-row sm:gap-5 md:justify-start"
            >
              <motion.div variants={fadeUp} whileHover={{ y: -3 }}>
                <Link
                  to="/career-counselling"
                  className="dream-gold-button inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-md px-5 text-sm font-bold shadow-[0_16px_30px_-17px_rgba(200,138,24,0.8)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-16px_rgba(200,138,24,0.9)] sm:w-[214px]"
                >
                  Find Your Career Fit
                  <ArrowRight size={17} />
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} whileHover={{ y: -3 }}>
                <Link
                  to="/higher-studies"
                  className="dream-gold-button inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-md px-5 text-sm font-bold shadow-[0_16px_30px_-17px_rgba(200,138,24,0.8)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-16px_rgba(200,138,24,0.9)] sm:w-[258px]"
                >
                  Plan Your Study Abroad
                  <ArrowRight size={17} />
                </Link>
              </motion.div>
            </motion.div>

            <MantraCard className="mt-6 hidden md:block" />
          </div>

          <div className="pointer-events-none relative z-20 mt-6 grid w-full gap-4 sm:grid-cols-2 lg:absolute lg:inset-0 lg:mt-0 lg:block">
            <svg
              aria-hidden="true"
              viewBox="0 0 86 430"
              className="pointer-events-none absolute right-[214px] top-[42px] z-0 hidden h-[462px] w-[86px] xl:right-[228px] lg:block"
              fill="none"
            >
              <path
                id="dreamglobal-journey-path"
                d="M43 4 C29 64 60 111 45 166 C30 226 62 279 46 332 C34 374 49 405 67 424"
                stroke="#0A2342"
                strokeOpacity="0.24"
                strokeWidth="2"
                strokeDasharray="5 13"
                strokeLinecap="round"
              />
              <path
                d="M43 4 C29 64 60 111 45 166 C30 226 62 279 46 332 C34 374 49 405 67 424"
                stroke="#C88A18"
                strokeOpacity="0.34"
                strokeWidth="1"
                strokeDasharray="2 18"
                strokeLinecap="round"
              />
            </svg>

            {journeySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + index * 0.16, duration: 0.5 }}
                  className="z-10 flex items-center justify-start gap-3 rounded-lg p-2 text-left lg:absolute lg:right-[34px] lg:w-[258px] xl:right-[48px]"
                  style={{ top: `${42 + index * 98}px` }}
                >
                  <motion.span
                    animate={{ y: [0, -7, 0] }}
                    transition={{
                      duration: 3.8,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: index * 0.28,
                    }}
                    className="inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#0A2342] text-[#D6A329] shadow-[0_0_28px_rgba(255,255,255,0.82)]"
                  >
                    <Icon size={24} />
                  </motion.span>
                  <span>
                    <span className="block text-[0.82rem] font-extrabold uppercase tracking-[0.08em] text-[#C88A18]">
                      {step.title}
                    </span>
                    <span className="mt-1 block max-w-[178px] text-[0.82rem] font-semibold leading-5 text-[#0A2342]">
                      {step.text}
                    </span>
                  </span>
                </motion.article>
              );
            })}
          </div>

          <MantraCard className="relative z-30 mt-7 border-white bg-white shadow-[0_18px_42px_-24px_rgba(10,35,66,0.5)] md:hidden" />
        </motion.div>
      </div>

      <section className="relative z-20 mt-1 bg-[#071F41] pb-5 pt-10 text-white lg:mt-0 lg:pt-10">
        <svg
          viewBox="0 0 1440 170"
          preserveAspectRatio="none"
          className="absolute inset-x-0 -top-[72px] h-[74px] w-full lg:-top-[92px] lg:h-[94px]"
          aria-hidden="true"
        >
          <path
            d="M0 132 C176 98 320 97 482 116 C672 138 826 155 1035 125 C1214 99 1354 55 1440 4 L1440 170 L0 170 Z"
            fill="#071F41"
          />
          <path
            d="M0 114 C176 80 320 79 482 98 C672 120 826 137 1035 107 C1214 81 1354 37 1440 -14"
            stroke="#D6A329"
            strokeWidth="3"
            fill="none"
          />
        </svg>

        <div className="grid w-full gap-6 px-[clamp(1rem,3.8vw,58px)] text-center md:grid-cols-5 md:gap-0 md:text-left">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="relative md:px-4 lg:px-6"
              >
                {index > 0 && (
                  <span className="absolute bottom-1 top-1 left-0 hidden border-l border-dashed border-white/18 md:block" />
                )}
                <Icon className="mx-auto text-[#D6A329] md:mx-0" size={36} strokeWidth={1.7} />
                <h2 className="mt-2 text-[0.74rem] font-extrabold uppercase tracking-[0.09em] text-white">
                  {feature.title}
                </h2>
                <p className="mx-auto mt-2 max-w-[230px] text-[0.82rem] leading-6 text-white/72 md:mx-0">
                  {feature.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[linear-gradient(90deg,#fffdf8_0%,#f8fbff_55%,#eaf5ff_100%)] px-[clamp(1rem,3.8vw,58px)] py-6">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_22rem] lg:items-center">
          <div className="mx-auto grid w-full max-w-[640px] gap-6 sm:grid-cols-2 xl:max-w-none xl:grid-cols-4 xl:gap-0">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="mx-auto grid w-full max-w-[270px] grid-cols-[54px_1fr] items-center justify-start gap-3 text-left sm:max-w-[280px] lg:max-w-none xl:border-r xl:border-[#0A2342]/12 xl:px-5 first:xl:pl-0"
                >
                  <span className="inline-flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-[#071F41] text-[#D6A329]">
                    <Icon size={26} strokeWidth={1.7} />
                  </span>
                  <span>
                    <p className="font-heading text-[2.15rem] font-bold leading-none text-[#C88A18]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[0.82rem] font-bold text-[#0A2342]">
                      {stat.label}
                    </p>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="justify-self-center text-center lg:justify-self-end lg:text-left">
            <p className="font-heading text-2xl font-semibold leading-tight text-[#0A2342] md:text-3xl">
              Your Dream.
              <br />
              Our Guidance.
              <br />
              A Global Future.
            </p>
            <span className="mt-3 block h-1.5 w-36 rounded-full bg-[#C88A18]" />
          </div>
        </div>
      </section>
    </section>
  );
};

export default DreamGlobalHero;
