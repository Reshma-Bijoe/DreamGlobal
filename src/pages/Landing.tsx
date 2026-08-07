import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";
import DreamGlobalLogo from "@/assets/DreamGlobalLogo.jpeg";

const options = [
  {
    title: "Career Counselling",
    description: "Find a course and career path that fits your strengths.",
    href: "https://careertest.edumilestones.com/student-dashboard/suitability-registration/login/NDU1Mg==/as11-as12-as13-as14-as204-pt15-grd18",
    icon: BriefcaseBusiness,
  },
  {
    title: "Higher Studies & Abroad Education",
    description: "Explore universities, admissions, visas, and study-abroad options.",
    to: "/higher-studies",
    icon: GraduationCap,
  },
];

const stats = [
  { value: "1:1", label: "Guidance" },
  { value: "360°", label: "Planning" },
  { value: "Global", label: "Study Support" },
  { value: "Clear", label: "Career Path" },
];

const badges = [
  "Career Clarity",
  "Higher Studies",
  "Abroad Education",
  "Student Support",
];

const careerTestUrl =
  "https://careertest.edumilestones.com/student-dashboard/suitability-registration/login/NDU1Mg==/as11-as12-as13-as14-as204-pt15-grd18";

const Landing = () => {
  return (
    <main className="min-h-screen bg-[#fbf4e6] text-[#35240e]">
      <header className="border-b border-[#e7cf9d] bg-[#fffaf0]/90">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={DreamGlobalLogo}
              alt="DreamGlobal Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="dream-gradient-text text-3xl font-bold">
              DreamGlobal
            </span>
          </Link>
          <div className="hidden items-center gap-6 text-sm font-semibold text-[#705a36] md:flex">
            <a href="#services" className="transition hover:text-[#b88319]">
              Services
            </a>
            <a href="#founder" className="transition hover:text-[#b88319]">
              Founder
            </a>
            <a href="#contact" className="transition hover:text-[#b88319]">
              Contact
            </a>
          </div>
          <a
            href="tel:+918848674757"
            className="hidden rounded-md bg-[#c9932f] px-4 py-2 text-sm font-bold text-[#fffaf0] transition hover:bg-[#9b6710] sm:inline-flex"
          >
            Call Now
          </a>
        </div>
      </header>

      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e7cf9d] bg-[#fffaf0] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#b88319]">
              <Sparkles size={15} />
              Career Guidance & Global Education
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight text-[#35240e] sm:text-5xl md:text-6xl">
              Discover the right path for your future.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#705a36] sm:text-lg">
              DreamGlobal helps students and families choose between career
              counselling, higher studies, and abroad education with clear,
              personal guidance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={careerTestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-[#c9932f] px-6 py-3 text-sm font-bold text-[#fffaf0] transition hover:bg-[#9b6710]"
              >
                Start Career Counselling
              </a>
              <Link
                to="/higher-studies"
                className="inline-flex items-center justify-center rounded-md bg-[#c9932f] px-6 py-3 text-sm font-bold text-[#fffaf0] transition hover:bg-[#9b6710]"
              >
                Explore Higher Studies
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-[#e7cf9d] bg-[#fffaf0] p-4 text-center shadow-sm shadow-[#c79a3e]/10"
                >
                  <div className="font-heading text-2xl font-bold text-[#b88319]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#705a36]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b88319]">
              Choose Your Path
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#35240e] sm:text-5xl">
              Two focused ways to begin
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
            {options.map((option) => {
              const Icon = option.icon;

              return (
                <a
                  key={option.title}
                  href={"href" in option ? option.href : option.to}
                  target={"href" in option ? "_blank" : undefined}
                  rel={"href" in option ? "noopener noreferrer" : undefined}
                  className="group rounded-lg border border-[#e7cf9d] bg-[#fffaf0] p-7 shadow-sm shadow-[#c79a3e]/10 transition hover:-translate-y-1 hover:border-[#c9932f] hover:shadow-xl hover:shadow-[#c79a3e]/20"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-[#c9932f] text-[#fffaf0] transition group-hover:bg-[#9b6710]">
                    <Icon size={24} />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-[#35240e]">
                    {option.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#705a36]">
                    {option.description}
                  </p>
                  <span className="mt-6 inline-flex text-sm font-semibold text-[#b88319]">
                    Continue
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="founder" className="px-4 py-16">
        <div className="container mx-auto grid max-w-6xl gap-10 rounded-lg border border-[#e7cf9d] bg-[#fffaf0] p-6 shadow-sm shadow-[#c79a3e]/10 md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div className="flex min-h-80 items-center justify-center rounded-lg border-2 border-dashed border-[#d9bb78] bg-[#f7ead0] text-center">
            <div className="px-6">
              <Users className="mx-auto mb-4 text-[#b88319]" size={42} />
              <p className="font-heading text-2xl font-bold text-[#35240e]">
                Founder Photo
              </p>
              <p className="mt-2 text-sm text-[#705a36]">
                Replace this space with the founder image.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b88319]">
              Meet The Founder
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[#35240e] sm:text-4xl">
              Guidance built on trust, clarity, and personal attention.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#705a36]">
              Add a short founder introduction here: experience, mission, and
              how DreamGlobal supports students in making confident education
              and career decisions.
            </p>
            <div className="mt-6 grid gap-3">
              {badges.map((badge) => (
                <div key={badge} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#b88319]" />
                  <span className="text-sm font-semibold text-[#705a36]">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 py-16">
        <div className="container mx-auto max-w-6xl rounded-lg bg-[#35240e] p-6 text-[#fffaf0] md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e6bc62]">
                Start Your Journey
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold">
                Speak with DreamGlobal today.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#ead8b9]">
                Get help choosing the right career path, course, country, and
                admission plan.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+918848674757"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#c9932f] px-6 py-3 text-sm font-bold text-[#fffaf0] transition hover:bg-[#e0ad49]"
              >
                <Phone size={18} />
                Call Now
              </a>
              <a
                href="https://wa.me/918848674757"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d9bb78] px-6 py-3 text-sm font-bold text-[#fffaf0] transition hover:bg-[#fffaf0] hover:text-[#35240e]"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
