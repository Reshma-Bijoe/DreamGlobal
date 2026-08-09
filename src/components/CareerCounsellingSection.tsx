import { Check, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { counsellingBenefits, roadmapSteps } from "../lib/careerCounsellingData";

const SectionDivider = ({ label }: { label: string }) => (
  <div className="flex items-center justify-start gap-3">
    <span className="h-px w-12 bg-[color:var(--career-primary)]" />
    <span className="h-2 w-2 rounded-full bg-[color:var(--career-primary)]" />
    <p className="career-eyebrow">{label}</p>
    <span className="h-2 w-2 rounded-full bg-[color:var(--career-primary)]" />
    <span className="h-px w-12 bg-[color:var(--career-primary)]" />
  </div>
);

export function CareerCounselling() {
  return (
    <section id="career-counselling" className="relative bg-white/45 py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionDivider label="What We Do" />
          <h2 className="mt-5 font-heading text-3xl font-bold leading-tight text-[color:var(--career-primary-ink)] sm:text-4xl lg:text-5xl">
            We turn career confusion into a clear, personal plan.
          </h2>
          <p className="mt-4 text-lg font-bold text-[color:var(--career-primary-deep)]">
            Discover where your strengths can take you.
          </p>
          <p className="mt-5 text-base font-medium leading-relaxed text-[color:var(--career-primary-ink)]/80">
            With structured career assessments and personalised counselling, we
            help students move from confusion to clarity - whether they are
            choosing a stream, exploring careers or planning their next academic
            step.
          </p>

          <ul className="mt-8 space-y-3.5">
            {counsellingBenefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[color:var(--career-primary-soft)] text-[color:var(--career-primary)]">
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-sm text-[color:var(--career-primary-ink)] sm:text-base">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="career-card rounded-2xl bg-white/95 p-7 sm:p-10">
              <h3 className="text-lg font-semibold text-[color:var(--career-primary-ink)]">
                The student career journey
              </h3>
              <p className="career-copy mt-2 text-sm">
                A structured path from first question to final plan.
              </p>
              <ol className="mt-8 space-y-0">
                {roadmapSteps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[color:var(--career-primary)] text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      {index < roadmapSteps.length - 1 && (
                        <span className="my-1 w-px flex-1 bg-[color:var(--career-border)]" />
                      )}
                    </div>
                    <div className="min-w-0 pb-7">
                      <p className="text-base font-semibold text-[color:var(--career-primary-ink)]">
                        {step}
                      </p>
                      <p className="career-copy mt-1 text-sm">
                        {stepText[index] ?? ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="career-card absolute -top-4 right-4 flex items-center gap-2 rounded-full px-4 py-2.5 sm:right-8">
              <Sparkles className="size-4 shrink-0 text-[color:var(--career-primary)]" />
              <span className="whitespace-nowrap text-xs font-semibold text-[color:var(--career-primary-ink)] sm:text-sm">
                Personalised Career Guidance
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const stepText = [
  "Start with the questions you actually have.",
  "Complete a structured psychometric assessment.",
  "Understand the careers and courses that fit you.",
  "Choose a stream, course or pathway with confidence.",
  "Leave with a practical, personalised roadmap.",
];
