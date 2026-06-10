import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Mail,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  countryDestinations,
  getCountryDestination,
} from "@/data/countryDestinations";
import { supabase } from "../../supabaseClient";

type CallbackForm = {
  name: string;
  phone: string;
  email: string;
  interestedCountries: string[];
};

type CallbackErrors = Partial<Record<keyof CallbackForm, string>>;

type EligibilityForm = {
  name: string;
  phone: string;
  email: string;
  interestedCountries: string[];
  preferredIntake: string;
  highestQualification: string;
  academicScore: string;
  passportStatus: string;
  englishTestStatus: string;
  expectedBudget: number;
  studySeriousness: string;
};

type EligibilityErrors = Partial<Record<keyof EligibilityForm, string>>;
type EligibilityMessage = "" | "review" | "thanks";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9\s-]+$/;
const minBudget = 500000;
const maxBudget = 5000000;

const intakeOptions = ["September 2026", "January 2027"];
const qualificationOptions = [
  "Class 10 / Secondary School Certificate (SSLC/SSC)",
  "Class 12 / Higher Secondary Certificate (HSC/Plus Two)",
  "Final-year undergraduate student",
  "Bachelor's degree",
  "Final-year postgraduate student",
  "Master's degree",
  "Working professional",
];
const passportOptions = ["Yes", "Applied", "No"];
const englishTestOptions = ["Completed", "Preparing", "Need guidance"];
const seriousnessOptions = [
  "Very serious",
  "Shortlisting options",
  "Exploring options",
  "Need counselling first",
];

const initialEligibilityForm: EligibilityForm = {
  name: "",
  phone: "",
  email: "",
  interestedCountries: [],
  preferredIntake: "September 2026",
  highestQualification: "",
  academicScore: "",
  passportStatus: "",
  englishTestStatus: "",
  expectedBudget: 1500000,
  studySeriousness: "",
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.95,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 28,
      mass: 0.9,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.96,
    filter: "blur(6px)",
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
};

const formatBudget = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const countryAdmissionBanners: Record<string, string> = {
  "united-kingdom":
    "UK admissions are currently open. Secure your preferred intake before seats close.",
  italy:
    "Italy admissions and scholarship opportunities are available now. Apply early to improve your options.",
};

const CountryPage = () => {
  const { countryId } = useParams();
  const country = getCountryDestination(countryId);
  const callbackSectionRef = useRef<HTMLDivElement | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [eligibilityOpen, setEligibilityOpen] = useState(false);
  const [callbackForm, setCallbackForm] = useState<CallbackForm>({
    name: "",
    phone: "",
    email: "",
    interestedCountries: country?.name ? [country.name] : [],
  });
  const [callbackErrors, setCallbackErrors] = useState<CallbackErrors>({});
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [callbackMessage, setCallbackMessage] = useState("");
  const [eligibilityForm, setEligibilityForm] = useState<EligibilityForm>(
    initialEligibilityForm
  );
  const [eligibilityErrors, setEligibilityErrors] =
    useState<EligibilityErrors>({});
  const [eligibilitySubmitting, setEligibilitySubmitting] = useState(false);
  const [eligibilityMessage, setEligibilityMessage] =
    useState<EligibilityMessage>("");

  useEffect(() => {
    if (!country) return;
    setCallbackForm((current) => ({
      ...current,
      interestedCountries: current.interestedCountries.includes(country.name)
        ? current.interestedCountries
        : [country.name, ...current.interestedCountries],
    }));
    setEligibilityForm((current) => ({
      ...current,
      interestedCountries: current.interestedCountries.length
        ? current.interestedCountries
        : [country.name],
    }));
  }, [country]);

  useEffect(() => {
    if (eligibilityMessage !== "review") return;

    const timer = window.setTimeout(() => {
      setEligibilityMessage("thanks");
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [eligibilityMessage]);

  const updateCallbackField = (field: keyof CallbackForm, value: string) => {
    setCallbackForm((current) => ({ ...current, [field]: value }));
    setCallbackErrors((current) => ({ ...current, [field]: undefined }));
    setCallbackMessage("");
  };

  const toggleCallbackCountry = (countryName: string) => {
    setCallbackForm((current) => {
      const isSelected = current.interestedCountries.includes(countryName);
      return {
        ...current,
        interestedCountries: isSelected
          ? current.interestedCountries.filter((name) => name !== countryName)
          : [...current.interestedCountries, countryName],
      };
    });
    setCallbackErrors((current) => ({
      ...current,
      interestedCountries: undefined,
    }));
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

  const toggleInterestedCountry = (countryName: string) => {
    setEligibilityForm((current) => {
      const isSelected = current.interestedCountries.includes(countryName);
      return {
        ...current,
        interestedCountries: isSelected
          ? current.interestedCountries.filter((name) => name !== countryName)
          : [...current.interestedCountries, countryName],
      };
    });
    setEligibilityErrors((current) => ({
      ...current,
      interestedCountries: undefined,
    }));
    setEligibilityMessage("");
  };

  const validateCallbackForm = () => {
    const nextErrors: CallbackErrors = {};
    const name = callbackForm.name.trim();
    const phone = callbackForm.phone.trim();
    const email = callbackForm.email.trim();

    if (!name) {
      nextErrors.name = "Please enter your name.";
    }

    if (!phone) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (!phonePattern.test(phone)) {
      nextErrors.phone = "Please enter a valid phone number.";
    } else if (phone.replace(/\D/g, "").length !== 10) {
      nextErrors.phone = "Phone number must be 10 digits.";
    }

    if (!email) {
      nextErrors.email = "Please enter your email.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!callbackForm.interestedCountries.length) {
      nextErrors.interestedCountries = "Please choose at least one country.";
    }

    setCallbackErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateEligibilityForm = () => {
    const nextErrors: EligibilityErrors = {};
    const name = eligibilityForm.name.trim();
    const phone = eligibilityForm.phone.trim();
    const email = eligibilityForm.email.trim();
    const academicScore = eligibilityForm.academicScore.trim();

    if (!name) nextErrors.name = "Please enter your full name.";

    if (!phone) {
      nextErrors.phone = "Please enter your mobile number.";
    } else if (!phonePattern.test(phone)) {
      nextErrors.phone = "Please enter a valid mobile number.";
    } else if (phone.replace(/\D/g, "").length !== 10) {
      nextErrors.phone = "Mobile number must be 10 digits.";
    }

    if (!email) {
      nextErrors.email = "Please enter your email.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!eligibilityForm.interestedCountries.length) {
      nextErrors.interestedCountries = "Please choose at least one country.";
    }
    if (!eligibilityForm.preferredIntake) {
      nextErrors.preferredIntake = "Please choose an intake.";
    }
    if (!eligibilityForm.highestQualification) {
      nextErrors.highestQualification = "Please choose your qualification.";
    }
    if (!academicScore) {
      nextErrors.academicScore = "Please enter your percentage or CGPA.";
    }
    if (!eligibilityForm.passportStatus) {
      nextErrors.passportStatus = "Please choose your passport status.";
    }
    if (!eligibilityForm.englishTestStatus) {
      nextErrors.englishTestStatus = "Please choose your IELTS/PTE status.";
    }
    if (!eligibilityForm.studySeriousness) {
      nextErrors.studySeriousness = "Please choose one option.";
    }

    setEligibilityErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitCallback = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCallbackMessage("");

    if (!validateCallbackForm()) return;

    setCallbackSubmitting(true);

    const { error } = await supabase.from("leads").insert({
      name: callbackForm.name.trim(),
      phone: callbackForm.phone.trim(),
      email: callbackForm.email.trim(),
      interest: callbackForm.interestedCountries.join(", "),
    });

    setCallbackSubmitting(false);

    if (error) {
      console.error("Country callback request failed:", error);
      setCallbackMessage("Sorry, we could not send this right now.");
      return;
    }

    setCallbackForm({
      name: "",
      phone: "",
      email: "",
      interestedCountries: country?.name ? [country.name] : [],
    });
    setCallbackMessage("Request sent. We will call you soon.");
  };

  const submitEligibility = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEligibilityMessage("");

    if (!validateEligibilityForm()) return;

    setEligibilitySubmitting(true);

    const { error } = await supabase.from("eligibility").insert({
      name: eligibilityForm.name.trim(),
      number: eligibilityForm.phone.trim(),
      email: eligibilityForm.email.trim(),
      country: eligibilityForm.interestedCountries[0] || country?.name || "",
      interest: eligibilityForm.interestedCountries.join(", "),
      intake: eligibilityForm.preferredIntake,
      cgpa: eligibilityForm.academicScore.trim(),
      passport: eligibilityForm.passportStatus,
      qualification: eligibilityForm.highestQualification,
      serious: eligibilityForm.studySeriousness,
      ielts: eligibilityForm.englishTestStatus,
      budget: eligibilityForm.expectedBudget,
    });

    setEligibilitySubmitting(false);

    if (error) {
      console.error("Eligibility request failed:", error);
      setEligibilityErrors({
        studySeriousness: "Sorry, we could not submit this right now.",
      });
      return;
    }

    setEligibilityForm({
      ...initialEligibilityForm,
      interestedCountries: country?.name ? [country.name] : [],
    });
    setEligibilityErrors({});
    setEligibilityMessage("review");
  };

  const closeEligibility = () => {
    setEligibilityOpen(false);
    setEligibilityErrors({});
    setEligibilityMessage("");
  };

  if (!country) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pb-20 pt-48 text-center">
          <h1 className="text-3xl font-bold text-slate-950">
            Country not found
          </h1>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-md bg-yellow-400 px-5 py-2 font-semibold text-slate-950"
          >
            Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="relative min-h-[70vh] overflow-hidden pt-44 sm:pt-48">
          <img
            src={country.image}
            alt={country.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061226]/90 via-[#061226]/70 to-black/20" />

          <div className="container relative z-10 mx-auto px-4 pb-20 pt-10 text-white">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-300 hover:text-yellow-200"
            >
              <ArrowLeft size={16} />
              Back to destinations
            </Link>

            <div className="mt-10 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-yellow-300">
                Study in
              </p>
              <h1 className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl">
                {country.name}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                {country.tagline}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:inline-flex sm:flex-row">
                <button
                  type="button"
                  onClick={() => setEligibilityOpen(true)}
                  className="gold-gradient-bg inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  <GraduationCap size={18} />
                  Check My Eligibility
                </button>
              </div>
            </div>
          </div>
        </section>

        {countryAdmissionBanners[country.id] && (
          <section className="gold-gradient-bg px-4 py-3 text-primary-foreground">
            <div className="container mx-auto text-center text-sm font-bold uppercase tracking-[0.12em] sm:text-base">
              {countryAdmissionBanners[country.id]}
            </div>
          </section>
        )}

        <section className="bg-white py-16">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
                  Why choose {country.name}
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  A strong destination for international students
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  {country.whyStudyHere}
                </p>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  {country.tagline}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-bold text-slate-950">
                  Student highlights
                </h3>
                <ul className="mt-5 space-y-4 text-slate-700">
                  {country.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              ref={callbackSectionRef}
              className="scroll-mt-28 space-y-6 lg:sticky lg:top-32 lg:self-start"
            >
              <form
                className="rounded-lg border border-slate-200 bg-white p-6 text-slate-950 shadow-lg"
                onSubmit={submitCallback}
              >
                <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
                  Request a callback
                </p>
                <h3 className="mt-2 text-2xl font-bold">
                  Speak with DreamGlobal
                </h3>

                <div className="mt-5 space-y-3">
                  <label className="block">
                    <input
                      type="text"
                      name="name"
                      value={callbackForm.name}
                      onChange={(event) =>
                        updateCallbackField("name", event.target.value)
                      }
                      placeholder="Name"
                      autoComplete="name"
                      aria-invalid={Boolean(callbackErrors.name)}
                      className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-yellow-400 focus:bg-white"
                    />
                    {callbackErrors.name && (
                      <span className="mt-1 block text-xs text-red-600">
                        {callbackErrors.name}
                      </span>
                    )}
                  </label>

                  <label className="block">
                    <input
                      type="tel"
                      name="phone"
                      value={callbackForm.phone}
                      onChange={(event) =>
                        updateCallbackField("phone", event.target.value)
                      }
                      placeholder="Phone"
                      autoComplete="tel"
                      aria-invalid={Boolean(callbackErrors.phone)}
                      className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-yellow-400 focus:bg-white"
                    />
                    {callbackErrors.phone && (
                      <span className="mt-1 block text-xs text-red-600">
                        {callbackErrors.phone}
                      </span>
                    )}
                  </label>

                  <label className="block">
                    <input
                      type="email"
                      name="email"
                      value={callbackForm.email}
                      onChange={(event) =>
                        updateCallbackField("email", event.target.value)
                      }
                      placeholder="Email"
                      autoComplete="email"
                      aria-invalid={Boolean(callbackErrors.email)}
                      className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-yellow-400 focus:bg-white"
                    />
                    {callbackErrors.email && (
                      <span className="mt-1 block text-xs text-red-600">
                        {callbackErrors.email}
                      </span>
                    )}
                  </label>

                  <div className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Countries of interest
                    </span>
                    <details className="group relative">
                      <summary className="flex min-h-[46px] cursor-pointer list-none items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 group-open:border-yellow-400 group-open:bg-white">
                        <span className="truncate">
                          {callbackForm.interestedCountries.length
                            ? callbackForm.interestedCountries.join(", ")
                            : "Select countries"}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-yellow-700">
                          Choose
                        </span>
                      </summary>
                      <div className="absolute z-20 mt-2 max-h-56 w-full overflow-y-auto rounded-md border border-slate-200 bg-white p-2 shadow-xl">
                        {countryDestinations.map((destination) => (
                          <label
                            key={destination.id}
                            className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition hover:bg-yellow-50"
                          >
                            <input
                              type="checkbox"
                              checked={callbackForm.interestedCountries.includes(
                                destination.name
                              )}
                              onChange={() =>
                                toggleCallbackCountry(destination.name)
                              }
                              className="h-4 w-4 rounded border-slate-300 accent-yellow-500"
                            />
                            <span>{destination.name}</span>
                          </label>
                        ))}
                      </div>
                    </details>
                    {callbackErrors.interestedCountries && (
                      <span className="mt-1 block text-xs text-red-600">
                        {callbackErrors.interestedCountries}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={callbackSubmitting}
                  className="gold-gradient-bg mt-5 flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {callbackSubmitting && (
                    <Loader2 size={16} className="animate-spin" />
                  )}
                  {callbackSubmitting ? "Sending..." : "Request Callback"}
                </button>

                {callbackMessage && (
                  <p className="mt-3 text-sm leading-5 text-slate-600">
                    {callbackMessage}
                  </p>
                )}
              </form>

              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-yellow-300 bg-yellow-50 px-5 py-3 font-semibold text-slate-950 transition hover:bg-yellow-100"
              >
                Contact Us
              </button>

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
                {country.name} FAQs
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Common questions about studying in {country.name}
              </h2>
            </div>

            <div className="mt-8">
              <FaqAccordion items={country.faqs} variant="country" />
            </div>

            <Link
              to="/faqs"
              className="mt-8 inline-flex rounded-md border border-yellow-300 bg-yellow-50 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-100"
            >
              View general FAQs
            </Link>
          </div>
        </section>

        <section className="bg-[#061226] py-14 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold">Explore countries</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {countryDestinations.map((destination) => (
                <Link
                  key={destination.id}
                  to={destination.route}
                  className="group overflow-hidden rounded-lg bg-white/10"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-36 w-full object-cover transition group-hover:scale-105"
                  />
                  <div className="p-4 font-semibold">{destination.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {contactOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setContactOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
              aria-label="Close contact details"
            >
              <X size={16} />
            </button>

            <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
              Contact DreamGlobal
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Our team will guide you
            </h2>

            <div className="mt-6 space-y-3">
              <a
                href="tel:+918848674757"
                className="flex items-center gap-3 rounded-md border border-slate-200 p-4 text-slate-800 transition hover:border-yellow-300 hover:bg-yellow-50"
              >
                <Phone size={18} className="text-yellow-600" />
                <span className="font-semibold">+91 88486 74757</span>
              </a>

              <a
                href="mailto:dreamglobalin@gmail.com"
                className="flex items-center gap-3 rounded-md border border-slate-200 p-4 text-slate-800 transition hover:border-yellow-300 hover:bg-yellow-50"
              >
                <Mail size={18} className="text-yellow-600" />
                <span className="font-semibold">dreamglobalin@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {eligibilityOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-4 sm:items-center sm:py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEligibility}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-3xl rounded-lg border border-white/60 bg-white p-5 text-slate-950 shadow-2xl shadow-secondary/25 sm:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeEligibility}
                className="absolute right-3 top-3 rounded-full bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200"
                aria-label="Close eligibility form"
              >
                <X size={16} />
              </button>

              {eligibilityMessage ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center px-2 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                    <CheckCircle2 size={32} />
                  </div>
                  <p className="mt-5 text-sm font-bold uppercase tracking-widest text-yellow-600">
                    Profile submitted
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-950">
                    {eligibilityMessage === "review"
                      ? "Our team will review your profile and contact you shortly."
                      : "Thank you."}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
                    {eligibilityMessage === "review"
                      ? "Please keep your phone nearby so our counselling team can reach you."
                      : "Your eligibility details are safely with DreamGlobal."}
                  </p>
                  {eligibilityMessage === "thanks" && (
                    <button
                      type="button"
                      onClick={closeEligibility}
                      className="mt-6 rounded-md bg-secondary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
                    >
                      Done
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
                    Study abroad profile
                  </p>
                  <h2 className="mt-2 pr-8 text-2xl font-bold text-slate-950 sm:text-3xl">
                    Check My Eligibility
                  </h2>

                  <form onSubmit={submitEligibility} className="mt-6 space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold">
                          Full name
                        </span>
                        <input
                          value={eligibilityForm.name}
                          onChange={(event) =>
                            updateEligibilityField("name", event.target.value)
                          }
                          className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                          placeholder="Your full name"
                          autoComplete="name"
                        />
                        {eligibilityErrors.name && (
                          <span className="mt-1 block text-xs text-red-600">
                            {eligibilityErrors.name}
                          </span>
                        )}
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold">
                          Mobile number
                        </span>
                        <input
                          value={eligibilityForm.phone}
                          onChange={(event) =>
                            updateEligibilityField("phone", event.target.value)
                          }
                          className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                          placeholder="10 digit mobile number"
                          autoComplete="tel"
                          type="tel"
                        />
                        {eligibilityErrors.phone && (
                          <span className="mt-1 block text-xs text-red-600">
                            {eligibilityErrors.phone}
                          </span>
                        )}
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold">
                          Email
                        </span>
                        <input
                          value={eligibilityForm.email}
                          onChange={(event) =>
                            updateEligibilityField("email", event.target.value)
                          }
                          className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                          placeholder="you@example.com"
                          autoComplete="email"
                          type="email"
                        />
                        {eligibilityErrors.email && (
                          <span className="mt-1 block text-xs text-red-600">
                            {eligibilityErrors.email}
                          </span>
                        )}
                      </label>

                      <div className="block">
                        <span className="mb-2 block text-sm font-semibold">
                          Countries of interest
                        </span>
                        <details className="group relative">
                          <summary className="flex min-h-[46px] cursor-pointer list-none items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 group-open:border-yellow-400 group-open:bg-white">
                            <span className="truncate">
                              {eligibilityForm.interestedCountries.length
                                ? eligibilityForm.interestedCountries.join(", ")
                                : "Select countries"}
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-yellow-700">
                              Choose
                            </span>
                          </summary>
                          <div className="absolute z-20 mt-2 max-h-56 w-full overflow-y-auto rounded-md border border-slate-200 bg-white p-2 shadow-xl">
                            {countryDestinations.map((destination) => (
                              <label
                                key={destination.id}
                                className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition hover:bg-yellow-50"
                              >
                                <input
                                  type="checkbox"
                                  checked={eligibilityForm.interestedCountries.includes(
                                    destination.name
                                  )}
                                  onChange={() =>
                                    toggleInterestedCountry(destination.name)
                                  }
                                  className="h-4 w-4 rounded border-slate-300 accent-yellow-500"
                                />
                                <span>{destination.name}</span>
                              </label>
                            ))}
                          </div>
                        </details>
                        {eligibilityErrors.interestedCountries && (
                          <span className="mt-1 block text-xs text-red-600">
                            {eligibilityErrors.interestedCountries}
                          </span>
                        )}
                      </div>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold">
                          Preferred intake
                        </span>
                        <select
                          value={eligibilityForm.preferredIntake}
                          onChange={(event) =>
                            updateEligibilityField(
                              "preferredIntake",
                              event.target.value
                            )
                          }
                          className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                        >
                          {intakeOptions.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold">
                          Highest qualification
                        </span>
                        <select
                          value={eligibilityForm.highestQualification}
                          onChange={(event) =>
                            updateEligibilityField(
                              "highestQualification",
                              event.target.value
                            )
                          }
                          className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                        >
                          <option value="">Select qualification</option>
                          {qualificationOptions.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                        {eligibilityErrors.highestQualification && (
                          <span className="mt-1 block text-xs text-red-600">
                            {eligibilityErrors.highestQualification}
                          </span>
                        )}
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold">
                          Academic percentage/CGPA
                        </span>
                        <input
                          value={eligibilityForm.academicScore}
                          onChange={(event) =>
                            updateEligibilityField(
                              "academicScore",
                              event.target.value
                            )
                          }
                          className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                          placeholder="Example: 78% or 8.1 CGPA"
                        />
                        {eligibilityErrors.academicScore && (
                          <span className="mt-1 block text-xs text-red-600">
                            {eligibilityErrors.academicScore}
                          </span>
                        )}
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold">
                          Passport status
                        </span>
                        <select
                          value={eligibilityForm.passportStatus}
                          onChange={(event) =>
                            updateEligibilityField(
                              "passportStatus",
                              event.target.value
                            )
                          }
                          className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                        >
                          <option value="">Select status</option>
                          {passportOptions.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                        {eligibilityErrors.passportStatus && (
                          <span className="mt-1 block text-xs text-red-600">
                            {eligibilityErrors.passportStatus}
                          </span>
                        )}
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold">
                          IELTS/PTE status
                        </span>
                        <select
                          value={eligibilityForm.englishTestStatus}
                          onChange={(event) =>
                            updateEligibilityField(
                              "englishTestStatus",
                              event.target.value
                            )
                          }
                          className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                        >
                          <option value="">Select status</option>
                          {englishTestOptions.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                        {eligibilityErrors.englishTestStatus && (
                          <span className="mt-1 block text-xs text-red-600">
                            {eligibilityErrors.englishTestStatus}
                          </span>
                        )}
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold">
                          How serious are you?
                        </span>
                        <select
                          value={eligibilityForm.studySeriousness}
                          onChange={(event) =>
                            updateEligibilityField(
                              "studySeriousness",
                              event.target.value
                            )
                          }
                          className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                        >
                          <option value="">Select one</option>
                          {seriousnessOptions.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                        {eligibilityErrors.studySeriousness && (
                          <span className="mt-1 block text-xs text-red-600">
                            {eligibilityErrors.studySeriousness}
                          </span>
                        )}
                      </label>
                    </div>

                    <label className="block rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                        <span>Expected budget</span>
                        <span className="text-yellow-700">
                          {formatBudget(eligibilityForm.expectedBudget)}
                        </span>
                      </span>
                      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_180px] sm:items-center">
                        <input
                          type="range"
                          min={minBudget}
                          max={maxBudget}
                          step={50000}
                          value={eligibilityForm.expectedBudget}
                          onChange={(event) =>
                            updateEligibilityField(
                              "expectedBudget",
                              Number(event.target.value)
                            )
                          }
                          className="accent-yellow-500"
                        />
                        <input
                          type="number"
                          min={minBudget}
                          max={maxBudget}
                          step={50000}
                          value={eligibilityForm.expectedBudget}
                          onChange={(event) =>
                            updateEligibilityField(
                              "expectedBudget",
                              Number(event.target.value)
                            )
                          }
                          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-yellow-400"
                        />
                      </div>
                    </label>

                    <button
                      type="submit"
                      disabled={eligibilitySubmitting}
                      className="gold-gradient-bg flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {eligibilitySubmitting ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <GraduationCap size={18} />
                      )}
                      {eligibilitySubmitting
                        ? "Submitting..."
                        : "Submit Eligibility Profile"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default CountryPage;
