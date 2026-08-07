import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  Compass,
  GraduationCap,
  Map,
  MessageCircle,
  Phone,
  Route,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import DreamGlobalLogo from "@/assets/DreamGlobalLogo.jpeg";

const services = [
  {
    title: "Psychometric Analysis",
    description:
      "Scientific assessment of aptitude, personality, interest, and learning strengths.",
    icon: Brain,
  },
  {
    title: "1 on 1 Career Counselling",
    description:
      "Personal sessions for students and parents to discuss direction with clarity.",
    icon: Users,
  },
  {
    title: "Stream Selection",
    description:
      "Choose Science, Commerce, Humanities, or other pathways with confidence.",
    icon: Compass,
  },
  {
    title: "Career Roadmaps",
    description:
      "Step-by-step plans covering courses, skills, entrance exams, and future goals.",
    icon: Map,
  },
  {
    title: "Study Skills",
    description:
      "Build better focus, memory, planning, exam preparation, and study discipline.",
    icon: BookOpen,
  },
  {
    title: "Learning Style Analysis",
    description:
      "Understand how the student learns best and shape study habits around it.",
    icon: BarChart3,
  },
];

const assessments = [
  {
    label: "Career Analysis",
    title: "Class 2nd to 7th",
    objective: "Discover early strengths, interests, and learning style.",
    href: "https://careertest.edumilestones.com/student-dashboard/suitability-registration/login/NDU1Mg==/as11",
  },
  {
    label: "Career Analysis",
    title: "Class 8th, 9th & 10th",
    objective: "Find the most suitable stream and subject direction.",
    href: "https://careertest.edumilestones.com/student-dashboard/suitability-registration/login/NDU1Mg==/as12",
  },
  {
    label: "Career Analysis",
    title: "Class 11th & 12th",
    objective: "Plan career path, college options, and next academic steps.",
    href: "https://careertest.edumilestones.com/student-dashboard/suitability-registration/login/NDU1Mg==/as13",
  },
  {
    label: "Career Analysis",
    title: "Graduates",
    objective: "Choose the right higher studies, career switch, or job pathway.",
    href: "https://careertest.edumilestones.com/student-dashboard/suitability-registration/login/NDU1Mg==/as14",
  },
];

const highlights = [
  "Scientific psychometric tools",
  "Student and parent counselling",
  "Personalized career direction",
  "Study and learning improvement support",
];

const careerTestUrl =
  "https://careertest.edumilestones.com/student-dashboard/suitability-registration/login/NDU1Mg==/as11-as12-as13-as14-as204-pt15-grd18";

const roadmapSteps = [
  {
    label: "Step 01",
    title: "Student Profile Review",
    description:
      "We begin by understanding the student's academic stage, interests, concerns, study habits, and current decision points.",
  },
  {
    label: "Step 02",
    title: "Psychometric Assessment",
    description:
      "The assessment maps aptitude, personality, interests, learning style, and career suitability using structured tools.",
  },
  {
    label: "Step 03",
    title: "One-to-One Counselling",
    description:
      "A counsellor explains the report, answers questions, and helps the student and parents compare suitable options.",
  },
  {
    label: "Step 04",
    title: "Career Roadmap",
    description:
      "The session ends with a clear plan for stream selection, courses, study actions, skill-building, and next steps.",
  },
];

const CareerCounselling = () => {
  return (
    <div className="min-h-screen bg-[#fbf4e6] text-[#35240e]">
      <header className="sticky top-0 z-40 border-b border-[#e7cf9d] bg-[#fffaf0]/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={DreamGlobalLogo}
              alt="DreamGlobal Logo"
              className="h-11 w-11 rounded-full object-cover"
            />
            <span className="dream-gradient-text text-3xl font-bold">
              DreamGlobal
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-[#705a36] md:flex">
            <a href="#services" className="transition hover:text-[#b88319]">
              Services
            </a>
            <a href="#assessments" className="transition hover:text-[#b88319]">
              Assessments
            </a>
            <a href="#contact" className="transition hover:text-[#b88319]">
              Contact
            </a>
          </nav>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#705a36] transition hover:text-[#b88319]"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>
      </header>

      <main>
        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e7cf9d] bg-[#fffaf0] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#b88319]">
                <Sparkles size={15} />
                Scientific Career Guidance
              </p>
              <h1 className="font-heading text-4xl font-bold leading-tight text-[#35240e] sm:text-5xl md:text-6xl">
                Discover the career path that truly fits you.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#705a36] sm:text-lg">
                DreamGlobal combines psychometric analysis, one-on-one
                counselling, stream selection, career roadmaps, and study-skill
                support to help students make confident decisions.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={careerTestUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-[#c9932f] px-6 py-3 text-sm font-bold text-[#fffaf0] transition hover:bg-[#9b6710]"
                >
                  Take Career Test
                </a>
                <a
                  href="https://wa.me/918848674757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d9bb78] bg-[#fffaf0] px-6 py-3 text-sm font-bold text-[#35240e] transition hover:border-[#c9932f] hover:text-[#b88319]"
                >
                  <MessageCircle size={18} />
                  Book Counselling
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 rounded-lg border border-[#e7cf9d] bg-[#fffaf0] p-4 shadow-sm shadow-[#c79a3e]/10"
                  >
                    <CheckCircle2 size={19} className="text-[#b88319]" />
                    <span className="text-sm font-semibold text-[#705a36]">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-[#e7cf9d] bg-[#fffaf0] p-5 shadow-xl shadow-[#c79a3e]/15">
              <div className="rounded-lg bg-[#35240e] p-6 text-[#fffaf0]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e6bc62]">
                  Roadmap Preview
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold">
                  Let us open the road ahead.
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#ead8b9]">
                  Start from where you are now, follow the right assessment
                  path, and arrive at a practical plan for study, stream, and
                  career decisions.
                </p>
              </div>

              <div className="mt-6 rounded-lg border border-[#e7cf9d] bg-[#fbf4e6] p-5">
                <div className="relative space-y-5 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-px before:bg-[#d9bb78]">
                  {roadmapSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="relative grid grid-cols-[2.5rem_1fr] gap-4"
                    >
                      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#fbf4e6] bg-[#c9932f] font-heading text-sm font-bold text-[#fffaf0] shadow-sm">
                        {index + 1}
                      </div>
                      <div className="rounded-lg border border-[#e7cf9d] bg-[#fffaf0] p-4 shadow-sm shadow-[#c79a3e]/10">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b88319]">
                          {step.label}
                        </p>
                        <h3 className="mt-2 font-heading text-xl font-bold text-[#35240e]">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-[#705a36]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-lg bg-[#35240e] p-5 text-[#fffaf0]">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e6bc62]">
                    Outcome
                  </p>
                  <p className="mt-2 font-heading text-2xl font-bold leading-snug">
                    A practical career plan, not just a report.
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-[#ead8b9] sm:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-[#e6bc62]"
                      />
                      <span>Recommended streams or career directions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-[#e6bc62]"
                      />
                      <span>Course and subject choices to consider</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-[#e6bc62]"
                      />
                      <span>Study-skill and learning-style recommendations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-[#e6bc62]"
                      />
                      <span>Next actions for students and parents</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="px-4 py-16">
          <div className="container mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b88319]">
                What We Offer
              </p>
              <h2 className="font-heading text-3xl font-bold text-[#35240e] sm:text-5xl">
                A complete career guidance ecosystem
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#705a36] sm:text-base">
                Everything a student needs to understand strengths, select the
                right stream, improve study habits, and plan the future.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <div
                    key={service.title}
                    className="rounded-lg border border-[#e7cf9d] bg-[#fffaf0] p-6 shadow-sm shadow-[#c79a3e]/10 transition hover:-translate-y-1 hover:border-[#c9932f] hover:shadow-xl hover:shadow-[#c79a3e]/20"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-[#c9932f] text-[#fffaf0]">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-[#35240e]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#705a36]">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="assessments" className="px-4 py-16">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-lg bg-[#35240e] p-6 text-[#fffaf0] md:p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-[#c9932f]">
                  <Route size={25} />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e6bc62]">
                  Open The Road
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
                  Open the road to your right career now.
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#ead8b9]">
                  Choose the assessment that matches the student stage. Each
                  one starts the path toward stronger clarity and better
                  decisions.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {assessments.map((assessment) => (
                  <a
                    key={assessment.title}
                    href={assessment.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border border-[#e7cf9d] bg-[#fffaf0] p-6 shadow-sm shadow-[#c79a3e]/10 transition hover:-translate-y-1 hover:border-[#c9932f] hover:shadow-xl hover:shadow-[#c79a3e]/20"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b88319]">
                      {assessment.label}
                    </p>
                    <h3 className="mt-3 font-heading text-2xl font-bold text-[#35240e]">
                      {assessment.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#705a36]">
                      {assessment.objective}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#b88319]">
                      Start Assessment
                      <Target
                        size={17}
                        className="transition group-hover:translate-x-1"
                      />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 py-16">
          <div className="container mx-auto max-w-6xl rounded-lg border border-[#e7cf9d] bg-[#fffaf0] p-6 shadow-sm shadow-[#c79a3e]/10 md:p-8">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b88319]">
                  Need Help Choosing?
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold text-[#35240e]">
                  Talk to a counsellor before starting.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#705a36]">
                  We can help you pick the right assessment and counselling
                  path for the student.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                <a
                  href="tel:+918848674757"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#c9932f] px-6 py-3 text-sm font-bold text-[#fffaf0] transition hover:bg-[#9b6710]"
                >
                  <Phone size={18} />
                  Call +91 88486 74757
                </a>
                <a
                  href="https://wa.me/918848674757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d9bb78] px-6 py-3 text-sm font-bold text-[#35240e] transition hover:border-[#c9932f] hover:text-[#b88319]"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e7cf9d] bg-[#fffaf0] px-4 py-8">
        <div className="container mx-auto flex flex-col gap-3 text-sm text-[#705a36] md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-[#35240e]">DreamGlobal</p>
          <p>Career counselling, assessments, and study planning support.</p>
        </div>
      </footer>
    </div>
  );
};

export default CareerCounselling;
