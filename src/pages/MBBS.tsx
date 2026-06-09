import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  Loader2,
  Phone,
  Stethoscope,
  X,
} from "lucide-react";

import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-bg.jpg";
import { supabase } from "../../supabaseClient";

type CallbackForm = {
  name: string;
  phone: string;
  email: string;
};

type EligibilityForm = CallbackForm & {
  neetStatus: string;
  academicScore: string;
  preferredCountries: string[];
  budget: number;
};

type FormErrors = Partial<Record<keyof EligibilityForm, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9\s-]+$/;
const minBudget = 1500000;
const maxBudget = 6000000;

const mbbsCountries = [
  "India",
  "Russia",
  "Georgia",
  "Armenia",
  "Uzbekistan",
  "Nepal",
  "Bangladesh",
  "Kyrgyzstan",
];

const highlights = [
  "Options for MBBS in India and abroad, based on budget and seat availability",
  "NEET, NMC recognition, language, safety, and clinical exposure checked before shortlisting",
  "Country and university comparison without confusing students with unnecessary details",
  "Admission, documentation, visa, and pre-departure guidance from one counselling team",
];

const destinationTeasers = [
  {
    country: "India",
    mark: "IN",
    detail: "For students comparing domestic seats, counselling routes, and backup plans",
  },
  {
    country: "Russia",
    mark: "RU",
    detail: "Popular for structured medical programs and established universities",
  },
  {
    country: "Georgia",
    mark: "GE",
    detail: "Often preferred by students looking for English-medium MBBS options",
  },
  {
    country: "Uzbekistan",
    mark: "UZ",
    detail: "A practical route many budget-conscious families want to understand",
  },
];

const journeyPoints = [
  {
    title: "Start with your profile",
    detail:
      "NEET status, PCB score, budget, family preference, and practice plans decide whether India, abroad, or both should stay on your list.",
  },
  {
    title: "Shortlist with recognition checks",
    detail:
      "We help students look beyond attractive brochures and verify recognition, clinical exposure, language, safety, and long-term practice rules.",
  },
  {
    title: "Move only when the route is clear",
    detail:
      "Once the country and university make sense, our team supports applications, documents, visa steps, and pre-departure preparation.",
  },
];

const popularUniversities = [
  {
    country: "Russia",
    names: [
      "Kazan Federal University",
      "Crimea Federal University",
      "Altai State Medical University",
    ],
  },
  {
    country: "Georgia",
    names: [
      "Tbilisi State Medical University",
      "David Tvildiani Medical University",
      "Caucasus International University",
    ],
  },
  {
    country: "Armenia",
    names: ["Yerevan State Medical University", "Armenian Medical Institute"],
  },
  {
    country: "Uzbekistan",
    names: ["Tashkent Medical Academy", "Samarkand State Medical University"],
  },
  {
    country: "Nepal",
    names: [
      "Kathmandu University",
      "BP Koirala Institute of Health Sciences",
    ],
  },
  {
    country: "Bangladesh",
    names: ["Dhaka National Medical College", "Chittagong Medical College"],
  },
  {
    country: "Kyrgyzstan",
    names: ["Osh State Medical University", "Kyrgyz State Medical Academy"],
  },
];

const premiumPathways = [
  {
    country: "United Kingdom",
    mark: "UK",
    detail:
      "A competitive medicine route where UCAT, strong academics, interviews, and early UCAS planning matter.",
  },
  {
    country: "Australia",
    mark: "AU",
    detail:
      "Students may explore direct, provisional, or graduate-entry medical pathways depending on profile and eligibility.",
  },
  {
    country: "USA / Canada",
    mark: "NA",
    detail:
      "Usually a longer pre-med route with very strong academics, entrance tests, and careful profile building.",
  },
  {
    country: "New Zealand",
    mark: "NZ",
    detail:
      "A selective pathway where students need early counselling on health sciences entry routes and requirements.",
  },
];

const mbbsFaqs = [
  {
    question: "Who can apply for MBBS counselling?",
    answer:
      "Students who have studied Physics, Chemistry, Biology, and English can speak with our team. Final shortlisting depends on NEET status, marks, budget, and the country or university selected.",
  },
  {
    question: "Is NEET required for MBBS abroad?",
    answer:
      "Indian students planning to practice in India later normally need NEET qualification and must follow current NMC rules. We help students understand the rule before choosing a destination.",
  },
  {
    question: "Can DreamGlobal help with MBBS in India too?",
    answer:
      "Yes. We can guide students who are comparing MBBS in India with abroad options and want a clearer route before making a decision.",
  },
  {
    question: "What documents are usually required for MBBS admission?",
    answer:
      "Common documents include 10th and 12th mark sheets, NEET scorecard, passport, birth certificate, passport-size photos, medical fitness certificate, police clearance where required, and financial or visa documents. The final list depends on the country and university.",
  },
  {
    question: "What is the MBBS admission processing like?",
    answer:
      "The usual flow is profile review, country and university shortlisting, document checking, application submission, offer letter, fee and admission formalities, visa processing, travel planning, and pre-departure guidance.",
  },
  {
    question: "Do you support students after admission?",
    answer:
      "Yes. DreamGlobal supports students beyond admission with documentation, visa steps, travel preparation, onboarding guidance, and continued assistance through the course journey whenever students or parents need help.",
  },
  {
    question: "Are premium MBBS options available?",
    answer:
      "Yes. Countries such as the UK, Australia, USA, Canada, and New Zealand can be explored, but they are usually more competitive and need early planning, stronger academic profiles, entrance tests, interviews, and higher budgets.",
  },
];

const initialCallbackForm: CallbackForm = {
  name: "",
  phone: "",
  email: "",
};

const initialEligibilityForm: EligibilityForm = {
  ...initialCallbackForm,
  neetStatus: "",
  academicScore: "",
  preferredCountries: ["India"],
  budget: 3000000,
};

const formatBudget = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatMbbsInterest = (value: string) =>
  `mbbs-${value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

const validateContact = (form: CallbackForm) => {
  const errors: Partial<Record<keyof CallbackForm, string>> = {};
  const name = form.name.trim();
  const phone = form.phone.trim();
  const email = form.email.trim();

  if (!name) errors.name = "Please enter your name.";
  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!phonePattern.test(phone) || phone.replace(/\D/g, "").length !== 10) {
    errors.phone = "Please enter a valid 10 digit phone number.";
  }
  if (!email) {
    errors.email = "Please enter your email.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
};

const MBBS = () => {
  const [callbackForm, setCallbackForm] =
    useState<CallbackForm>(initialCallbackForm);
  const [callbackErrors, setCallbackErrors] =
    useState<Partial<Record<keyof CallbackForm, string>>>({});
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [callbackMessage, setCallbackMessage] = useState("");
  const [eligibilityOpen, setEligibilityOpen] = useState(false);
  const [eligibilityForm, setEligibilityForm] = useState<EligibilityForm>(
    initialEligibilityForm
  );
  const [eligibilityErrors, setEligibilityErrors] = useState<FormErrors>({});
  const [eligibilitySubmitting, setEligibilitySubmitting] = useState(false);
  const [eligibilityMessage, setEligibilityMessage] = useState("");

  const updateCallbackField = (field: keyof CallbackForm, value: string) => {
    setCallbackForm((current) => ({ ...current, [field]: value }));
    setCallbackErrors((current) => ({ ...current, [field]: undefined }));
    setCallbackMessage("");
  };

  const updateEligibilityField = <Key extends keyof EligibilityForm>(
    field: Key,
    value: EligibilityForm[Key]
  ) => {
    setEligibilityForm((current) => ({ ...current, [field]: value }));
    setEligibilityErrors((current) => ({ ...current, [field]: undefined }));
    setEligibilityMessage("");
  };

  const toggleCountry = (country: string) => {
    setEligibilityForm((current) => {
      const selected = current.preferredCountries.includes(country);
      return {
        ...current,
        preferredCountries: selected
          ? current.preferredCountries.filter((item) => item !== country)
          : [...current.preferredCountries, country],
      };
    });
    setEligibilityErrors((current) => ({
      ...current,
      preferredCountries: undefined,
    }));
    setEligibilityMessage("");
  };

  const closeEligibility = () => {
    setEligibilityOpen(false);
    setEligibilityErrors({});
    setEligibilityMessage("");
  };

  const submitCallback = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCallbackMessage("");

    const errors = validateContact(callbackForm);
    setCallbackErrors(errors);
    if (Object.keys(errors).length) return;

    setCallbackSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      name: callbackForm.name.trim(),
      phone: callbackForm.phone.trim(),
      email: callbackForm.email.trim(),
      interest: "mbbs-callback",
    });
    setCallbackSubmitting(false);

    if (error) {
      console.error("MBBS callback request failed:", error);
      setCallbackMessage("Sorry, we could not send this right now.");
      return;
    }

    setCallbackForm(initialCallbackForm);
    setCallbackMessage("Request sent. We will call you soon.");
  };

  const submitEligibility = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEligibilityMessage("");

    const contactErrors = validateContact(eligibilityForm);
    const nextErrors: FormErrors = { ...contactErrors };

    if (!eligibilityForm.neetStatus) {
      nextErrors.neetStatus = "Please choose your NEET status.";
    }
    if (!eligibilityForm.academicScore.trim()) {
      nextErrors.academicScore = "Please enter your PCB percentage or score.";
    }
    if (!eligibilityForm.preferredCountries.length) {
      nextErrors.preferredCountries = "Please choose at least one option.";
    }

    setEligibilityErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setEligibilitySubmitting(true);
    const selectedInterests = eligibilityForm.preferredCountries.map(
      formatMbbsInterest
    );

    const { error } = await supabase.from("eligibility").insert({
      name: eligibilityForm.name.trim(),
      number: eligibilityForm.phone.trim(),
      email: eligibilityForm.email.trim(),
      country: selectedInterests[0] || "mbbs",
      interest: selectedInterests.join(", "),
      intake: "Upcoming medical intake",
      cgpa: eligibilityForm.academicScore.trim(),
      passport: "To be discussed",
      qualification: "Class 12 PCB / MBBS applicant",
      serious: "MBBS counselling requested",
      ielts: eligibilityForm.neetStatus,
      budget: eligibilityForm.budget,
    });
    setEligibilitySubmitting(false);

    if (error) {
      console.error("MBBS eligibility request failed:", error);
      setEligibilityMessage("Sorry, we could not submit this right now.");
      return;
    }

    setEligibilityForm(initialEligibilityForm);
    setEligibilityErrors({});
    setEligibilityMessage("MBBS eligibility details submitted. We will contact you soon.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden pt-44 sm:pt-48">
          <img
            src={heroImage}
            alt="Students preparing for medical education"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061226]/95 via-[#061226]/76 to-black/30" />

          <div className="container relative z-10 mx-auto px-4 pb-20 pt-10 text-white">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-yellow-300">
                Medical education guidance
              </p>
              <h1 className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl">
                MBBS in India & Abroad
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                Compare realistic MBBS options, understand NEET and recognition
                requirements, and shortlist the route that fits your marks,
                budget, and long-term plan.
              </p>
              <div className="mt-8 flex flex-col gap-3 pr-12 sm:inline-flex sm:flex-row sm:pr-0">
                <button
                  type="button"
                  onClick={() => setEligibilityOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
                >
                  Check My Eligibility
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="mbbs-callback" className="bg-white py-16">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
                  Why choose guided MBBS counselling?
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  A clearer path before your family commits
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  MBBS decisions should not be made only from a fee list. The
                  real question is whether your marks, NEET status, budget,
                  country preference, and long-term practice plans match the
                  route you are considering.
                </p>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  DreamGlobal helps students compare MBBS in India and abroad
                  with the checks families usually worry about: recognition,
                  safety, language, clinical exposure, admission timing, and
                  whether the option is worth pursuing before documents move.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {highlights.map((point) => (
                  <div
                    key={point}
                    className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <BadgeCheck
                      size={20}
                      className="mt-0.5 shrink-0 text-yellow-600"
                    />
                    <p className="text-sm font-semibold leading-6 text-slate-800">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-mt-28 space-y-6 lg:sticky lg:top-32 lg:self-start">
              <form
                onSubmit={submitCallback}
                className="rounded-lg border border-slate-200 bg-white p-6 text-slate-950 shadow-lg"
              >
                <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
                  Request a callback
                </p>
                <h3 className="mt-2 text-2xl font-bold">
                  Speak with an MBBS advisor
                </h3>

                <div className="mt-5 space-y-3">
                  {(["name", "phone", "email"] as const).map((field) => (
                    <label key={field} className="block">
                      <input
                        value={callbackForm[field]}
                        onChange={(event) =>
                          updateCallbackField(field, event.target.value)
                        }
                        className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-yellow-400 focus:bg-white"
                        placeholder={
                          field === "name"
                            ? "Name"
                            : field === "phone"
                            ? "Phone"
                            : "Email"
                        }
                        type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                        autoComplete={
                          field === "name" ? "name" : field === "phone" ? "tel" : "email"
                        }
                      />
                      {callbackErrors[field] && (
                        <span className="mt-1 block text-xs text-red-600">
                          {callbackErrors[field]}
                        </span>
                      )}
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={callbackSubmitting}
                  className="gold-gradient-bg mt-5 flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {callbackSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Phone size={17} />
                  )}
                  {callbackSubmitting ? "Sending..." : "Request Callback"}
                </button>
                {callbackMessage && (
                  <p className="mt-3 text-sm leading-5 text-slate-600">
                    {callbackMessage}
                  </p>
                )}
              </form>

              <a
                href="tel:+918848674757"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-yellow-300 bg-yellow-50 px-5 py-3 font-semibold text-slate-950 transition hover:bg-yellow-100"
              >
                Contact Us
              </a>

              <button
                type="button"
                onClick={() => setEligibilityOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-5 py-3 font-semibold text-white transition hover:bg-accent"
              >
                <GraduationCap size={18} />
                Check My Eligibility
              </button>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
                MBBS options
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Routes students are actively asking about
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-700">
                Every candidate comes with a different story. Some want India
                first. Some need affordable abroad options. Some are trying to
                understand whether their marks and NEET status are enough. This
                is where counselling becomes useful before applications begin.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {destinationTeasers.map((item) => (
                <div
                  key={item.country}
                  className="relative rounded-lg border border-slate-200 bg-white p-5"
                >
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-yellow-200 bg-yellow-50 text-xs font-bold text-yellow-700">
                    {item.mark}
                  </span>
                  <GraduationCap size={22} className="text-yellow-600" />
                  <h3 className="mt-4 pr-10 text-xl font-bold text-slate-950">
                    {item.country}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
                  How counselling works
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  From confusion to a clear MBBS route
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-700">
                  The goal is not to push one country. The goal is to understand
                  what actually fits the student and then move with confidence.
                </p>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {journeyPoints.map((point, index) => (
                  <div
                    key={point.title}
                    className="rounded-lg border border-slate-200 bg-white p-6"
                  >
                    <p className="text-sm font-bold text-yellow-700">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-slate-950">
                      {point.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      {point.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#061226] py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-yellow-300">
                Premium medical pathways
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                For students aiming beyond the regular MBBS destinations
              </h2>
              <p className="mt-4 text-base leading-8 text-white/75">
                Premium options can be powerful, but they need earlier planning,
                stronger academics, entrance tests, interviews, and realistic
                budget discussions. We help families understand whether these
                routes are worth exploring before committing time and money.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {premiumPathways.map((item) => (
                <div
                  key={item.country}
                  className="relative rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur"
                >
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-yellow-300/40 bg-yellow-300/10 text-xs font-bold text-yellow-200">
                    {item.mark}
                  </span>
                  <h3 className="pr-12 text-xl font-bold">{item.country}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/75">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
                Popular universities
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Names students usually want to compare
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-700">
                These are commonly discussed universities from popular MBBS
                destinations. Final selection should still be checked against
                your profile, recognition requirements, intake, and counselling
                outcome.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {popularUniversities.map((item) => (
                <div
                  key={item.country}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-5"
                >
                  <h3 className="text-xl font-bold text-slate-950">
                    {item.country}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                    {item.names.map((name) => (
                      <li key={name} className="flex gap-2">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-500" />
                        <span>{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
                MBBS FAQs
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Quick answers before counselling
              </h2>
            </div>
            <div className="mt-8">
              <FaqAccordion items={mbbsFaqs} variant="country" />
            </div>
          </div>
        </section>
      </main>

      {eligibilityOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/65"
            onClick={closeEligibility}
            aria-label="Close eligibility form"
          />
          <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-5 shadow-2xl sm:p-7">
            <button
              type="button"
              onClick={closeEligibility}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close eligibility form"
            >
              <X size={20} />
            </button>

            <p className="pr-10 text-sm font-bold uppercase tracking-widest text-yellow-700">
              MBBS eligibility
            </p>
            <h2 className="mt-2 pr-10 text-2xl font-bold text-slate-950">
              Check your MBBS route
            </h2>

            <form onSubmit={submitEligibility} className="mt-6 space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {(["name", "phone", "email"] as const).map((field) => (
                  <label key={field} className="block">
                    <input
                      value={eligibilityForm[field]}
                      onChange={(event) =>
                        updateEligibilityField(field, event.target.value)
                      }
                      className="w-full rounded-md border border-yellow-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-yellow-500"
                      placeholder={
                        field === "name"
                          ? "Full name"
                          : field === "phone"
                          ? "Phone number"
                          : "Email address"
                      }
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    />
                    {eligibilityErrors[field] && (
                      <span className="mt-1 block text-xs text-red-600">
                        {eligibilityErrors[field]}
                      </span>
                    )}
                  </label>
                ))}

                <label className="block">
                  <select
                    value={eligibilityForm.neetStatus}
                    onChange={(event) =>
                      updateEligibilityField("neetStatus", event.target.value)
                    }
                    className="w-full rounded-md border border-yellow-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-yellow-500"
                  >
                    <option value="">NEET status</option>
                    <option>Qualified</option>
                    <option>Preparing</option>
                    <option>Need guidance</option>
                  </select>
                  {eligibilityErrors.neetStatus && (
                    <span className="mt-1 block text-xs text-red-600">
                      {eligibilityErrors.neetStatus}
                    </span>
                  )}
                </label>

                <label className="block">
                  <input
                    value={eligibilityForm.academicScore}
                    onChange={(event) =>
                      updateEligibilityField("academicScore", event.target.value)
                    }
                    className="w-full rounded-md border border-yellow-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-yellow-500"
                    placeholder="PCB percentage"
                  />
                  {eligibilityErrors.academicScore && (
                    <span className="mt-1 block text-xs text-red-600">
                      {eligibilityErrors.academicScore}
                    </span>
                  )}
                </label>
              </div>

              <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
                <p className="text-sm font-semibold text-slate-950">
                  Options you want to explore
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {mbbsCountries.map((country) => (
                    <label
                      key={country}
                      className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={eligibilityForm.preferredCountries.includes(
                          country
                        )}
                        onChange={() => toggleCountry(country)}
                        className="h-4 w-4 accent-yellow-500"
                      />
                      {country}
                    </label>
                  ))}
                </div>
                {eligibilityErrors.preferredCountries && (
                  <span className="mt-2 block text-xs text-red-600">
                    {eligibilityErrors.preferredCountries}
                  </span>
                )}
              </div>

              <label className="block rounded-md border border-yellow-200 bg-white p-4">
                <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                  <span>Expected family budget</span>
                  <span className="text-yellow-700">
                    {formatBudget(eligibilityForm.budget)}
                  </span>
                </span>
                <input
                  type="range"
                  min={minBudget}
                  max={maxBudget}
                  step={100000}
                  value={eligibilityForm.budget}
                  onChange={(event) =>
                    updateEligibilityField("budget", Number(event.target.value))
                  }
                  className="mt-4 w-full accent-yellow-500"
                />
              </label>

              <button
                type="submit"
                disabled={eligibilitySubmitting}
                className="gold-gradient-bg flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-70"
              >
                {eligibilitySubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Stethoscope size={18} />
                )}
                {eligibilitySubmitting ? "Submitting..." : "Submit Eligibility"}
              </button>
              {eligibilityMessage && (
                <p className="text-sm text-slate-700">{eligibilityMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MBBS;
