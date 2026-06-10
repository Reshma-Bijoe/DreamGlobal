import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  MapPinned,
  Phone,
  Sparkles,
} from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-bg.jpg";
import mbbsHeroImage from "@/assets/mbbs3.png";
import {
  countryDestinations,
  getCountryDestination,
} from "@/data/countryDestinations";
import { supabase } from "../../supabaseClient";

type CallbackForm = {
  name: string;
  phone: string;
  email: string;
  interestId: string;
};

type CallbackErrors = Partial<Record<keyof CallbackForm, string>>;
type CallbackProfile = {
  eyebrow: string;
  title: string;
  intro: string;
  urgency: string;
  reasons: string[];
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9\s-]+$/;

const mbbsOption = {
  id: "mbbs",
  name: "MBBS in India & Abroad",
  route: "/mbbs",
  tagline:
    "Compare India and abroad routes, NEET requirements, recognition checks, and realistic options before you apply.",
};

const countryAliases: Record<string, string> = {
  uk: "united-kingdom",
  "united-kingdom": "united-kingdom",
  "united kingdom": "united-kingdom",
  england: "united-kingdom",
};

const callbackProfiles: Record<string, CallbackProfile> = {
  france: {
    eyebrow: "France admissions window",
    title: "France rewards students who prepare early",
    intro:
      "France is not only about choosing a university. It is about matching your course, institution type, scholarship possibility, language comfort, and visa documents before the strongest options move ahead.",
    urgency:
      "If you wait until deadlines are close, you may still apply, but you can lose the time needed to compare programs properly, prepare a stronger file, and secure the intake that genuinely fits your future.",
    reasons: [
      "English-taught programs and scholarship routes need careful shortlisting.",
      "Business, fashion, hospitality, engineering, and arts options fill differently by intake.",
      "Early counselling helps you prepare documents before pressure begins.",
    ],
  },
  italy: {
    eyebrow: "Italy application timing",
    title: "Italy is strongest when your documents are ready before the rush",
    intro:
      "Italy can be a remarkable route for students who want affordable European education, creative programs, public university options, and scholarship possibilities, but timing and documentation matter deeply.",
    urgency:
      "Missing the right window can mean missing regional scholarship consideration, better course choices, or a more affordable pathway. For the right student, that delay can cost far more than one intake.",
    reasons: [
      "Scholarship and public university routes often reward early preparation.",
      "Design, architecture, arts, business, and engineering choices need profile matching.",
      "A guided plan helps avoid last-minute confusion around documents and deadlines.",
    ],
  },
  "united-kingdom": {
    eyebrow: "UK intake planning",
    title: "The UK moves quickly, and good choices go first",
    intro:
      "The UK gives students access to globally recognized degrees, focused one-year master's routes, diverse institutions, and strong academic credibility, but course and intake selection should be deliberate.",
    urgency:
      "If you postpone the conversation, you may lose stronger course availability, scholarship consideration, or enough time to prepare a confident visa file. This is exactly the kind of chance students regret treating casually.",
    reasons: [
      "One-year master's routes need precise university and course comparison.",
      "September and January options vary widely across institutions.",
      "Early action gives more room for offers, deposits, and visa preparation.",
    ],
  },
  ireland: {
    eyebrow: "Ireland opportunity call",
    title: "Ireland is a serious route for career-focused students",
    intro:
      "Ireland works especially well for students looking at technology, business, data, healthcare, engineering, and research in an English-speaking European environment connected to global employers.",
    urgency:
      "A delayed enquiry can narrow your course choices and reduce the time available for a complete application. When the destination fits your career plan, missing the right intake can feel like losing a once-in-a-lifetime opening.",
    reasons: [
      "Tech, finance, life sciences, and business routes need focused shortlisting.",
      "September is competitive, and January options are course-specific.",
      "Early counselling helps connect your academics with realistic program choices.",
    ],
  },
  canada: {
    eyebrow: "Canada counselling priority",
    title: "Canada needs a clear plan, not a rushed application",
    intro:
      "Canada remains attractive for career-oriented diplomas, degrees, postgraduate programs, co-op learning, and multicultural student cities, but the right route depends on your academics, budget, and long-term goals.",
    urgency:
      "If you delay, you may lose better program availability, enough time for financial planning, or the chance to compare colleges and universities properly. A life-changing move deserves more than a last-minute decision.",
    reasons: [
      "Diploma, degree, and postgraduate pathways must be chosen carefully.",
      "Co-op and practical learning options differ by institution and course.",
      "Early profile review helps align intake, budget, documents, and eligibility.",
    ],
  },
  australia: {
    eyebrow: "Australia admissions guidance",
    title: "Australia is ideal when your course choice is practical and precise",
    intro:
      "Australia offers respected universities, practical learning, industry exposure, and diverse programs across business, IT, healthcare, engineering, hospitality, and research.",
    urgency:
      "Waiting too long can limit intake choices, scholarship possibilities, and the time needed to build a strong application. When Australia fits your profile, missing this moment can mean missing a rare turning point.",
    reasons: [
      "February and July intakes need early course and university planning.",
      "Practical learning routes vary across institutions and program levels.",
      "A guided call helps you move from interest to a realistic action plan.",
    ],
  },
  "new-zealand": {
    eyebrow: "New Zealand pathway call",
    title: "New Zealand is best approached with clarity and timing",
    intro:
      "New Zealand suits students looking for supportive campuses, safe cities, practical learning, and strong options in business, IT, healthcare, hospitality, agriculture, and applied sciences.",
    urgency:
      "If you miss the right preparation window, you may lose suitable course starts or the breathing room needed for documents and decisions. For many students, the right New Zealand route is too valuable to leave late.",
    reasons: [
      "February and July intakes need thoughtful preparation.",
      "Smaller destination choices can make early shortlisting more important.",
      "Counselling helps match lifestyle, budget, academics, and career direction.",
    ],
  },
  germany: {
    eyebrow: "Germany profile review",
    title: "Germany demands preparation before ambition can become admission",
    intro:
      "Germany is powerful for students drawn to engineering, IT, applied sciences, management, research, and industry-connected education, but requirements can be exacting.",
    urgency:
      "If you wait, you may miss program deadlines, language preparation time, or the chance to build a stronger academic file. Germany can be a defining opportunity, but only if you respect the preparation it asks for.",
    reasons: [
      "Public university and applied science routes need careful eligibility checks.",
      "Winter and summer intakes have different program availability.",
      "Early counselling helps clarify English-taught options and German-readiness.",
    ],
  },
  spain: {
    eyebrow: "Spain study opportunity",
    title: "Spain opens doors for students who choose with intention",
    intro:
      "Spain is a strong choice for students interested in business, hospitality, tourism, design, management, technology, and a vibrant European study experience.",
    urgency:
      "Leaving the decision too late can limit program availability and reduce time to compare institutions properly. If Spain is the right cultural and academic fit, this is the moment to understand it seriously.",
    reasons: [
      "Business schools and international programs may follow different timelines.",
      "Hospitality, tourism, design, and management routes need course-level clarity.",
      "Early advice helps you compare English-taught options and lifestyle fit.",
    ],
  },
  mbbs: {
    eyebrow: "MBBS counselling priority",
    title: "MBBS decisions should never be made in a panic",
    intro:
      "MBBS in India or abroad is one of the most consequential choices a student can make. You need to compare NEET status, budget, recognition, country rules, university credibility, and long-term practice plans before you commit.",
    urgency:
      "If you wait until seats, documents, or deadlines are already under pressure, you may lose the chance to choose wisely. For a medical career, missing the right guidance at the right time can become a lifetime regret.",
    reasons: [
      "India and abroad options need a realistic comparison, not guesswork.",
      "Recognition, eligibility, and documentation must be checked before applying.",
      "Early counselling protects students from rushed choices and weak-fit universities.",
    ],
  },
};

const optionList = [
  ...countryDestinations.map((country) => ({
    id: country.id,
    name: country.name,
    route: country.route,
    tagline: country.tagline,
  })),
  mbbsOption,
];

const mbbsInterestOptions = [
  {
    id: "mbbs-india",
    name: "MBBS in India",
    route: "/mbbs",
    tagline:
      "Review domestic counselling routes, seat expectations, budget, and backup plans with clearer guidance.",
  },
  {
    id: "mbbs-abroad",
    name: "MBBS Abroad",
    route: "/mbbs",
    tagline:
      "Compare countries, recognition, eligibility, documentation, and university fit before you apply.",
  },
];

const submitOptionList = [...optionList, ...mbbsInterestOptions];

const initialForm: CallbackForm = {
  name: "",
  phone: "",
  email: "",
  interestId: "",
};

const CallbackLanding = () => {
  const { countryId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryCountry = searchParams.get("country") || searchParams.get("interest");
  const rawPreselectedId = countryId || queryCountry || "";
  const preselectedId =
    countryAliases[rawPreselectedId.trim().toLowerCase()] ||
    rawPreselectedId.trim().toLowerCase();
  const matchedCountry = getCountryDestination(preselectedId);
  const matchedOption =
    optionList.find((option) => option.id === preselectedId) ||
    (matchedCountry
      ? {
          id: matchedCountry.id,
          name: matchedCountry.name,
          route: matchedCountry.route,
          tagline: matchedCountry.tagline,
        }
      : undefined);

  const [form, setForm] = useState<CallbackForm>({
    ...initialForm,
    interestId: matchedOption?.id || "",
  });
  const [errors, setErrors] = useState<CallbackErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const selectedOption = useMemo(
    () => submitOptionList.find((option) => option.id === form.interestId),
    [form.interestId]
  );
  const pageOption = matchedOption || selectedOption;
  const pageProfile = pageOption
    ? callbackProfiles[pageOption.id]
    : undefined;
  const isDirectInterestPage = Boolean(matchedOption);
  const isMbbsPage = pageOption?.id === "mbbs";
  const pageTitle =
    pageProfile?.title ||
    (pageOption
      ? `The gateway to ${pageOption.name} is open`
      : "The gateway to your study abroad plan is open");
  const destinationText = pageOption?.name || "your dream destination";
  const learnMoreRoute = pageOption?.route || "/countries";
  const learnMoreLabel = pageOption
    ? pageOption.id === "mbbs"
      ? "Open the MBBS page"
      : `Open the ${pageOption.name} page`
    : "Explore Countries";
  const pageHeroImage = isMbbsPage
    ? mbbsHeroImage
    : matchedCountry?.image || heroImage;

  useEffect(() => {
    setForm((current) => ({
      ...current,
      interestId:
        matchedOption?.id && matchedOption.id !== "mbbs"
          ? matchedOption.id
          : current.interestId,
    }));
  }, [matchedOption?.id]);

  const updateField = (field: keyof CallbackForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setMessage("");
  };

  const validateForm = () => {
    const nextErrors: CallbackErrors = {};
    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();

    if (!name) nextErrors.name = "Please enter your name.";
    if (!phone) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (!phonePattern.test(phone) || phone.replace(/\D/g, "").length !== 10) {
      nextErrors.phone = "Please enter a valid 10 digit phone number.";
    }
    if (!email) {
      nextErrors.email = "Please enter your email.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.interestId) {
      nextErrors.interestId = "Please choose the country or route you want to explore.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitCallback = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    const selected = submitOptionList.find((option) => option.id === form.interestId);
    const interest = selected ? `callback-${selected.id}` : "callback-general";

    setSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      interest,
    });
    setSubmitting(false);

    if (error) {
      console.error("Ad callback request failed:", error);
      setMessage("Sorry, we could not send this right now.");
      return;
    }

    setMessage(`Request sent. Taking you to ${selected?.name || "our destinations"}...`);
    window.setTimeout(() => {
      navigate(selected?.route || "/countries");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="relative overflow-hidden pt-44 sm:pt-48">
          <img
            src={pageHeroImage}
            alt={pageOption?.name || "Study abroad counselling"}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061226]/95 via-[#061226]/78 to-black/35" />

          <div className="container relative z-10 mx-auto grid min-h-[76vh] gap-10 px-4 pb-16 pt-10 text-white lg:grid-cols-[1.05fr_0.8fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-yellow-300/40 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-yellow-300 backdrop-blur">
                <Sparkles size={15} />
                Admissions guidance is open
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                {pageTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
                {pageProfile?.intro ||
                  `Want to explore ${destinationText} in more detail? Share your details and our counsellors will help you understand courses, admission chances, intake timing, documents, and the next step before you lose a good opening.`}
              </p>
              <p className="mt-4 max-w-2xl rounded-lg border border-yellow-300/50 bg-yellow-300/15 px-4 py-4 text-sm font-bold leading-7 text-yellow-50 shadow-lg shadow-black/20 backdrop-blur sm:text-base">
                {pageProfile?.urgency ||
                  "The right intake, course, and document timeline can change quickly. A focused callback now can help you avoid a rushed decision later."}
              </p>

              <div className="mt-8 grid gap-3 text-sm font-semibold text-white/90 sm:grid-cols-3">
                {(pageProfile?.reasons || [
                  "Shortlist smarter",
                  "Know your next intake",
                  "Get a real action plan",
                ]).map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-3 backdrop-blur"
                  >
                    <CheckCircle2 size={17} className="text-yellow-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <form
                onSubmit={submitCallback}
                className="rounded-lg border border-white/20 bg-white p-6 text-slate-950 shadow-2xl shadow-black/25 sm:p-7"
              >
                <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
                  {pageProfile?.eyebrow || "Priority callback"}
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Claim your free counselling call
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {isMbbsPage
                    ? "Choose whether you want to discuss MBBS in India or abroad, then share your details for a focused counselling call."
                    : isDirectInterestPage
                      ? `${destinationText} is already selected for this callback. Share your details and we will call you with the next sensible step.`
                      : "Tell us where you want to go. We will call you, then take you straight to the destination page so you can keep exploring."}
                </p>

                <div className="mt-5 space-y-3">
                  <label className="block">
                    <input
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                      placeholder="Name"
                      autoComplete="name"
                    />
                    {errors.name && (
                      <span className="mt-1 block text-xs text-red-600">
                        {errors.name}
                      </span>
                    )}
                  </label>

                  <label className="block">
                    <input
                      value={form.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                      placeholder="Phone"
                      type="tel"
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <span className="mt-1 block text-xs text-red-600">
                        {errors.phone}
                      </span>
                    )}
                  </label>

                  <label className="block">
                    <input
                      value={form.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                      placeholder="Email"
                      type="email"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span className="mt-1 block text-xs text-red-600">
                        {errors.email}
                      </span>
                    )}
                  </label>

                  {isMbbsPage ? (
                    <label className="block">
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                        MBBS interest
                      </span>
                      <select
                        value={form.interestId}
                        onChange={(event) =>
                          updateField("interestId", event.target.value)
                        }
                        className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                      >
                        <option value="">Choose India or Abroad</option>
                        {mbbsInterestOptions.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      {errors.interestId && (
                        <span className="mt-1 block text-xs text-red-600">
                          {errors.interestId}
                        </span>
                      )}
                    </label>
                  ) : isDirectInterestPage ? (
                    <label className="block">
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Selected interest
                      </span>
                      <input
                        value={pageOption?.name || destinationText}
                        readOnly
                        className="w-full rounded-md border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-semibold text-slate-950 outline-none"
                      />
                    </label>
                  ) : (
                    <label className="block">
                      <select
                        value={form.interestId}
                        onChange={(event) =>
                          updateField("interestId", event.target.value)
                        }
                        className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                      >
                        <option value="">Choose destination</option>
                        {optionList.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      {errors.interestId && (
                        <span className="mt-1 block text-xs text-red-600">
                          {errors.interestId}
                        </span>
                      )}
                    </label>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="gold-gradient-bg mt-5 flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <Phone size={17} />
                  )}
                  {submitting ? "Sending..." : "Book My Callback"}
                </button>

                {message && (
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {message}
                  </p>
                )}
              </form>

              <div className="rounded-lg border border-yellow-300/40 bg-[#061226]/90 p-5 text-white shadow-xl shadow-black/20 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-widest text-yellow-300">
                  Keep researching
                </p>
                <h2 className="mt-2 text-xl font-bold">
                  {pageOption
                    ? `To find more about ${pageOption.name}, go here`
                    : "See all destinations DreamGlobal supports"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  {pageOption?.tagline ||
                    "Compare countries, courses, admission requirements, and the next step before you decide."}
                </p>
                <Link
                  to={learnMoreRoute}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-yellow-300 bg-yellow-50 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-100 sm:w-auto"
                >
                  {learnMoreLabel}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14">
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
            {[
              [
                "Explore deeply",
                "Understand the country, courses, lifestyle, and admission route before you decide.",
              ],
              [
                "Move faster",
                "Get clarity on documents, intake timing, and what should happen next.",
              ],
              [
                "Stay guided",
                "One counsellor-led path from enquiry to shortlist, application, and visa preparation.",
              ],
            ].map(([title, detail]) => (
              <div
                key={title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6"
              >
                <MapPinned size={22} className="text-yellow-600" />
                <h3 className="mt-4 text-xl font-bold text-slate-950">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default CallbackLanding;
