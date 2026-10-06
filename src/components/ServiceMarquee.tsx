type ServiceMarqueeProps = {
  items: string[];
  tone?: "light" | "dark";
  duration?: string;
};

const ServiceMarquee = ({
  items,
  tone = "light",
  duration = "30s",
}: ServiceMarqueeProps) => (
  <section
    className={`overflow-hidden border-y py-4 ${
      tone === "dark"
        ? "border-white/12 bg-[#071F41] text-white"
        : "border-[color:var(--career-border)] bg-white/20 text-[color:var(--career-primary-deep)] backdrop-blur-sm"
    }`}
  >
    <div
      className="flex w-max animate-careerMarquee items-center gap-7 whitespace-nowrap"
      style={{ animationDuration: duration }}
    >
      {[...items, ...items].map((item, index) => (
        <span
          key={`${item}-${index}`}
          className={`inline-flex items-center gap-7 text-sm font-bold uppercase tracking-[0.18em] ${
            tone === "dark" ? "text-white/86" : "text-[color:var(--career-primary-deep)]"
          }`}
        >
          {item}
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--career-primary)]" />
        </span>
      ))}
    </div>
  </section>
);

export default ServiceMarquee;
