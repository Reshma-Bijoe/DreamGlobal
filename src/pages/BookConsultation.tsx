import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  AtSign,
  CalendarCheck,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  consultationInterestOptions,
  PHONE_NUMBER,
  WHATSAPP_URL,
} from "@/lib/careerCounsellingData";
import { notifyAdminOfConsultation } from "@/lib/consultationNotifications";
import { supabase } from "../../supabaseClient";

type ConsultationForm = {
  name: string;
  age: string;
  grade: string;
  location: string;
  phone: string;
  email: string;
  interest: string;
  remarks: string;
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
  interest: consultationInterestOptions[0],
  remarks: "",
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

const BookConsultation = () => {
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
          `Interest: ${form.interest}`,
          `Remarks: ${form.remarks || "Not shared"}`,
          `Preferred Date: ${form.preferredDate || "Flexible"}`,
          `Preferred Time: ${form.preferredTime || "Flexible"}`,
        ].join("\n")
      ),
    [form]
  );

  const updateField =
    (field: keyof ConsultationForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        "Book consultation",
        `Interest: ${form.interest}`,
        `Age: ${form.age.trim()}`,
        `Grade/Class: ${form.grade.trim()}`,
        `Location: ${form.location.trim()}`,
        `Remarks: ${form.remarks.trim() || "Not shared"}`,
        `Preferred schedule: ${form.preferredDate || "Flexible date"} ${
          form.preferredTime || "Flexible time"
        }`,
      ].join(" | "),
    });

    if (error) {
      setIsSubmitting(false);
      console.error("Book consultation request failed:", error);
      setMessage("Sorry, we could not submit this right now.");
      return;
    }

    const notificationSent = await notifyAdminOfConsultation({
      ...form,
      phone: normalizedPhone,
    });

    setIsSubmitting(false);
    setForm(initialForm);
    setMessage(
      notificationSent
        ? "Request sent. We will contact you soon."
        : "Request saved. We will contact you soon."
    );
  };

  return (
    <div className="career-theme min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#fffdf8_52%,#ffffff_100%)]">
      <Navbar />

      <main className="px-4 pb-12 pt-44 md:pb-16 md:pt-48">
        <div className="container mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <section className="career-card rounded-2xl p-5 md:p-8">
            <p className="career-eyebrow">Book Free Consultation</p>
            <h1 className="career-heading mt-3 font-heading text-3xl font-bold sm:text-5xl">
              Tell us what you want to plan.
            </h1>
            <p className="career-copy mt-4 max-w-2xl text-sm leading-7 sm:text-base">
              Share your details and DreamGlobal will contact you to confirm
              the next step for career counselling, higher studies, or study
              abroad guidance.
            </p>

            <form onSubmit={submitRequest} className="mt-7">
              <div className="grid gap-4 md:grid-cols-2">
                <input className={fieldClass} placeholder="Name" required value={form.name} onChange={updateField("name")} />
                <input className={fieldClass} placeholder="Age" type="number" min="5" max="80" required value={form.age} onChange={updateField("age")} />
                <input className={fieldClass} placeholder="Grade/Class" required value={form.grade} onChange={updateField("grade")} />
                <input className={fieldClass} placeholder="Location" required value={form.location} onChange={updateField("location")} />
                <input className={fieldClass} placeholder="10-digit Phone Number" type="tel" inputMode="tel" autoComplete="tel" required value={form.phone} onChange={updateField("phone")} />
                <input className={fieldClass} placeholder="Email" type="email" autoComplete="email" required value={form.email} onChange={updateField("email")} />
                <select className={`${fieldClass} md:col-span-2`} value={form.interest} onChange={updateField("interest")}>
                  {consultationInterestOptions.map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
                <p className="text-xs font-semibold text-[color:var(--career-muted)] md:col-span-2">
                  Fields marked with <span className="font-bold text-[#C88A18]">*</span> are optional.
                </p>
                {/*
                <select className={fieldClass} value={form.intent} onChange={updateField("intent")}>
                  {intentOptions.map((intent) => (
                    <option key={intent} value={intent}>
                      {intent}
                    </option>
                  ))}
                </select>
                */}
                <label className="grid gap-2 text-sm font-semibold text-[color:var(--career-primary-ink)]">
                  <span>
                    <span className="text-[#C88A18]">*</span> Preferred consultation date{" "}
                    <span className="font-medium text-[color:var(--career-muted)]">
                      (optional)
                    </span>
                  </span>
                  <input className={fieldClass} type="date" value={form.preferredDate} onChange={updateField("preferredDate")} />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[color:var(--career-primary-ink)]">
                  <span>
                    <span className="text-[#C88A18]">*</span> Preferred consultation time{" "}
                    <span className="font-medium text-[color:var(--career-muted)]">
                      (optional)
                    </span>
                  </span>
                  <input className={fieldClass} type="time" value={form.preferredTime} onChange={updateField("preferredTime")} />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-[color:var(--career-primary-ink)] md:col-span-2">
                  <span>
                    <span className="text-[#C88A18]">*</span> Tell us about yourself{" "}
                    <span className="font-medium text-[color:var(--career-muted)]">
                      (optional)
                    </span>
                  </span>
                  <textarea
                    className="min-h-28 w-full rounded-lg border border-[color:var(--career-border)] bg-white px-3 py-3 text-sm text-[color:var(--career-primary-ink)] outline-none transition placeholder:text-slate-400 focus:border-[color:var(--career-primary)] focus:shadow-[0_0_0_3px_hsl(var(--gold)/0.18)]"
                    placeholder="Share anything useful, like your goals, current confusion, preferred country, course interests, or parent/student concerns."
                    value={form.remarks}
                    onChange={updateField("remarks")}
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={sendWhatsAppRequest}
                  className="career-primary-button inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition"
                >
                  <MessageCircle size={17} />
                  Send via WhatsApp
                </button>
                <span className="text-center text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--career-muted)]">
                  or
                </span>
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
          </section>

          <aside className="career-card career-gold-card rounded-2xl p-5 md:p-8">
            <p className="career-eyebrow">Contact Us</p>
            <h2 className="career-heading mt-3 font-heading text-3xl font-bold">
              Prefer a direct conversation?
            </h2>
            <p className="career-copy mt-4 text-sm leading-7">
              Reach out directly and our team will help you choose the right
              counselling or admission path.
            </p>

            <div className="mt-7 grid gap-4">
              <a
                href="tel:+918848674757"
                className="flex items-center gap-4 rounded-lg border border-[#0A2342]/10 bg-white p-4 text-[#0A2342] transition hover:border-[#C88A18]"
              >
                <Phone className="text-[#C88A18]" size={22} />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#C88A18]">
                    Mobile
                  </span>
                  <span className="font-bold">{PHONE_NUMBER}</span>
                </span>
              </a>
              <a
                href={WHATSAPP_URL}
                className="flex items-center gap-4 rounded-lg border border-[#0A2342]/10 bg-white p-4 text-[#0A2342] transition hover:border-[#24C65A]"
              >
                <MessageCircle className="text-[#24C65A]" size={22} />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#24C65A]">
                    WhatsApp
                  </span>
                  <span className="font-bold">Chat with DreamGlobal</span>
                </span>
              </a>
              <a
                href="mailto:dreamglobalin@gmail.com"
                className="flex items-center gap-4 rounded-lg border border-[#0A2342]/10 bg-white p-4 text-[#0A2342] transition hover:border-[#C88A18]"
              >
                <Mail className="text-[#C88A18]" size={22} />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#C88A18]">
                    Email
                  </span>
                  <span className="font-bold">dreamglobalin@gmail.com</span>
                </span>
              </a>
            </div>

            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0A2342]">
                Social Links
              </p>
              <div className="mt-3 flex gap-3">
                {[
                  {
                    label: "Facebook",
                    href: "https://www.facebook.com/share/1C5Pv8xJy5/?mibextid=wwXIfr",
                    icon: Facebook,
                  },
                  {
                    label: "Instagram",
                    href: "https://www.instagram.com/dreamglobal.in?utm_source=qr",
                    icon: Instagram,
                  },
                  {
                    label: "Threads",
                    href: "https://www.threads.com/@dreamglobal.in?invite=0",
                    icon: AtSign,
                  },
                  { label: "Website", href: "https://dreamglobal.edumilestones.com/", icon: Globe },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#0A2342]/12 bg-white text-[#0A2342] transition hover:border-[#C88A18] hover:text-[#C88A18]"
                      aria-label={item.label}
                    >
                      <Icon size={19} />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-[#071F41] p-5 text-white">
              <CalendarCheck className="text-[#D6A329]" size={24} />
              <p className="mt-3 font-heading text-2xl font-semibold">
                We will confirm your slot.
              </p>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Date and time are optional. If you leave them flexible, the
                team will suggest the earliest suitable consultation time.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookConsultation;
