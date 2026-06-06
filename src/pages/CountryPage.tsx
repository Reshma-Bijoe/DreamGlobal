import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Mail, Phone, X } from "lucide-react";

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
};

type CallbackErrors = Partial<CallbackForm>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9\s-]+$/;

const CountryPage = () => {
  const { countryId } = useParams();
  const country = getCountryDestination(countryId);
  const [contactOpen, setContactOpen] = useState(false);
  const [callbackForm, setCallbackForm] = useState<CallbackForm>({
    name: "",
    phone: "",
    email: "",
  });
  const [callbackErrors, setCallbackErrors] = useState<CallbackErrors>({});
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [callbackMessage, setCallbackMessage] = useState("");

  const updateCallbackField = (field: keyof CallbackForm, value: string) => {
    setCallbackForm((current) => ({ ...current, [field]: value }));
    setCallbackErrors((current) => ({ ...current, [field]: undefined }));
    setCallbackMessage("");
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

    setCallbackErrors(nextErrors);
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
    });

    setCallbackSubmitting(false);

    if (error) {
      console.error("Country callback request failed:", error);
      setCallbackMessage("Sorry, we could not send this right now.");
      return;
    }

    setCallbackForm({ name: "", phone: "", email: "" });
    setCallbackMessage("Request sent. We will call you soon.");
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
            </div>
          </div>
        </section>

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

            <div className="space-y-6 lg:sticky lg:top-32 lg:self-start">
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
            </div>
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

      <Footer />
    </div>
  );
};

export default CountryPage;
