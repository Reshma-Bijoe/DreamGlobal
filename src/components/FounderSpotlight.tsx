import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import founder from "@/assets/founder.jpeg";
import {
  FOUNDER_NAME,
  founderHighlights,
} from "@/lib/careerCounsellingData";

type FounderSpotlightProps = {
  label?: string;
  title?: string;
  copy?: string;
  note?: string;
};

const SectionDivider = ({ label }: { label: string }) => (
  <div className="flex items-center justify-start gap-3">
    <span className="h-px w-12 bg-[color:var(--career-primary)]" />
    <span className="h-2 w-2 rounded-full bg-[color:var(--career-primary)]" />
    <p className="career-eyebrow">{label}</p>
    <span className="h-2 w-2 rounded-full bg-[color:var(--career-primary)]" />
    <span className="h-px w-12 bg-[color:var(--career-primary)]" />
  </div>
);

const FounderSpotlight = ({
  label = "Meet The Founder",
  title = "Guidance built on experience, clarity, and student potential.",
  copy = `${FOUNDER_NAME} brings global leadership experience, career strategy, psychometric insight, and international education expertise into every counselling conversation.`,
  note = "Certified guidance for career decisions, Indian admissions, and global education pathways",
}: FounderSpotlightProps) => (
  <section className="px-4 py-16">
    <div className="career-gold-card container mx-auto grid max-w-7xl gap-10 rounded-2xl border bg-white/74 p-6 shadow-[var(--career-shadow-soft)] backdrop-blur-md md:grid-cols-[0.85fr_1.15fr] md:p-8">
      <div className="career-founder-panel relative min-h-80 overflow-hidden rounded-2xl">
        <img
          src={founder}
          alt={`${FOUNDER_NAME} founder portrait`}
          className="h-full w-full object-contain px-5 py-20 sm:px-7 sm:py-24"
        />
        <div className="career-gold-pill absolute left-5 top-5 rounded-full px-4 py-2 text-sm font-bold">
          30+ Years Experience
        </div>
        <p className="career-card absolute bottom-10 left-5 right-5 rounded-xl px-4 py-3 text-xs font-bold text-[color:var(--career-primary-ink)]">
          {note}
        </p>
      </div>

      <div className="flex flex-col justify-center">
        <SectionDivider label={label} />
        <h2 className="career-heading mt-4 font-heading text-3xl font-bold sm:text-5xl">
          {title}
        </h2>
        <p className="career-copy mt-5 text-base leading-8">{copy}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {founderHighlights.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2
                size={18}
                className="shrink-0 text-[color:var(--career-primary)]"
              />
              <span className="text-sm font-semibold text-[color:var(--career-primary-ink)]">
                {item}
              </span>
            </div>
          ))}
        </div>
        <Link
          to="/founder"
          className="career-primary-button mt-7 inline-flex w-fit items-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition"
        >
          Explore Founder
          <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  </section>
);

export default FounderSpotlight;
