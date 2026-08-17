import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Compass,
  GraduationCap,
  Mail,
  MapPinned,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Target,
  UserCheck,
  X,
} from "lucide-react";
import DreamGlobalLogo from "@/assets/DreamGlobalLogo.jpeg";
import founder from "@/assets/founder.jpeg";
import DreamGlobalHero from "@/components/DreamGlobalHero";
import Footer from "@/components/Footer";
import { countryDestinations } from "@/data/countryDestinations";
import { supabase } from "../../supabaseClient";
import {
  CAREER_TEST_URL,
  FOUNDER_NAME,
  WHATSAPP_URL,
  intentOptions,
} from "@/lib/careerCounsellingData";

const STUDENT_PROFILER_URL =
  "https://dreamglobal.edumilestones.com/login/global-admissions/";

const careerResourceLinks = [
  {
    label: "Career Booster",
    href: "https://dreamglobal.edumilestones.com/career-boosters/",
  },
  {
    label: "Career Suitability",
    href: "https://dreamglobal.edumilestones.com/login/suitability#pro_gra",
  },
  {
    label: "Career Library",
    href: "https://dreamglobal.edumilestones.com/global-career-library/",
  },
];

type ConsultationForm = {
  name: string;
  age: string;
  grade: string;
  location: string;
  phone: string;
  email: string;
  intent: string;
  preferredDate: string;
  preferredTime: string;
};

const initialForm: ConsultationForm = {
  name: "",
  age: "",
  grade: "",
  location: "",
  phone: "",
  email: "",
  intent: "Career Counselling",
  preferredDate: "",
  preferredTime: "",
};

const fieldClass = "career-field";

const getNormalizedPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("91")
    ? digits.slice(2)
    : digits;
};

const SectionDivider = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center gap-3">
    <span className="h-px w-12 bg-[color:var(--career-primary)]" />
    <span className="h-2 w-2 rounded-full bg-[color:var(--career-primary)]" />
    <p className="career-eyebrow">{label}</p>
    <span className="h-2 w-2 rounded-full bg-[color:var(--career-primary)]" />
    <span className="h-px w-12 bg-[color:var(--career-primary)]" />
  </div>
);

const pathOptions = [
  {
    title: "Career Counselling",
    eyebrow: "Discover, design, decide",
    description:
      "For students who want to stop guessing and start choosing with self-awareness, scientific insight, and a practical action plan.",
    icon: BriefcaseBusiness,
    points: [
      "Career discovery, planning, and counselling for confident decisions",
      "State-of-the-art psychometric assessments and career profiling",
      "Personalised roadmaps for streams, courses, exams, and milestones",
      "Career coaching, mentoring, leadership, and global mindset development",
      "Future-ready skill guidance for emerging careers in the age of AI",
      "Parent-aligned guidance so important decisions feel calmer at home",
    ],
    actions: [
      {
        label: "Book Free Consultation",
        to: "/book-consultation",
      },
      {
        label: "Take Career Test",
        href: CAREER_TEST_URL,
        external: true,
        primary: true,
      },
      {
        label: "Explore More",
        to: "/career-counselling",
      },
    ],
  },
  {
    title: "Higher Studies & Study Abroad",
    eyebrow: "Profile, shortlist, apply",
    description:
      "For students ready to turn ambition into a strong university plan across India and abroad, with every detail handled clearly.",
    icon: GraduationCap,
    points: [
      "Country, university, and course selection matched to goals and budget",
      "Profile building, portfolio development, SOP, LOR, and essay support",
      "IELTS preparation with application strategy and timeline planning",
      "Scholarship, financial aid, and education-loan guidance",
      "Visa, accommodation, pre-departure, travel booking, and ticketing support",
      "Application follow-up support from shortlisting to final readiness",
    ],
    actions: [
      {
        label: "Book Free Consultation",
        to: "/book-consultation",
      },
      {
        label: "Start Profiling",
        href: STUDENT_PROFILER_URL,
        external: true,
        primary: true,
      },
      {
        label: "Explore Higher Studies",
        to: "/higher-studies",
      },
    ],
  },
];

const storyBlocks = [
  {
    title: "Holistic Student Success",
    icon: Compass,
    text: "We support the complete student journey: confidence, self-awareness, academic direction, family clarity, and long-term professional growth.",
  },
  {
    title: "Career Planning",
    icon: Brain,
    text: "Our specialists help students choose subjects, explore job roles, understand strengths, and set meaningful long-term career goals.",
  },
  {
    title: "Higher Education Guidance",
    icon: Target,
    text: "From undergraduate and postgraduate programs to diplomas and international pathways, we simplify every step with clarity.",
  },
  {
    title: "Outcome-Focused Support",
    icon: UserCheck,
    text: "Every student's success matters deeply to us. Our focus is individual attention and successful outcomes, not volume-driven business.",
  },
];

const guidanceSteps = [
  {
    title: "Understand the student",
    text: "We begin with interests, strengths, aspirations, aptitude, personality, academic context, family expectations, budget, and ambition.",
  },
  {
    title: "Design the pathway",
    text: "Students compare subjects, courses, universities, job roles, global options, future industries, and realistic admission routes.",
  },
  {
    title: "Support every step",
    text: "We provide counselling, mentoring, planning, documentation guidance, and individual attention until the next step is clear.",
  },
];

const founderHighlights = [
  "Chief Career Architect and Global Career Strategist",
  "Former Fortune 100 technology leader",
  "Career mentoring and talent evaluation expertise",
  "International education and student-success specialist",
];

const navItems = [
  { label: "Services", href: "#services" },
];

const companyLinks = [
  { label: "About Us", href: "#about" },
  { label: "Founder", to: "/founder" },
  { label: "Contact Us", to: "/book-consultation" },
];

const Landing = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<
    "career" | "higher" | "main" | null
  >(null);
  const [form, setForm] = useState<ConsultationForm>(initialForm);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        [
          "DreamGlobal free consultation request",
          `Name: ${form.name}`,
          `Age: ${form.age}`,
          `Grade/Class: ${form.grade}`,
          `Location: ${form.location}`,
          `Phone: ${getNormalizedPhone(form.phone) || form.phone}`,
          `Email: ${form.email}`,
          `Intent: ${form.intent}`,
          `Preferred Date: ${form.preferredDate || "Flexible"}`,
          `Preferred Time: ${form.preferredTime || "Flexible"}`,
        ].join("\n")
      ),
    [form]
  );

  const updateField =
    (field: keyof ConsultationForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
      setMessage("");
    };

  const validateForm = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.age.trim()) return "Please enter the student's age.";
    if (!form.grade.trim()) return "Please enter grade or class.";
    if (!form.location.trim()) return "Please enter your location.";

    const age = Number(form.age);
    if (!Number.isInteger(age) || age < 5 || age > 80) {
      return "Please enter a valid age.";
    }

    const phone = getNormalizedPhone(form.phone);
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return "Please enter a valid 10-digit phone number.";
    }

    const email = form.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const sendWhatsAppRequest = () => {
    const validationError = validateForm();

    if (validationError) {
      setMessage(validationError);
      return;
    }

    window.location.href = `${WHATSAPP_URL}?text=${whatsappText}`;
  };

  const openForm = () => {
    setMessage("");
    setIsFormOpen(true);
  };

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const validationError = validateForm();

    if (validationError) {
      setMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    const normalizedPhone = getNormalizedPhone(form.phone);

    const { error } = await supabase.from("leads").insert({
      name: form.name.trim(),
      phone: normalizedPhone,
      email: form.email.trim(),
      interest: [
        `Landing consultation: ${form.intent}`,
        `Age: ${form.age.trim()}`,
        `Grade/Class: ${form.grade.trim()}`,
        `Location: ${form.location.trim()}`,
        `Preferred schedule: ${form.preferredDate || "Flexible date"} ${
          form.preferredTime || "Flexible time"
        }`,
      ].join(" | "),
    });

    setIsSubmitting(false);

    if (error) {
      console.error("Landing consultation request failed:", error);
      setMessage("Sorry, we could not submit this right now.");
      return;
    }

    setForm(initialForm);
    setMessage("Request sent. We will contact you soon.");
  };

  return (
    <div className="career-theme min-h-screen">
      <main className="career-hero-surface relative min-h-screen overflow-hidden">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#0A2342]/10 bg-[linear-gradient(90deg,#fffdf8_0%,#f8fbff_55%,#eaf5ff_100%)] shadow-[0_1px_16px_rgba(10,35,66,0.06)]">
        <div className="border-b border-white/10 bg-secondary py-2 text-white">
          <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-xs font-semibold text-white/80 sm:text-sm md:flex-row md:justify-end md:gap-6">
            <a
              href="mailto:dreamglobalin@gmail.com"
              className="inline-flex items-center gap-2 transition hover:text-[#D6A329]"
            >
              <Mail size={14} className="text-[#D6A329]" />
              dreamglobalin@gmail.com
            </a>
            <a
              href="tel:+918848674757"
              className="inline-flex items-center gap-2 transition hover:text-[#D6A329]"
            >
              <Phone size={14} className="text-[#D6A329]" />
              +91 88486 74757
            </a>
          </div>
        </div>
        <div className="flex h-[72px] w-full items-center gap-3 px-6 md:h-[78px] lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={DreamGlobalLogo}
              alt="DreamGlobal Logo"
              className="h-11 w-11 rounded-full object-cover md:h-12 md:w-12"
            />
            <span className="flex flex-col leading-none">
              <span className="dream-gradient-text text-[1.45rem] font-bold md:text-[1.9rem]">
                DreamGlobal
              </span>
              <span className="dream-gradient-text mt-1 hidden text-[0.62rem] font-extrabold uppercase tracking-[0.08em] sm:block md:text-[0.68rem]">
                Career Counselling & Higher Education Solutions
              </span>
            </span>
          </Link>
          <div className="ml-auto hidden flex-1 items-center justify-end gap-5 text-sm font-semibold text-[#061D3D] lg:flex">
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 whitespace-nowrap transition hover:text-[color:var(--career-primary)]"
              >
                Career Counselling
                <ChevronDown size={15} />
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                <p className="px-4 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-[#C88A18]">
                  Career Counselling
                </p>
                <Link
                  to="/career-counselling"
                  className="block border-b border-slate-100 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-[#D4A24C]/12"
                >
                  Explore Career Counselling
                </Link>
                {careerResourceLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-[#D4A24C]/12"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 whitespace-nowrap transition hover:text-[color:var(--career-primary)]"
              >
                Higher Studies
                <ChevronDown size={15} />
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                <p className="px-4 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-[#C88A18]">
                  Higher Studies
                </p>
                <Link
                  to="/higher-studies"
                  className="block border-b border-slate-100 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-[#D4A24C]/12"
                >
                  Explore Higher Studies
                </Link>
                <Link
                  to="/mbbs"
                  className="block border-b border-slate-100 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-[#D4A24C]/12"
                >
                  MBBS
                </Link>
                <div className="group/countries relative">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between border-b border-slate-100 px-4 py-2 text-left text-sm font-bold text-slate-900 transition hover:bg-[#D4A24C]/12"
                  >
                    Countries
                    <ChevronDown size={15} className="-rotate-90 text-[#C88A18]" />
                  </button>
                  <div className="invisible absolute left-full top-0 z-50 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white py-2 opacity-0 shadow-xl transition group-hover/countries:visible group-hover/countries:opacity-100">
                    <Link
                      to="/countries"
                      className="block border-b border-slate-100 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-[#D4A24C]/12"
                    >
                      All Countries
                    </Link>
                    {countryDestinations.map((country) => (
                      <Link
                        key={country.id}
                        to={country.route}
                        className="block px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-[#D4A24C]/12 hover:text-slate-950"
                      >
                        {country.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 whitespace-nowrap transition hover:text-[color:var(--career-primary)]"
              >
                Company
                <ChevronDown size={15} />
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 overflow-hidden rounded-lg border border-slate-200 bg-white py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                <p className="px-4 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-[#C88A18]">
                  Company
                </p>
                {companyLinks.map((item) =>
                  "to" in item ? (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="block px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-[#D4A24C]/12"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-[#D4A24C]/12"
                    >
                      {item.label}
                    </a>
                  )
                )}
              </div>
            </div>
            {navItems.map((item) =>
              "to" in item ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="whitespace-nowrap transition hover:text-[color:var(--career-primary)]"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="whitespace-nowrap transition hover:text-[color:var(--career-primary)]"
                >
                  {item.label}
                </a>
              )
            )}
          </div>
          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <a
              href={WHATSAPP_URL}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#24C65A] text-white shadow-[0_10px_22px_-12px_rgba(36,198,90,0.85)] transition hover:bg-[#1FB04F]"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={22} />
            </a>
            <Link
              to="/book-consultation"
              className="dream-gold-button hidden h-9 items-center justify-center rounded-md px-4 text-[0.82rem] font-bold shadow-[0_14px_28px_-18px_rgba(200,138,24,0.9)] transition sm:inline-flex"
            >
              Book a Consultation
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen((current) => {
                  if (current) setMobileNavOpen(null);
                  return !current;
                });
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#0A2342]/15 bg-white/70 text-[#0A2342] shadow-sm backdrop-blur transition hover:border-[#C88A18] hover:text-[#C88A18] lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="border-t border-[#0A2342]/10 bg-white/95 px-4 py-4 shadow-[0_18px_36px_-30px_rgba(10,35,66,0.55)] backdrop-blur lg:hidden">
            <nav className="grid gap-2 text-sm font-bold text-[#061D3D]">
              <div className="rounded-md border border-[#0A2342]/10 p-3">
                <button
                  type="button"
                  onClick={() =>
                    setMobileNavOpen((current) =>
                      current === "career" ? null : "career"
                    )
                  }
                  className="flex w-full items-center justify-between font-bold text-[#061D3D]"
                  aria-expanded={mobileNavOpen === "career"}
                >
                  Career Counselling
                  <ChevronDown
                    size={16}
                    className={`transition ${
                      mobileNavOpen === "career" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileNavOpen === "career" && (
                  <div className="mt-2 grid gap-1">
                    <Link
                      to="/career-counselling"
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded px-2 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-[#D4A24C]/12"
                    >
                      Explore Career Counselling
                    </Link>
                    {careerResourceLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded px-2 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-[#D4A24C]/12"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div className="rounded-md border border-[#0A2342]/10 p-3">
                <button
                  type="button"
                  onClick={() =>
                    setMobileNavOpen((current) =>
                      current === "higher" ? null : "higher"
                    )
                  }
                  className="flex w-full items-center justify-between font-bold text-[#061D3D]"
                  aria-expanded={mobileNavOpen === "higher"}
                >
                  Higher Studies
                  <ChevronDown
                    size={16}
                    className={`transition ${
                      mobileNavOpen === "higher" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileNavOpen === "higher" && (
                  <div className="mt-2 grid gap-1">
                    <Link
                      to="/higher-studies"
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded px-2 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-[#D4A24C]/12"
                    >
                      Explore Higher Studies
                    </Link>
                    <Link
                      to="/mbbs"
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded px-2 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-[#D4A24C]/12"
                    >
                      MBBS
                    </Link>
                    <p className="px-2 pt-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#C88A18]">
                      Countries
                    </p>
                    <Link
                      to="/countries"
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded px-2 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-[#D4A24C]/12"
                    >
                      All Countries
                    </Link>
                    {countryDestinations.map((country) => (
                      <Link
                        key={country.id}
                        to={country.route}
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded px-2 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-[#D4A24C]/12"
                      >
                        {country.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="rounded-md border border-[#0A2342]/10 p-3">
                <button
                  type="button"
                  onClick={() =>
                    setMobileNavOpen((current) =>
                      current === "main" ? null : "main"
                    )
                  }
                  className="flex w-full items-center justify-between font-bold text-[#061D3D]"
                  aria-expanded={mobileNavOpen === "main"}
                >
                  Company
                  <ChevronDown
                    size={16}
                    className={`transition ${
                      mobileNavOpen === "main" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileNavOpen === "main" && (
                  <div className="mt-2 grid gap-1">
                    {companyLinks.map((item) =>
                      "to" in item ? (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setIsMenuOpen(false)}
                          className="rounded px-2 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-[#D4A24C]/12"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="rounded px-2 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-[#D4A24C]/12"
                        >
                          {item.label}
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>
              {navItems.map((item) =>
                "to" in item ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md border border-[#0A2342]/10 p-3 font-bold text-[#061D3D] transition hover:bg-[#D4A24C]/12"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md border border-[#0A2342]/10 p-3 font-bold text-[#061D3D] transition hover:bg-[#D4A24C]/12"
                  >
                    {item.label}
                  </a>
                )
              )}
              <Link
                to="/book-consultation"
                onClick={() => setIsMenuOpen(false)}
                className="dream-gold-button mt-2 rounded-md px-3 py-3 text-left transition"
              >
                Book a Consultation
              </Link>
            </nav>
          </div>
        )}
      </header>

      <DreamGlobalHero />

      <section id="services" className="px-4 py-16">
        <div className="container mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <SectionDivider label="Choose Your Path" />
            <h2 className="career-heading mt-4 font-heading text-3xl font-bold sm:text-5xl">
              Two powerful launchpads. One future with direction.
            </h2>
            <p className="career-copy mt-5 text-base leading-8">
              Start where you are: discovering the right career, building your
              education profile, or preparing for admissions in India and
              abroad. Each pathway is built to move you from confusion to a
              confident next step.
            </p>
          </div>

          <div className="mt-10 grid gap-7">
            {pathOptions.map((option) => {
              const Icon = option.icon;

              return (
                <article
                  key={option.title}
                  className="career-card career-gold-card grid gap-7 rounded-2xl p-6 lg:grid-cols-[0.72fr_1fr_16rem] md:p-8"
                >
                  <div>
                    <span className="career-gold-pill inline-flex h-14 w-14 items-center justify-center rounded-lg">
                      <Icon size={26} />
                    </span>
                    <p className="career-eyebrow mt-6">{option.eyebrow}</p>
                    <h3 className="career-heading mt-3 font-heading text-3xl font-bold sm:text-4xl">
                      {option.title}
                    </h3>
                    <p className="career-copy mt-4 text-base leading-7">
                      {option.description}
                    </p>
                  </div>

                  <div>
                    <div className="grid gap-3">
                      {option.points.map((point) => (
                        <div key={point} className="flex items-start gap-3">
                          <CheckCircle2
                            size={19}
                            className="mt-0.5 shrink-0 text-[color:var(--career-primary)]"
                          />
                          <span className="text-sm font-semibold leading-6 text-[color:var(--career-primary-ink)]">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-3 lg:border-l lg:border-[color:var(--career-border)] lg:pl-7">
                    {option.actions.map((action) =>
                      "href" in action ? (
                        <a
                          key={action.label}
                          href={action.href}
                          className="career-primary-button inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition"
                        >
                          {action.label}
                          <ArrowRight size={17} />
                        </a>
                      ) : (
                        <Link
                          key={action.label}
                          to={action.to}
                          className="career-primary-button inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition"
                        >
                          {action.label}
                          {action.label.includes("Consultation") ? (
                            <CalendarCheck size={17} />
                          ) : (
                            <ArrowRight size={17} />
                          )}
                        </Link>
                      )
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="px-4 py-16">
        <div className="container mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl">
            <SectionDivider label="DreamGlobal Purpose" />
            <h2 className="career-heading mt-4 text-center font-heading text-3xl font-bold sm:text-5xl">
              About DreamGlobal
            </h2>
            <p className="career-copy mt-6 text-base leading-8">
              <strong className="text-[color:var(--career-primary-ink)]">
                DreamGlobal
              </strong>{" "}
              was founded with a clear purpose:{" "}
              <strong className="text-[color:var(--career-primary-ink)]">
                to help students discover their true potential, make informed
                career and education decisions, and prepare for success in an
                increasingly dynamic and interconnected world.
              </strong>
            </p>
            <p className="career-copy mt-4 text-base leading-8">
              At DreamGlobal, we provide a comprehensive and structured
              approach to student success through career planning, career
              architecting,{" "}
              <strong className="text-[color:var(--career-primary-ink)]">
                psychometric assessments
              </strong>
              , coaching, mentoring, higher education guidance, and{" "}
              <strong className="text-[color:var(--career-primary-ink)]">
                budget-friendly education solutions abroad and in Indian
                universities.
              </strong>
            </p>
            <div className="career-gold-card mt-7 rounded-2xl border bg-white/85 p-5 text-center shadow-[var(--career-shadow-soft)]">
              <p className="career-eyebrow">Our Mantra</p>
              <p className="mt-3 font-heading text-2xl font-bold leading-tight text-[color:var(--career-primary-ink)]">
                "Transforming Talent and Potential into Success and Prosperity,
                Building Futures Beyond Borders."
              </p>
            </div>
            <p className="career-copy mt-4 text-base leading-8">
              By leveraging best-in-class psychometric assessment tools and
              industry-recognised frameworks, we help students gain deeper
              insights into their interests, personality traits, aptitudes,
              strengths, motivations, and career potential.
            </p>
            <p className="career-copy mt-4 text-base leading-8">
              These insights enable students to make confident and informed
              decisions regarding academic streams, career options, higher
              education pathways, and study-abroad opportunities.
            </p>
            <p className="career-copy mt-4 text-base leading-8">
              Our approach combines scientific assessments, personalised
              counselling, industry insights, global education expertise, and
              real-world mentoring. This helps students build meaningful careers
              aligned with their strengths, aspirations, and future
              opportunities.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="career-card rounded-2xl p-6">
              <p className="career-eyebrow">Our Philosophy</p>
              <h3 className="career-heading mt-3 font-heading text-2xl font-bold">
                Every student has unique talents and untapped potential.
              </h3>
              <p className="career-copy mt-4 text-sm leading-7">
                At DreamGlobal, we believe that every student possesses unique
                talents and untapped potential. When education and career
                decisions are aligned with individual strengths, aspirations,
                and future opportunities, they create a strong foundation for
                prosperity, personal fulfilment, and global leadership.
              </p>
            </article>
            <article className="career-card rounded-2xl p-6">
              <p className="career-eyebrow">Our Mission</p>
              <h3 className="career-heading mt-3 font-heading text-2xl font-bold">
                Confident decisions. Opportunities without borders.
              </h3>
              <p className="career-copy mt-4 text-sm leading-7">
                Our mission is to empower students and families to make
                confident and informed decisions that unlock potential, create
                opportunities, and build futures without borders.
              </p>
            </article>
          </div>

          <div className="mx-auto mt-14 max-w-3xl text-center">
            <SectionDivider label="Services" />
            <h2 className="career-heading mt-4 font-heading text-3xl font-bold sm:text-4xl">
              What We Do
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {storyBlocks.map((block) => {
              const Icon = block.icon;

              return (
                <article key={block.title} className="career-card rounded-2xl p-6">
                  <span className="career-gold-pill inline-flex h-12 w-12 items-center justify-center rounded-lg">
                    <Icon size={22} />
                  </span>
                  <h3 className="career-heading mt-5 font-heading text-2xl font-bold">
                    {block.title}
                  </h3>
                  <p className="career-copy mt-3 text-sm leading-7">
                    {block.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="container mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <SectionDivider label="How We Guide" />
            <h2 className="career-heading mt-4 font-heading text-3xl font-bold sm:text-5xl">
              Clear choices, careful mentoring, stronger outcomes.
            </h2>
            <p className="career-copy mt-5 text-base leading-8">
              We do not hand students a generic list of options. We help them
              understand who they are, what opportunities fit, and how to move
              forward with a plan that feels realistic.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {guidanceSteps.map((step, index) => (
              <article key={step.title} className="career-card rounded-2xl p-6">
                <p className="font-heading text-4xl font-bold text-[color:var(--career-primary)]">
                  0{index + 1}
                </p>
                <h3 className="career-heading mt-4 font-heading text-2xl font-bold">
                  {step.title}
                </h3>
                <p className="career-copy mt-3 text-sm leading-7">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="founder" className="px-4 py-16">
        <div className="career-gold-card container mx-auto grid max-w-7xl gap-10 rounded-2xl border bg-white p-6 shadow-[var(--career-shadow-soft)] md:grid-cols-[0.85fr_1.15fr] md:p-8">
          <div className="career-founder-panel relative min-h-80 overflow-hidden rounded-2xl">
            <img
              src={founder}
              alt={`${FOUNDER_NAME} founder portrait`}
              className="h-full w-full object-contain p-10 sm:p-14"
            />
            <div className="career-gold-pill absolute left-5 top-5 rounded-full px-4 py-2 text-sm font-bold">
              30+ Years Experience
            </div>
            <p className="career-card absolute bottom-5 left-5 right-5 rounded-xl px-4 py-3 text-xs font-bold text-[color:var(--career-primary-ink)]">
              Guiding students across career decisions, Indian universities,
              and global education pathways
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex justify-start">
              <SectionDivider label="Meet The Founder" />
            </div>
            <h2 className="career-heading mt-4 font-heading text-3xl font-bold sm:text-5xl">
              Guidance built on experience, clarity, and student potential.
            </h2>
            <p className="career-copy mt-5 text-base leading-8">
              {FOUNDER_NAME} brings global leadership experience, career
              strategy, psychometric insight, and international education
              expertise into every counselling conversation. The guidance is
              designed to help families think clearly, compare options
              honestly, and choose pathways that match the student's strengths
              and future opportunities.
            </p>
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

      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl rounded-2xl bg-[color:var(--career-primary-ink)] p-8 text-center text-white shadow-xl shadow-[#18324a]/20">
          <MapPinned className="mx-auto text-[color:var(--career-primary)]" size={34} />
          <h2 className="mt-4 font-heading text-3xl font-bold sm:text-5xl">
            Build the future with a plan, not pressure.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/75">
            Our counselling blends scientific assessments, industry insight,
            global education expertise, and real-world mentoring so students can
            choose their next step with confidence. From the first question to
            the final roadmap, DreamGlobal keeps the process personal,
            practical, and outcome-focused.
          </p>
        </div>
      </section>

      <section id="contact" className="px-4 py-16">
        <div className="container mx-auto max-w-6xl rounded-2xl border border-[color:var(--career-border)] bg-white p-6 shadow-[var(--career-shadow-soft)] md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="flex justify-start">
                <SectionDivider label="Start Your Journey" />
              </div>
              <h2 className="career-heading mt-3 font-heading text-3xl font-bold">
                Speak with DreamGlobal today.
              </h2>
              <p className="career-copy mt-3 max-w-2xl text-sm leading-6">
                Get help choosing the right career path, course, country,
                university, and admission plan. Start with one conversation and
                leave with a clearer direction.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+918848674757"
                className="career-primary-button inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition"
              >
                <Phone size={18} />
                Call Now
              </a>
              <a
                href={WHATSAPP_URL}
                className="career-primary-button inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <Link
                to="/book-consultation"
                className="career-primary-button inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition"
              >
                <CalendarCheck size={18} />
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/*
      {isFormOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[color:var(--career-primary-ink)]/55 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="landing-consultation-title"
        >
          <div className="career-card max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-5 md:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="career-eyebrow">Book Free Consultation</p>
                <h2
                  id="landing-consultation-title"
                  className="career-heading mt-2 font-heading text-2xl font-bold sm:text-3xl"
                >
                  Tell us what you want to plan.
                </h2>
                <p className="career-copy mt-2 text-sm leading-6">
                  Share your details and we will contact you to confirm the
                  next step.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[color:var(--career-border)] bg-white text-[color:var(--career-primary-ink)] transition hover:text-[color:var(--career-primary)]"
                aria-label="Close consultation form"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submitRequest}>
              <div className="grid gap-4 md:grid-cols-2">
                <input className={fieldClass} placeholder="Name" required value={form.name} onChange={updateField("name")} />
                <input className={fieldClass} placeholder="Age" type="number" min="5" max="80" required value={form.age} onChange={updateField("age")} />
                <input className={fieldClass} placeholder="Grade/Class" required value={form.grade} onChange={updateField("grade")} />
                <input className={fieldClass} placeholder="Location" required value={form.location} onChange={updateField("location")} />
                <input className={fieldClass} placeholder="10-digit Phone Number" type="tel" inputMode="tel" autoComplete="tel" required value={form.phone} onChange={updateField("phone")} />
                <input className={fieldClass} placeholder="Email" type="email" autoComplete="email" required value={form.email} onChange={updateField("email")} />
                <select className={fieldClass} value={form.intent} onChange={updateField("intent")}>
                  {intentOptions.map((intent) => (
                    <option key={intent} value={intent}>
                      {intent}
                    </option>
                  ))}
                </select>
                <div className="md:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--career-primary-deep)]">
                    Scheduling preference optional
                  </p>
                  <p className="career-copy mt-1 text-xs leading-5">
                    Pick a date or time only if you already have a preferred
                    slot for the consultation.
                  </p>
                </div>
                <label className="grid gap-2 text-sm font-semibold text-[color:var(--career-primary-ink)]">
                  Preferred consultation date
                  <input className={fieldClass} type="date" value={form.preferredDate} onChange={updateField("preferredDate")} />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[color:var(--career-primary-ink)]">
                  Preferred consultation time
                  <input className={fieldClass} type="time" value={form.preferredTime} onChange={updateField("preferredTime")} />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={sendWhatsAppRequest}
                  className="career-primary-button inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition"
                >
                  <MessageCircle size={17} />
                  Send via WhatsApp
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="career-primary-button inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition disabled:opacity-60"
                >
                  <Send size={17} />
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
              {message && (
                <p className="mt-4 text-sm font-semibold text-[color:var(--career-primary-deep)]">
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
      */}
      </main>
    </div>
  );
};

export default Landing;
