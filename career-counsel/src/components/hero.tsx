import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { counsellingBenefits } from "../lib/site-data";

const careerTestUrl =
  "https://careertest.edumilestones.com/student-dashboard/suitability-registration/login/NDU1Mg==/as11-as12-as13-as14-as204-pt15-grd18";

export function Hero() {
  return (
    <section className="pt-28 sm:pt-32 lg:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0e83b6]">
            Career Education Global Opportunities
          </p>
          <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-[#18324a] sm:text-5xl lg:text-6xl">
            Your future deserves more than a guess.
          </h1>
          <p className="mt-5 text-lg font-medium text-[#2b6687] sm:text-xl">
            Discover the right career. Choose the right path. Build a future
            without limits.
          </p>
          <ul className="mt-8 space-y-3">
            {counsellingBenefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#bdefff] text-[#0e83b6]">
                  <Check className="size-3" strokeWidth={2.5} />
                </span>
                <span className="text-sm text-[#18324a] sm:text-base">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
          <a
            href={careerTestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#0e83b6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#09658f]"
          >
            Take the Test
            <ArrowUpRight className="size-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
