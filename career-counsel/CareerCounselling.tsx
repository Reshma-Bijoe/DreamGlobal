import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  GraduationCap,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import DreamGlobalLogo from "../src/assets/DreamGlobalLogo.jpeg";
import { supabase } from "../supabaseClient";
import {
  CAREER_TEST_URL,
  FOUNDER_NAME,
  PHONE_NUMBER,
  WHATSAPP_NUMBER,
  actionCards,
  counsellingBenefits,
  faqs,
  founderHighlights,
  intentOptions,
  roadmapSteps,
  serviceBand,
  studentImages,
} from "./src/lib/site-data";
import { CareerCounselling as CareerCounsellingSection } from "./src/components/CareerCounselling";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../src/components/ui/accordion";

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

const fieldClass =
  "h-11 w-full rounded-md border border-[#b9dff2] bg-white px-3 text-sm text-[#18324a] outline-none transition placeholder:text-[#6d8494] focus:border-[#0e83b6] focus:ring-2 focus:ring-[#9bdff5]/60";

const CareerCounselling = () => {
  const formRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<CounsellingForm>(initialForm);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        [
          "DreamGlobal counselling request",
          `Name: ${form.name}`,
          `Age: ${form.age}`,
          `Grade/Class: ${form.grade}`,
          `Location: ${form.location}`,
          `Phone: ${form.phone}`,
          `Email: ${form.email}`,
          `Intent: ${form.intent}`,
          `Preferred Date: ${form.preferredDate}`,
          `Preferred Time: ${form.preferredTime}`,
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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const { error } = await supabase.from("leads").insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      interest: [
        `Career counselling: ${form.intent}`,
        `Age: ${form.age}`,
        `Grade/Class: ${form.grade}`,
        `Location: ${form.location}`,
        `Preferred: ${form.preferredDate} ${form.preferredTime}`,
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
    <div className="min-h-screen bg-white text-[#18324a]">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-[#d8f3ff] via-[#f0fbff] to-white pt-36 md:pt-40">
        <div className="pointer-events-none absolute inset-x-0 top-32 h-28 overflow-hidden">
          <Sparkles className="absolute left-[8%] top-7 size-5 text-[#65bfe5]/55" />
          <Sparkles className="absolute left-[24%] top-14 size-3 text-[#91d7f2]/60" />
          <Sparkles className="absolute right-[18%] top-8 size-4 text-[#52b5df]/50" />
          <Sparkles className="absolute right-[7%] top-16 size-3 text-[#9bdff5]/65" />
        </div>

        <section className="relative px-4 pb-14 pt-10 md:pb-20">
          <div className="container mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0e83b6]">
                Career Guidance
              </p>
              <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-[#18324a] sm:text-5xl lg:text-6xl">
                Your Future Deserves More Than a Guess.
              </h1>
              <p className="mt-5 text-xl font-semibold text-[#2b6687]">
                Discover the right career. Choose the right path. Build a
                future without limits.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#41647b]">
                DreamGlobal helps students understand their strengths, explore
                career possibilities and make confident decisions about
                education and their future through personalised guidance and
                structured career assessment.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={CAREER_TEST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0e83b6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#09658f]"
                >
                  Take Career Test
                  <ArrowRight size={17} />
                </a>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[#a9d8ee] bg-white/80 px-6 py-3 text-sm font-bold text-[#18324a] transition hover:border-[#0e83b6] hover:text-[#0e83b6]"
                >
                  <CalendarCheck size={17} />
                  Book Free Counselling
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/70 bg-white shadow-2xl shadow-[#65bfe5]/25 sm:aspect-[5/4]">
                <div className="flex h-full w-[300%] animate-careerSlide">
                  {studentImages.map((image) => (
                    <img
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-1/3 object-cover"
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -left-3 top-8 rounded-full bg-white/95 px-4 py-3 text-sm font-bold text-[#18324a] shadow-lg shadow-[#65bfe5]/20">
                7,500+ Students Guided
              </div>
              <div className="absolute -bottom-4 right-4 rounded-full bg-[#18324a] px-4 py-3 text-sm font-bold text-white shadow-lg">
                25+ Years Experience
              </div>
            </motion.div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-[#b9dff2] bg-white/80 py-4">
          <div className="flex w-max animate-careerMarquee gap-8 whitespace-nowrap">
            {[...serviceBand, ...serviceBand].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="text-sm font-bold uppercase tracking-[0.18em] text-[#2b6687]"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <CareerCounsellingSection />

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-3">
              {actionCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-lg border border-[#b9dff2] bg-white p-6 shadow-xl shadow-[#73c8e8]/15"
                >
                  <h3 className="font-heading text-2xl font-bold text-[#18324a]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#41647b]">
                    {card.description}
                  </p>
                  {card.type === "test" ? (
                    <a
                      href={CAREER_TEST_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0e83b6]"
                    >
                      {card.button}
                      <ArrowRight size={16} />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={scrollToForm}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0e83b6]"
                    >
                      {card.button}
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={formRef} id="counselling-form" className="px-4 py-16">
          <div className="container mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0e83b6]">
                Counselling Form
              </p>
              <h2 className="mt-4 font-heading text-3xl font-bold text-[#18324a] sm:text-5xl">
                Share your details and choose how to send them.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#41647b]">
                Use WhatsApp for a quick message or Submit Request to save the
                enquiry through the existing DreamGlobal lead flow.
              </p>
            </div>

            <form
              onSubmit={submitRequest}
              className="rounded-lg border border-[#b9dff2] bg-white p-5 shadow-xl shadow-[#73c8e8]/15 md:p-7"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <input className={fieldClass} placeholder="Name" required value={form.name} onChange={updateField("name")} />
                <input className={fieldClass} placeholder="Age" required value={form.age} onChange={updateField("age")} />
                <input className={fieldClass} placeholder="Grade/Class" required value={form.grade} onChange={updateField("grade")} />
                <input className={fieldClass} placeholder="Location" required value={form.location} onChange={updateField("location")} />
                <input className={fieldClass} placeholder="Phone Number" type="tel" required value={form.phone} onChange={updateField("phone")} />
                <input className={fieldClass} placeholder="Email" type="email" required value={form.email} onChange={updateField("email")} />
                <select className={fieldClass} value={form.intent} onChange={updateField("intent")}>
                  {intentOptions.map((intent) => (
                    <option key={intent} value={intent}>
                      {intent}
                    </option>
                  ))}
                </select>
                <input className={fieldClass} type="date" required value={form.preferredDate} onChange={updateField("preferredDate")} />
                <input className={fieldClass} type="time" required value={form.preferredTime} onChange={updateField("preferredTime")} />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-600"
                >
                  <MessageCircle size={17} />
                  Send via WhatsApp
                </a>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0e83b6] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#09658f] disabled:opacity-60"
                >
                  <Send size={17} />
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
              {message && (
                <p className="mt-4 text-sm font-semibold text-[#2b6687]">
                  {message}
                </p>
              )}
            </form>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto grid max-w-7xl gap-10 rounded-lg border border-[#b9dff2] bg-white p-6 shadow-xl shadow-[#73c8e8]/15 md:grid-cols-[0.85fr_1.15fr] md:p-8">
            <div className="relative min-h-80 overflow-hidden rounded-lg bg-gradient-to-br from-[#d8f3ff] to-white">
              <img
                src={DreamGlobalLogo}
                alt={`${FOUNDER_NAME} profile placeholder`}
                className="h-full w-full object-contain p-16"
              />
              <div className="absolute left-5 top-5 rounded-full bg-[#18324a] px-4 py-2 text-sm font-bold text-white">
                25+ Years Experience
              </div>
              <p className="absolute bottom-5 left-5 right-5 rounded-full bg-white/90 px-4 py-3 text-xs font-bold text-[#18324a]">
                Guiding students in India and across global education pathways
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0e83b6]">
                The Person Behind DreamGlobal
              </p>
              <h2 className="mt-4 font-heading text-3xl font-bold text-[#18324a] sm:text-5xl">
                More Than Guidance. A Journey Built Around Students.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#41647b]">
                Sudarshan Sonawane has spent decades helping students and
                families make informed education and career decisions through
                structured counselling, psychometric insight, and practical
                mentoring.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {founderHighlights.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check size={17} className="text-[#0e83b6]" />
                    <span className="text-sm font-semibold text-[#18324a]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                to="/founder"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-md bg-[#0e83b6] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#09658f]"
              >
                Explore Founder
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-heading text-3xl font-bold text-[#18324a] sm:text-5xl">
              FAQs
            </h2>
            <Accordion type="single" collapsible className="mt-8 rounded-lg border border-[#b9dff2] bg-white px-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-bold text-[#18324a] hover:text-[#0e83b6]">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="leading-7 text-[#41647b]">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto max-w-5xl rounded-lg bg-[#18324a] p-8 text-center text-white shadow-xl shadow-[#18324a]/20">
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
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0e83b6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#30a6d5]"
              >
                Take the Career Test
                <ArrowRight size={17} />
              </a>
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#18324a]"
              >
                Book Free Counselling
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CareerCounselling;
