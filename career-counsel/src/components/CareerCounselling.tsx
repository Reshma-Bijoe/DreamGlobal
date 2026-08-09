import { Check, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { counsellingBenefits, roadmapSteps } from "../lib/site-data";

export function CareerCounselling() {
  return (
    <section id="career-counselling" className="bg-transparent py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0e83b6]">
            Career Counselling
          </p>
          <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-[#18324a] sm:text-4xl lg:text-5xl">
            Your career shouldn't be a random choice.
          </h2>
          <p className="mt-4 text-lg font-semibold text-[#0e83b6]">
            Discover where your strengths can take you.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            With structured career assessments and personalised counselling, we
            help students move from confusion to clarity - whether they are
            choosing a stream, exploring careers or planning their next academic
            step.
          </p>

          <ul className="mt-8 space-y-3.5">
            {counsellingBenefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#bdefff] text-[#0e83b6]">
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-sm text-[#18324a] sm:text-base">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="rounded-lg border border-[#b9dff2] bg-white/85 p-7 shadow-xl shadow-[#73c8e8]/20 sm:p-10">
              <h3 className="text-lg font-semibold text-[#18324a]">
                The student career journey
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A structured path from first question to final plan.
              </p>
              <ol className="mt-8 space-y-0">
                {roadmapSteps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#0e83b6] text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      {index < roadmapSteps.length - 1 && (
                        <span className="my-1 w-px flex-1 bg-[#9bdff5]" />
                      )}
                    </div>
                    <div className="min-w-0 pb-7">
                      <p className="text-base font-semibold text-[#18324a]">
                        {step}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {stepText[index] ?? ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="absolute -top-4 right-4 flex items-center gap-2 rounded-full border border-[#b9dff2] bg-white/90 px-4 py-2.5 shadow-sm sm:right-8">
              <Sparkles className="size-4 shrink-0 text-[#0e83b6]" />
              <span className="whitespace-nowrap text-xs font-semibold text-[#18324a] sm:text-sm">
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
