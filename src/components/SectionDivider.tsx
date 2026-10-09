type SectionDividerProps = {
  label: string;
  className?: string;
};

const SectionDivider = ({ label, className = "" }: SectionDividerProps) => (
  <div className={`mx-auto flex w-full max-w-[24rem] items-center justify-center gap-2 sm:max-w-[34rem] sm:gap-3 ${className}`}>
    <span aria-hidden="true" className="h-px min-w-6 flex-1 bg-[color:var(--career-primary)]" />
    <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--career-primary)]" />
    <p className="career-eyebrow w-[8.5rem] shrink-0 text-center leading-[1.35] sm:w-auto sm:whitespace-nowrap">{label}</p>
    <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--career-primary)]" />
    <span aria-hidden="true" className="h-px min-w-6 flex-1 bg-[color:var(--career-primary)]" />
  </div>
);

export default SectionDivider;
