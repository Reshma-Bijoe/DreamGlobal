import { Link } from "react-router-dom";
import { ArrowRight, Award, BriefcaseBusiness, Check, GraduationCap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DreamGlobalLogo from "../assets/founder.jpeg";
import {
  FOUNDER_NAME,
  expertiseAreas,
  founderStats,
} from "../lib/careerCounsellingData";

const Founder = () => {
  return (
    <div className="career-theme min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="career-hero-surface relative isolate overflow-x-hidden pt-36 md:pt-40">
        <section className="px-4 py-16">
          <div className="container mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="career-eyebrow">
                About The Counsellor
              </p>
              <h1 className="career-heading mt-5 font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Meet {FOUNDER_NAME}
              </h1>
              <p className="mt-4 max-w-3xl text-lg font-semibold leading-7 text-[color:var(--career-primary-deep)]">
                Chief Career Architect | Global Career Strategist | Former
                Fortune 100 Technology Leader | International Education
                Specialist
              </p>
              <p className="career-copy mt-5 max-w-2xl text-base leading-8 sm:text-lg">
                {FOUNDER_NAME} helps students and parents make informed career
                and higher education decisions aligned with individual
                strengths, aspirations, future opportunities, and long-term
                success.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {founderStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="career-card rounded-2xl p-5"
                  >
                    <p className="font-heading text-3xl font-bold text-[color:var(--career-primary)]">
                      {stat.value}
                    </p>
                    <p className="career-copy mt-1 text-xs font-bold uppercase tracking-[0.14em]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="career-founder-panel relative min-w-0 overflow-hidden rounded-2xl shadow-[var(--career-shadow-soft)]"
            >
              <img
                src={DreamGlobalLogo}
                alt={`${FOUNDER_NAME} profile placeholder`}
                className="aspect-[4/5] w-full max-w-full object-contain p-8 sm:p-12 lg:p-16"
              />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--career-primary-ink)] px-4 py-2 text-sm font-bold text-white">
                <Sparkles size={15} />
                30+ Years Experience
              </div>
              <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/95 p-4 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[color:var(--career-primary)]">
                  Founder
                </p>
                <p className="mt-1 font-heading text-2xl font-bold text-[color:var(--career-primary-ink)]">
                  {FOUNDER_NAME}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
            <InfoBlock
              title="Global Experience, Student-Focused Guidance"
              text="With three decades across global technology leadership, academic collaboration, career mentoring, and international education, Mr. Bijoe brings real industry insight into every counselling conversation."
            />
            <InfoBlock
              title="Career Decisions With Clarity"
              text="His guidance goes beyond conventional counselling by helping students understand their potential, compare practical pathways, and make future-ready decisions with confidence."
            />
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            <CredentialBlock
              icon={Award}
              title="Professional Certifications"
              items={[
                "Certified Career Counsellor (CCA)",
                "ICCC-UK Licensed Career Development Professional",
                "Certified International Education Counsellor & Specialist",
                "Project Management Professional (PMP)",
                "Google AI Leadership Certified",
              ]}
            />
            <CredentialBlock
              icon={GraduationCap}
              title="Academic Credentials"
              items={[
                "M.Tech in Digital Electronics",
                "B.Tech - University Rank Holder",
                "Academic and industry collaboration experience",
              ]}
            />
            <CredentialBlock
              icon={BriefcaseBusiness}
              title="Leadership Experience"
              items={[
                "25 years with Tata Consultancy Services",
                "Senior e-commerce consultant for a Fortune 100 company",
                "Global software delivery and business relationship leadership",
              ]}
            />
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-7xl">
            <p className="career-eyebrow">
              Areas of Expertise
            </p>
            <h2 className="career-heading mt-4 font-heading text-3xl font-bold sm:text-5xl">
              Practical guidance across every key decision.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {expertiseAreas.map((area) => (
                <div
                  key={area}
                  className="career-card flex items-center gap-3 rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--career-shadow-float)]"
                >
                  <Check size={18} className="text-[color:var(--career-primary)]" />
                  <span className="font-semibold text-[color:var(--career-primary-ink)]">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="career-card container mx-auto max-w-5xl rounded-2xl p-8">
            <p className="career-eyebrow">
              Counselling Philosophy
            </p>
            <h2 className="career-heading mt-4 font-heading text-3xl font-bold sm:text-5xl">
              Every student has distinctive strengths and untapped potential.
            </h2>
            <p className="career-copy mt-5 text-base leading-8">
              Mr. Bijoe believes the right education and career choices should be
              aligned with a student's abilities, aspirations, personality, and
              the opportunities shaping tomorrow's world. His approach helps
              parents feel informed and students feel inspired to move forward.
            </p>
            <blockquote className="mt-6 border-l-4 border-[color:var(--career-primary)] pl-5 text-base font-semibold leading-8 text-[color:var(--career-primary-ink)]">
              When career and education choices are aligned with individual
              strengths and future opportunities, they create the foundation
              for fulfilment, prosperity, and global leadership.
            </blockquote>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-5xl rounded-2xl bg-[color:var(--career-primary-ink)] p-8 text-center text-white shadow-xl shadow-[#18324a]/20">
            <h2 className="font-heading text-3xl font-bold sm:text-5xl">
              Ready to Find Your Direction?
            </h2>
            <Link
              to="/career-counselling#counselling-form"
              className="career-primary-button mt-7 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition"
            >
              Book Free Counselling
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const InfoBlock = ({ title, text }: { title: string; text: string }) => (
  <div className="career-card rounded-2xl p-7">
    <h2 className="career-heading font-heading text-3xl font-bold">
      {title}
    </h2>
    <p className="career-copy mt-4 text-base leading-8">{text}</p>
  </div>
);

const CredentialBlock = ({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Award;
  title: string;
  items: string[];
}) => (
  <div className="career-card rounded-2xl p-7">
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--career-primary-soft)] text-[color:var(--career-primary)]">
      <Icon size={22} />
    </span>
    <h2 className="career-heading mt-5 font-heading text-2xl font-bold">
      {title}
    </h2>
    <div className="mt-5 space-y-3">
      {items.map((item) => (
        <div key={item} className="flex gap-3">
          <Check
            size={17}
            className="mt-0.5 shrink-0 text-[color:var(--career-primary)]"
          />
          <span className="text-sm leading-6 text-[color:var(--career-primary-ink)]">
            {item}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default Founder;
