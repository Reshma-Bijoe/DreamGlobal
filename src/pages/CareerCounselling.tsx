import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  CalendarCheck,
  Check,
  Compass,
  GraduationCap,
  Map,
  MessageCircle,
  Rocket,
  Send,
  Sparkles,
  Star,
  Target,
  UserCheck,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import founder from "../assets/founder.jpeg";
import { supabase } from "../../supabaseClient";
import {
  CAREER_TEST_URL,
  FOUNDER_NAME,
  WHATSAPP_URL,
  assessmentPaths,
  careerPlanningServices,
  careerTestimonials,
  faqs,
  founderHighlights,
  intentOptions,
  serviceBand,
  studentImages,
} from "../lib/careerCounsellingData";
import { CareerCounselling as CareerCounsellingSection } from "../components/CareerCounsellingSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

type CounsellingForm = {
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

const initialForm: CounsellingForm = {
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

const serviceIcons = [
  Compass,
  Brain,
  Map,
  Target,
  UserCheck,
  Rocket,
  Sparkles,
  GraduationCap,
];

const SectionDivider = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center gap-3">
    <span className="h-px w-12 bg-[color:var(--career-primary)]" />
    <span className="h-2 w-2 rounded-full bg-[color:var(--career-primary)]" />
    <p className="career-eyebrow">{label}</p>
    <span className="h-2 w-2 rounded-full bg-[color:var(--career-primary)]" />
    <span className="h-px w-12 bg-[color:var(--career-primary)]" />
  </div>
);

const CareerCounselling = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<CounsellingForm>(initialForm);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  const openBookConsultation = useCallback(() => {
    navigate("/book-consultation", {
      replace: window.location.hash === "#counselling-form",
    });
  }, [navigate]);

  useEffect(() => {
    const redirectHashedForm = () => {
      if (window.location.hash === "#counselling-form") {
        openBookConsultation();
      }
    };

    redirectHashedForm();
    window.addEventListener("hashchange", redirectHashedForm);
    window.addEventListener("dreamglobal:open-counselling-form", openBookConsultation);

    return () => {
      window.removeEventListener("hashchange", redirectHashedForm);
      window.removeEventListener("dreamglobal:open-counselling-form", openBookConsultation);
    };
  }, [openBookConsultation]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroImageIndex((current) => (current + 1) % studentImages.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        [
          "DreamGlobal counselling request",
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
    (field: keyof CounsellingForm) =>
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

  const closeForm = () => {
    setIsFormOpen(false);
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
        `Career counselling: ${form.intent}`,
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
      console.error("Career counselling request failed:", error);
      setMessage("Sorry, we could not submit this right now.");
      return;
    }

    setForm(initialForm);
    setMessage("Request sent. We will contact you soon.");
  };

  return (
    <div className="career-theme min-h-screen">
      <Navbar />

      <main className="career-hero-surface relative overflow-hidden pt-44 md:pt-40">
        <section className="relative px-4 pb-14 pt-10 md:pb-20">
          <div className="container mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="career-eyebrow">
                Career Guidance
              </p>
              <h1 className="career-heading mt-5 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Your Future Deserves More Than a Guess.
              </h1>
              <p className="mt-5 text-lg font-semibold text-[color:var(--career-primary-deep)] sm:text-xl">
                Discover the right career. Choose the right path. Build a
                future without limits.
              </p>
              <p className="career-copy mt-5 max-w-2xl text-sm leading-7 sm:text-base sm:leading-8">
                DreamGlobal helps students understand their strengths, explore
                career possibilities and make confident decisions about
                education and their future through personalised guidance and
                structured career assessment.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={CAREER_TEST_URL}
                  className="career-primary-button inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition"
                >
                  Take Career Test
                  <ArrowRight size={17} />
                </a>
                <Link
                  to="/book-consultation"
                  className="career-primary-button inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition"
                >
                  <CalendarCheck size={17} />
                  Book Free Consultation
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative lg:translate-x-8 xl:translate-x-12"
            >
              <div className="career-glass-card relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[5/4]">
                <motion.img
                  key={studentImages[heroImageIndex].src}
                  src={studentImages[heroImageIndex].src}
                  alt={studentImages[heroImageIndex].alt}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0.2, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              </div>
              <div className="career-card absolute -left-3 top-8 rounded-full px-4 py-3 text-sm font-bold text-[color:var(--career-primary-ink)]">
                7,500+ Students Mentored
              </div>
              <div className="career-gold-pill absolute -bottom-4 right-4 rounded-full px-4 py-3 text-sm font-bold">
                30+ Years Experience
              </div>
            </motion.div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-[color:var(--career-border)] bg-white/80 py-4 backdrop-blur">
          <div className="flex w-max animate-careerMarquee items-center gap-7 whitespace-nowrap">
            {[...serviceBand, ...serviceBand].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center gap-7 text-sm font-bold uppercase tracking-[0.18em] text-[color:var(--career-primary-deep)]"
              >
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--career-primary)]" />
              </span>
            ))}
          </div>
        </section>

        <CareerCounsellingSection />

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <SectionDivider label="Scientific Diagnostics" />
              <h2 className="career-heading mt-4 font-heading text-3xl font-bold sm:text-5xl">
                Choose the assessment path that fits your stage.
              </h2>
              <p className="career-copy mt-4 text-base leading-7">
                Empirically designed evaluation tracks help students and
                professionals uncover genuine alignment, academic direction, and
                future potential.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {assessmentPaths.map((assessment) => (
                <article
                  key={assessment.title}
                  className="career-card career-gold-card flex h-full flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--career-shadow-float)]"
                >
                  <p className="career-eyebrow">{assessment.category}</p>
                  <h3 className="career-heading mt-3 font-heading text-2xl font-bold">
                    {assessment.title}
                  </h3>
                  <div className="mt-5 border-l-4 border-[color:var(--career-primary)] pl-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--career-primary-deep)]">
                      Core Objective
                    </p>
                    <p className="mt-2 text-sm font-bold leading-6 text-[color:var(--career-primary-ink)]">
                      {assessment.objective}
                    </p>
                  </div>
                  <p className="career-copy mt-4 flex-1 text-sm leading-7">
                    {assessment.description}
                  </p>
                  <a
                    href={assessment.href}
                    className="career-gold-link mt-6 inline-flex items-center gap-2 text-sm font-bold"
                  >
                    Start Assessment
                    <ArrowRight size={16} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section-padding bg-white/65">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <SectionDivider label="Services" />
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
                Practical support for every important decision.
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                These are the focused services students and families can choose
                from after the discovery stage, depending on the decision they
                need to make next.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {careerPlanningServices.map((service, index) => {
                const Icon = serviceIcons[index % serviceIcons.length];

                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="glass-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                  >
                    <div className="gold-gradient-bg mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110">
                      <Icon size={22} className="text-primary-foreground" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                to="/book-consultation"
                className="career-primary-button inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition"
              >
                <CalendarCheck size={17} />
                Book Free Consultation
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="career-gold-card container mx-auto grid max-w-7xl gap-10 rounded-2xl border bg-white p-6 shadow-[var(--career-shadow-soft)] md:grid-cols-[0.85fr_1.15fr] md:p-8">
            <div className="career-founder-panel relative min-h-80 overflow-hidden rounded-2xl">
              <img
                src={founder}
                alt={`${FOUNDER_NAME} profile placeholder`}
                className="h-full w-full object-contain p-16"
              />
              <div className="career-gold-pill absolute left-5 top-5 rounded-full px-4 py-2 text-sm font-bold">
                30+ Years Experience
              </div>
              <p className="career-card absolute bottom-5 left-5 right-5 rounded-full px-4 py-3 text-xs font-bold text-[color:var(--career-primary-ink)]">
                Guiding students in India and across global education pathways
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex justify-start">
                <SectionDivider label="The Person Behind DreamGlobal" />
              </div>
              <h2 className="career-heading mt-4 font-heading text-3xl font-bold sm:text-5xl">
                More Than Guidance. A Journey Built Around Students.
              </h2>
              <p className="career-copy mt-5 text-base leading-8">
                {FOUNDER_NAME} brings 30+ years of global technology leadership,
                career mentoring, talent evaluation, and international
                education expertise to help students make confident,
                future-ready decisions.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {founderHighlights.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check size={17} className="text-[color:var(--career-primary)]" />
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
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="flex justify-start">
                  <SectionDivider label="Student Stories" />
                </div>
                <h2 className="career-heading mt-4 font-heading text-3xl font-bold sm:text-5xl">
                  Clarity students and parents can feel.
                </h2>
              </div>
              <p className="career-copy max-w-md text-sm leading-6">
                Real guidance should leave families calmer, more focused, and
                ready for the next decision.
              </p>
            </div>

            <div className="career-review-viewport mt-9 overflow-hidden py-2">
              <div className="career-review-track flex w-max gap-5">
                {[...careerTestimonials, ...careerTestimonials].map((testimonial, index) => (
                <motion.article
                  key={`${testimonial.name}-${index}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: (index % careerTestimonials.length) * 0.03 }}
                  className="career-card w-[18rem] shrink-0 rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--career-shadow-float)] sm:w-[21rem] lg:w-[23rem]"
                >
                  <div className="flex min-h-56 flex-col justify-between">
                    <p className="career-copy text-sm leading-7">
                      {testimonial.quote}
                    </p>
                    <div className="mt-5 border-t border-[color:var(--career-border)] pt-4">
                      <p className="font-bold text-[color:var(--career-primary-ink)]">
                        {testimonial.name}
                      </p>
                      <p className="career-copy mt-1 text-xs font-semibold uppercase tracking-[0.16em]">
                        {testimonial.detail}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-sm font-bold text-[color:var(--career-primary-ink)]">
                        <span className="flex text-amber-400" aria-label={`${testimonial.rating} out of 5 stars`}>
                          {[0, 1, 2, 3, 4].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className="fill-current"
                            />
                          ))}
                        </span>
                        <span>{testimonial.rating}/5</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <SectionDivider label="FAQs" />
            <h2 className="career-heading mt-4 font-heading text-3xl font-bold sm:text-5xl">
              FAQs
            </h2>
            <Accordion type="single" collapsible className="career-card mt-8 rounded-2xl px-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-bold text-[color:var(--career-primary-ink)] hover:text-[color:var(--career-primary)]">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="career-copy leading-7">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-5xl rounded-2xl bg-[color:var(--career-primary-ink)] p-8 text-center text-white shadow-xl shadow-[#18324a]/20 ring-1 ring-[color:var(--career-primary)]/25">
            <h2 className="font-heading text-3xl font-bold sm:text-5xl">
              Your Future Starts With One Conversation.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/75">
              Start with clarity, understand your options, and build a plan
              that feels right for the student.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={CAREER_TEST_URL}
                className="career-primary-button inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition"
              >
                Take the Career Test
                <ArrowRight size={17} />
              </a>
              <Link
                to="/book-consultation"
                className="career-primary-button inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[color:var(--career-primary-ink)]/55 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="counselling-form-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.24 }}
            className="career-card max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-5 md:p-7"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="career-eyebrow">Book Free Counselling</p>
                <h2
                  id="counselling-form-title"
                  className="career-heading mt-2 font-heading text-2xl font-bold sm:text-3xl"
                >
                  Share your details
                </h2>
                <p className="career-copy mt-2 text-sm leading-6">
                  Send through WhatsApp or save it as a counselling request.
                </p>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[color:var(--career-border)] bg-white text-[color:var(--career-primary-ink)] transition hover:text-[color:var(--career-primary)]"
                aria-label="Close counselling form"
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
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-600"
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
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CareerCounselling;
