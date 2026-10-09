import { ArrowDown, ArrowRight, Compass, Layers3 } from "lucide-react";
import type { BlogVisual } from "@/data/blogVisuals";

const BlogDiagram = ({ visual }: { visual: BlogVisual }) => (
  <figure className="my-10 rounded-2xl border border-[#d9e7e9] bg-[#eef8f7] p-5 sm:p-7">
    <p className="career-eyebrow">The idea at a glance</p>
    <h3 className="career-heading mt-2 font-heading text-2xl font-semibold">{visual.diagramTitle}</h3>
    {visual.diagramKind === "funding" ? (
      <div className="mt-6 space-y-5">
        <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#183a51]">
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-[#173c54]" />Cost remaining</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-[#dba626]" />Scholarship</span>
        </div>
        {[{ name: "Programme A", total: 20, award: 5 }, { name: "Programme B", total: 14, award: 2 }].map((option) => (
          <div key={option.name}>
            <div className="mb-2 flex flex-wrap justify-between gap-1 text-sm text-[#183a51]">
              <span className="font-bold">{option.name}</span>
              <span>{option.total} total − {option.award} award = <strong>{option.total - option.award} remaining</strong></span>
            </div>
            <div className="flex h-9 overflow-hidden rounded-lg" style={{ width: `${option.total / 20 * 100}%` }} aria-hidden="true">
              <span className="bg-[#173c54]" style={{ width: `${(option.total - option.award) / option.total * 100}%` }} />
              <span className="bg-[#dba626]" style={{ width: `${option.award / option.total * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    ) : visual.diagramKind === "assessment" ? (
      <div className="mt-6">
        <ul className="grid gap-3 sm:grid-cols-2">
          {visual.steps.map((step) => (
            <li key={step.title} className="rounded-xl border border-[#d9e7e9] bg-white p-4">
              <Layers3 size={20} aria-hidden="true" className="mb-2 text-[#a97510]" />
              <p className="font-bold text-[#173c54]">{step.title}</p>
              <p className="mt-1 text-sm leading-6 text-[#435568]">{step.detail}</p>
            </li>
          ))}
        </ul>
        <ArrowDown aria-hidden="true" className="mx-auto my-3 text-[#a97510]" />
        <div className="flex items-center justify-center gap-3 rounded-xl bg-[#173c54] px-4 py-4 text-center font-semibold text-white">
          <Compass size={22} aria-hidden="true" />A flexible career exploration plan
        </div>
      </div>
    ) : (
      <ol className="mt-6 grid gap-3 sm:grid-cols-2">
        {visual.steps.map((step, index) => (
          <li key={step.title} className="relative rounded-xl border border-[#d9e7e9] bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f6e8bf] text-sm font-bold text-[#78530b]">{index + 1}</span>
              {index < visual.steps.length - 1 && <ArrowRight size={19} aria-hidden="true" className="text-[#b08422]" />}
            </div>
            <p className="mt-3 font-bold text-[#173c54]">{step.title}</p>
            <p className="mt-1 text-sm leading-6 text-[#435568]">{step.detail}</p>
          </li>
        ))}
      </ol>
    )}
    <figcaption className="mt-5 text-sm leading-6 text-[#435568]">{visual.diagramNote}</figcaption>
  </figure>
);

export default BlogDiagram;
