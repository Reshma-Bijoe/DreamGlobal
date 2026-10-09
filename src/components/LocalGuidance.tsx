import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { DREAMGLOBAL_ADDRESS } from "@/components/LocationMap";
import SectionDivider from "@/components/SectionDivider";

const LocalGuidance = ({ focus = "both" }: { focus?: "both" | "study" | "career" }) => (
  <section className="px-4 py-12" aria-labelledby="local-guidance-heading">
    <div className="container mx-auto max-w-6xl">
      <SectionDivider label="Guidance close to home" />
      <h2 id="local-guidance-heading" className="career-heading mt-4 text-center font-heading text-3xl font-bold sm:text-4xl">
        {focus === "study" ? "Study abroad guidance in Aluva, Kerala" : focus === "career" ? "Career counselling in Aluva, Kerala" : "Study abroad and career counselling in Aluva"}
      </h2>
      <p className="career-copy mx-auto mt-4 max-w-3xl text-center text-base leading-7">
        DreamGlobal is based in Aluva, Ernakulam. Speak with our team about your
        education and career plans, whether you are in Aluva, Kochi, Angamaly,
        Kalamassery, or another part of Kerala.
      </p>
      <div className={`mt-7 grid gap-5 ${focus === "both" ? "md:grid-cols-2" : "mx-auto max-w-3xl"}`}>
        {focus !== "career" && (
          <div className="career-card rounded-2xl p-6">
            <h3 className="career-heading font-heading text-2xl font-semibold">Study abroad consultants: what we help you plan</h3>
            <p className="career-copy mt-3 text-sm leading-7">Compare courses and universities, build your profile, prepare applications and documents, and explore scholarships and education loans. Our guidance also covers pre-departure planning, travel, and ticketing. If studying in India suits your goals, discuss campus admissions and online degree options with us.</p>
            <Link to={focus === "study" ? "/countries" : "/higher-studies"} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[color:var(--career-primary-deep)]">{focus === "study" ? "Compare study abroad destinations" : "Explore study abroad guidance"}<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        )}
        {focus !== "study" && (
          <div className="career-card rounded-2xl p-6">
            <h3 className="career-heading font-heading text-2xl font-semibold">Career guidance for students and professionals</h3>
            <p className="career-copy mt-3 text-sm leading-7">School students can explore subject and stream selection, college students can compare courses and career pathways, and working professionals can plan development or a new direction. Psychometric analysis, aptitude and interest assessments, mentoring, and skill development help turn your questions into practical next steps.</p>
            <Link to={focus === "career" ? "/book-consultation" : "/career-counselling"} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[color:var(--career-primary-deep)]">{focus === "career" ? "Book a career guidance conversation" : "Explore career counselling and assessments"}<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        )}
      </div>
      <div className="mx-auto mt-6 flex max-w-3xl items-start justify-center gap-3 rounded-xl bg-white/70 p-4">
        <MapPin size={21} aria-hidden="true" className="mt-1 shrink-0 text-[color:var(--career-primary-deep)]" />
        <div className="text-sm leading-6"><p className="career-heading font-semibold">Looking for guidance near you? Visit DreamGlobal in Aluva.</p><p className="career-copy mt-1">{DREAMGLOBAL_ADDRESS}</p><a href="tel:+918848674757" className="mt-2 inline-block font-semibold text-[color:var(--career-primary-deep)]">Call +91 88486 74757 to arrange a conversation</a></div>
      </div>
    </div>
  </section>
);

export default LocalGuidance;
