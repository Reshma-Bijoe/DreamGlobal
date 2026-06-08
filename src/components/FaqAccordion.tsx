import { Plus } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  variant?: "default" | "country";
};

const FaqAccordion = ({ items, variant = "default" }: FaqAccordionProps) => {
  const isCountry = variant === "country";

  return (
    <div className="grid gap-3">
      {items.map((faq) => (
        <details
          key={faq.question}
          className={`group rounded-lg border bg-card shadow-sm ${
            isCountry ? "border-slate-200 bg-white" : "border-border"
          }`}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
            <span
              className={`font-heading text-lg font-semibold leading-snug ${
                isCountry ? "text-slate-950" : "text-foreground"
              }`}
            >
              {faq.question}
            </span>
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition group-open:rotate-45 ${
                isCountry
                  ? "border-yellow-300 bg-yellow-50 text-yellow-700"
                  : "border-primary/30 bg-primary/10 text-primary"
              }`}
            >
              <Plus size={17} />
            </span>
          </summary>
          <div
            className={`px-5 pb-5 text-sm leading-7 ${
              isCountry ? "text-slate-700" : "text-muted-foreground"
            }`}
          >
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
};

export default FaqAccordion;
