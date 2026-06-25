import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Loader2,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
  X,
} from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabase } from "../../supabaseClient";

type CallbackForm = {
  name: string;
  phone: string;
  email: string;
};

type CallbackErrors = Partial<Record<keyof CallbackForm, string>>;

const initialCallbackForm: CallbackForm = {
  name: "",
  phone: "",
  email: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9\s-]+$/;

const affordableDestinations = [
  {
    country: "Russia",
    cost: "INR 20-35 lakh total tuition",
    living: "INR 15,000-25,000/month",
    universities: "Kazan Federal University, Crimea Federal University, Altai State Medical University",
  },
  {
    country: "Georgia",
    cost: "INR 30-50 lakh total",
    living: "INR 20,000-30,000/month",
    universities: "Tbilisi State Medical University, David Tvildiani Medical University, Caucasus International University",
  },
  {
    country: "Armenia",
    cost: "USD 3,000-6,500/year",
    living: "USD 150-300/month",
    universities: "Yerevan State Medical University, Armenian Medical Institute",
  },
  {
    country: "Uzbekistan",
    cost: "INR 18-30 lakh total",
    living: "INR 12,000-20,000/month",
    universities: "Tashkent Medical Academy, Samarkand State Medical University",
  },
  {
    country: "Nepal",
    cost: "USD 35,000-80,000 total",
    living: "USD 200-350/month",
    universities: "Kathmandu University, BP Koirala Institute of Health Sciences",
  },
  {
    country: "Bangladesh",
    cost: "USD 4,000-8,000/year",
    living: "USD 150-300/month",
    universities: "Dhaka National Medical College, Chittagong Medical College",
  },
  {
    country: "Kyrgyzstan",
    cost: "USD 3,000-5,000/year",
    living: "USD 150-250/month",
    universities: "Osh State Medical University, Kyrgyz State Medical Academy",
  },
];

const premiumPathways = [
  ["USA", "Pre-med bachelor's, MCAT, AMCAS, interviews, MD/DO, residency", "11-15 years", "INR 4-7 crore+"],
  ["Canada", "Bachelor's degree, very high GPA, MCAT, extracurricular profile", "Highly competitive", "INR 5-6 crore+"],
  ["Australia", "Direct, provisional, or graduate-entry pathway with UCAT/ISAT", "5-7 years", "INR 3-5 crore+"],
  ["United Kingdom", "85-95% PCB, IELTS 7.0, UCAT, UCAS, interview, visa", "Usually 5-6 years", "INR 4.5-5.8 crore+"],
  ["New Zealand", "Health sciences pathway, UCAT ANZ, MBChB application", "Competitive pathway", "INR 3.4-4 crore+"],
];

const documents = [
  "10th and 12th certificates",
  "NEET scorecard",
  "Passport and passport-size photos",
  "Birth certificate",
  "Medical fitness certificate",
  "Police clearance certificate",
  "Financial and visa documents",
];

const nmcGuidelines = [
  "Course should be taught in English",
  "Minimum 54 months of study plus 1-year internship",
  "Students must clear FMGE/NExT for Indian practice",
  "Curriculum and clinical training should align with approved standards",
  "University recognition should be checked before admission",
];

const timeline = [
  ["Month 1-2", "Counselling and country selection"],
  ["Month 2-3", "Applications and document submission"],
  ["Month 3-4", "Offer letters received"],
  ["Month 4", "Fee payment"],
  ["Month 4-5", "Visa processing"],
  ["Month 5-6", "Travel arrangements"],
  ["Month 6", "Classes begin"],
];

const MBBSGuide = () => {
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [callbackForm, setCallbackForm] =
    useState<CallbackForm>(initialCallbackForm);
  const [callbackErrors, setCallbackErrors] = useState<CallbackErrors>({});
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [callbackMessage, setCallbackMessage] = useState("");

  const updateCallbackField = (field: keyof CallbackForm, value: string) => {
    setCallbackForm((current) => ({ ...current, [field]: value }));
    setCallbackErrors((current) => ({ ...current, [field]: undefined }));
    setCallbackMessage("");
  };

  const closeCallback = () => {
    setCallbackOpen(false);
    setCallbackErrors({});
    setCallbackMessage("");
  };

  const validateCallback = () => {
    const errors: CallbackErrors = {};
    const name = callbackForm.name.trim();
    const phone = callbackForm.phone.trim();
    const email = callbackForm.email.trim();

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

    setCallbackErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitCallback = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCallbackMessage("");

    if (!validateCallback()) return;

    setCallbackSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      name: callbackForm.name.trim(),
      phone: callbackForm.phone.trim(),
      email: callbackForm.email.trim(),
      interest: "callback-mbbs",
    });
    setCallbackSubmitting(false);

    if (error) {
      console.error("MBBS guide callback request failed:", error);
      setCallbackMessage("Sorry, we could not send this right now.");
      return;
    }

    setCallbackForm(initialCallbackForm);
    setCallbackMessage("Request sent. We will call you soon.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

    <main className="pt-44 sm:pt-48">
      <section className="bg-[#061226] px-4 py-16 text-white">
        <div className="container mx-auto">
          <Link
            to="/mbbs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-300 hover:text-yellow-200"
          >
            <ArrowLeft size={16} />
            Back to MBBS
          </Link>
          <p className="mt-8 text-sm font-bold uppercase tracking-widest text-yellow-300">
            Detailed MBBS guide
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold sm:text-5xl">
            Compare countries, documents, NMC rules, and admission timelines
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/75">
            This guide keeps the deeper MBBS details separate from the main
            page, so students can compare options carefully when they are ready.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
            Affordable destinations
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            Country comparison
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {affordableDestinations.map((item) => (
              <div
                key={item.country}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-xl font-bold text-slate-950">
                  {item.country}
                </h3>
                <p className="mt-3 text-sm font-bold text-yellow-700">
                  {item.cost}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Living: {item.living}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-700">
                  {item.universities}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
            Premium pathways
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            USA, Canada, UK, Australia, and New Zealand
          </h2>
          <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white">
            {premiumPathways.map(([country, route, duration, cost]) => (
              <div
                key={country}
                className="grid gap-3 border-b border-slate-200 p-4 last:border-b-0 md:grid-cols-[120px_1fr_120px_120px]"
              >
                <p className="font-bold text-slate-950">{country}</p>
                <p className="text-sm leading-6 text-slate-700">{route}</p>
                <p className="text-sm font-semibold text-slate-800">
                  {duration}
                </p>
                <p className="text-sm font-bold text-yellow-700">{cost}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-3">
          {[
            {
              icon: FileCheck2,
              title: "Documents",
              items: documents,
            },
            {
              icon: ShieldCheck,
              title: "NMC checks",
              items: nmcGuidelines,
            },
            {
              icon: Stethoscope,
              title: "University selection",
              items: [
                "Reputation and age of university",
                "WDOMS, FAIMER, ECFMG, and relevant recognition checks",
                "Hospital exposure and clinical training quality",
                "Climate, safety, living conditions, and FMGE/NExT support",
              ],
            },
          ].map((section) => {
            const Icon = section.icon;

            return (
              <div
                key={section.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6"
              >
                <Icon size={24} className="text-yellow-600" />
                <h3 className="mt-4 text-2xl font-bold text-slate-950">
                  {section.title}
                </h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2
                        size={16}
                        className="mt-1 shrink-0 text-yellow-600"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
              Timeline
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              A six-month roadmap
            </h2>
            <div className="mt-8 space-y-3">
              {timeline.map(([month, step]) => (
                <div
                  key={month}
                  className="grid gap-2 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-[120px_1fr]"
                >
                  <p className="text-sm font-bold text-yellow-700">{month}</p>
                  <p className="text-sm font-semibold leading-6 text-slate-800">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit self-start rounded-lg border border-yellow-200 bg-yellow-50 p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-yellow-700">
              Seats are limited
            </p>
            <h3 className="mt-3 text-3xl font-bold leading-tight text-slate-950">
              What are you waiting for?
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              The earlier you start, the stronger your university options can
              be. Call now, get your profile checked, and hurry to secure your
              MBBS seat for the next intake.
            </p>
            <a
              href="tel:+918848674757"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <MessageCircle size={17} />
              Call now: +91 88486 74757
            </a>
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="gold-gradient-bg mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Start MBBS enquiry
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </main>

    {callbackOpen && (
      <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6">
        <button
          type="button"
          className="absolute inset-0 bg-slate-950/70"
          onClick={closeCallback}
          aria-label="Close MBBS callback form"
        />
        <form
          onSubmit={submitCallback}
          className="relative w-full max-w-md rounded-lg bg-white p-6 text-slate-950 shadow-2xl sm:p-7"
        >
          <button
            type="button"
            onClick={closeCallback}
            className="absolute right-3 top-3 rounded-full bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200"
            aria-label="Close MBBS callback form"
          >
            <X size={16} />
          </button>

          <p className="pr-10 text-sm font-bold uppercase tracking-widest text-yellow-600">
            MBBS callback
          </p>
          <h2 className="mt-2 pr-8 text-2xl font-bold">
            Speak with an MBBS advisor
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Share your details and we will call you about MBBS options, seat
            availability, country choices, and the next admission step.
          </p>

          <div className="mt-5 space-y-3">
            {(["name", "phone", "email"] as const).map((field) => (
              <label key={field} className="block">
                <input
                  value={callbackForm[field]}
                  onChange={(event) =>
                    updateCallbackField(field, event.target.value)
                  }
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white"
                  placeholder={
                    field === "name"
                      ? "Name"
                      : field === "phone"
                      ? "Phone"
                      : "Email"
                  }
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "tel"
                      : "text"
                  }
                  autoComplete={
                    field === "name"
                      ? "name"
                      : field === "phone"
                      ? "tel"
                      : "email"
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
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Phone size={17} />
            )}
            {callbackSubmitting ? "Sending..." : "Request Callback"}
          </button>

          {callbackMessage && (
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {callbackMessage}
            </p>
          )}
        </form>
      </div>
    )}

    <Footer />
  </div>
  );
};

export default MBBSGuide;
