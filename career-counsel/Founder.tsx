import { Link } from "react-router-dom";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import DreamGlobalLogo from "../src/assets/DreamGlobalLogo.jpeg";
import {
  FOUNDER_NAME,
  expertiseAreas,
  founderStats,
} from "./src/lib/site-data";

const Founder = () => {
  return (
    <div className="min-h-screen bg-white text-[#18324a]">
      <Navbar />

      <main className="bg-gradient-to-b from-[#d8f3ff] via-[#f4fcff] to-white pt-36 md:pt-40">
        <section className="px-4 py-16">
          <div className="container mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0e83b6]">
                Founder Profile
              </p>
              <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-[#18324a] sm:text-5xl lg:text-6xl">
                Guidance from a Trusted Mentor
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#41647b] sm:text-lg">
                For more than two decades, Sudarshan has helped students
                discover their strengths, understand their possibilities and
                make confident decisions about education and careers.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {founderStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-[#b9dff2] bg-white/85 p-5 shadow-sm shadow-[#73c8e8]/20"
                  >
                    <p className="font-heading text-3xl font-bold text-[#0e83b6]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#41647b]">
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
              className="relative overflow-hidden rounded-lg border border-white/70 bg-white shadow-2xl shadow-[#65bfe5]/25"
            >
              <img
                src={DreamGlobalLogo}
                alt={`${FOUNDER_NAME} profile placeholder`}
                className="aspect-[4/5] w-full object-contain p-16"
              />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#18324a] px-4 py-2 text-sm font-bold text-white">
                <Sparkles size={15} />
                25+ Years Experience
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
            <InfoBlock
              title="The Journey"
              text="Sudarshan Sonawane has worked closely with students and families across different academic stages, helping them understand options, compare pathways, and make decisions with confidence."
            />
            <InfoBlock
              title="The Philosophy"
              text="Career decisions should be based on the individual student, not simply on trends. The right guidance starts by understanding strengths, interests, learning style, and long-term aspirations."
            />
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0e83b6]">
              Areas of Expertise
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#18324a] sm:text-5xl">
              Practical guidance across every key decision.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {expertiseAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-3 rounded-lg border border-[#b9dff2] bg-white p-5 shadow-sm shadow-[#73c8e8]/15"
                >
                  <Check size={18} className="text-[#0e83b6]" />
                  <span className="font-semibold text-[#18324a]">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-5xl rounded-lg border border-[#b9dff2] bg-white p-8 shadow-xl shadow-[#73c8e8]/15">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0e83b6]">
              A Mentor Beyond The Classroom
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#18324a] sm:text-5xl">
              Support that helps families decide together.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#41647b]">
              His approach combines assessment, conversation, and practical
              planning so students feel heard and parents feel confident about
              the road ahead.
            </p>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-5xl rounded-lg bg-[#18324a] p-8 text-center text-white shadow-xl shadow-[#18324a]/20">
            <h2 className="font-heading text-3xl font-bold sm:text-5xl">
              Ready to Find Your Direction?
            </h2>
            <Link
              to="/career-counselling#counselling-form"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#0e83b6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#30a6d5]"
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
  <div className="rounded-lg border border-[#b9dff2] bg-white p-7 shadow-xl shadow-[#73c8e8]/15">
    <h2 className="font-heading text-3xl font-bold text-[#18324a]">
      {title}
    </h2>
    <p className="mt-4 text-base leading-8 text-[#41647b]">{text}</p>
  </div>
);

export default Founder;
