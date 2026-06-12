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
  X,
} from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-bg.jpg";
import mbbsHeroImage from "@/assets/mbbs3.png";
import {
  countryDestinations,
  getCountryDestination,
} from "@/data/countryDestinations";
import {
  callbackProfiles,
  countryAliases,
  mbbsCallbackOption,
  mbbsInterestOptions,
} from "@/data/callbackLanding";
import { supabase } from "../../supabaseClient";

type CallbackForm = {
  name: string;
  phone: string;
  email: string;
  interestId: string;
};

type CallbackErrors = Partial<Record<keyof CallbackForm, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9\s-]+$/;

const optionList = [
  ...countryDestinations.map((country) => ({
    id: country.id,
    name: country.name,
    route: country.route,
    tagline: country.tagline,
  })),
  mbbsCallbackOption,
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
  const [mobileCallbackOpen, setMobileCallbackOpen] = useState(false);

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(max-width: 1023px)").matches) {
      setMobileCallbackOpen(true);
    }
  }, []);

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

  const renderCallbackForm = (isModal = false) => (
    <form
      onSubmit={submitCallback}
      className={`relative rounded-lg border border-white/20 bg-white p-6 text-slate-950 shadow-2xl shadow-black/25 sm:p-7 ${
        isModal ? "max-h-[88vh] overflow-y-auto" : ""
      }`}
    >
      {isModal && (
        <button
          type="button"
          onClick={() => setMobileCallbackOpen(false)}
          className="absolute right-3 top-3 rounded-full bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200"
          aria-label="Close callback form"
        >
          <X size={16} />
        </button>
      )}

      <p className="pr-10 text-sm font-bold uppercase tracking-widest text-yellow-600">
        {pageProfile?.eyebrow || "Priority callback"}
      </p>
      <h2 className="mt-2 pr-8 text-2xl font-bold">
        Claim your free counselling call
      </h2>
      <div className="mt-3 text-sm leading-6 text-slate-600">
        {isMbbsPage ? (
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <span className="font-semibold text-red-800">
                Only for students and parents planning MBBS admissions in India or Abroad within the next 6–12 months.
              </span>
            </li>
            <li>
              <span className="font-semibold text-red-800">
                For those exploring options after NEET and wanting expert guidance to secure an MBBS seat.
              </span>
            </li>
          </ul>
        ) : isDirectInterestPage ? (
          <p>{`${destinationText} is already selected for this callback. Share your details and we will call you with the next sensible step.`}</p>
        ) : (
          <p>Tell us where you want to go. We will call you, then take you straight to the destination page so you can keep exploring.</p>
        )}
      </div>

      <div className="mt-5 space-y-3">
        <label className="block">
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
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
            onChange={(event) => updateField("phone", event.target.value)}
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
            onChange={(event) => updateField("email", event.target.value)}
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
              onChange={(event) => updateField("interestId", event.target.value)}
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
              onChange={(event) => updateField("interestId", event.target.value)}
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
        <p className="mt-3 text-sm leading-6 text-slate-600">{message}</p>
      )}
    </form>
  );

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
              {Array.isArray(pageProfile?.intro) ? (
                <ul className="mt-5 max-w-2xl space-y-3 text-base leading-7 text-white/90 sm:text-lg">
                  {pageProfile.intro.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2
                        size={19}
                        className="mt-1 shrink-0 text-yellow-300"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
                  {pageProfile?.intro ||
                    `Want to explore ${destinationText} in more detail? Share your details and our counsellors will help you understand courses, admission chances, intake timing, documents, and the next step before you lose a good opening.`}
                </p>
              )}
              <div className="mt-4 max-w-2xl rounded-lg border border-yellow-300/70 bg-yellow-300/20 px-4 py-4 text-yellow-50 shadow-xl shadow-black/25 ring-1 ring-yellow-200/20 backdrop-blur sm:px-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-200">
                  Why this timing matters
                </p>
                {Array.isArray(pageProfile?.urgency) ? (
                  <ul className="mt-3 space-y-2.5 text-sm font-semibold leading-6 sm:text-base">
                    {pageProfile.urgency.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(253,224,71,0.8)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm font-bold leading-7 sm:text-base">
                    {pageProfile?.urgency ||
                      "The right intake, course, and document timeline can change quickly. A focused callback now can help you avoid a rushed decision later."}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setMobileCallbackOpen(true)}
                className="gold-gradient-bg mt-4 flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 lg:hidden"
              >
                <Phone size={17} />
                Book Your Free Counselling
              </button>

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
              <div className="hidden lg:block">{renderCallbackForm()}</div>

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

      {mobileCallbackOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-4 lg:hidden"
          onClick={() => setMobileCallbackOpen(false)}
        >
          <div
            className="w-full max-w-md pt-10"
            onClick={(event) => event.stopPropagation()}
          >
            {renderCallbackForm(true)}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CallbackLanding;
