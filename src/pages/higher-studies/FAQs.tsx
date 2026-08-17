import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { countryDestinations } from "@/data/countryDestinations";
import { genericFaqs } from "@/data/faqs";
import { faqs as careerFaqs } from "@/lib/careerCounsellingData";
import { WHATSAPP_URL } from "@/lib/careerCounsellingData";

const careerFaqItems = careerFaqs.map((faq) => ({
  question: faq.q,
  answer: faq.a,
}));

const FAQs = () => (
  <div className="career-theme min-h-screen">
    <Navbar />

    <main className="career-hero-surface relative overflow-hidden px-4 pb-16 pt-36 md:pt-32">
      <section className="container mx-auto max-w-[96rem]">
        <div className="max-w-3xl">
          <p className="career-eyebrow">
            DreamGlobal FAQs
          </p>
          <h1 className="career-heading mt-4 max-w-5xl font-heading text-4xl font-bold leading-tight sm:text-5xl">
            Clear answers for your next career or education decision.
          </h1>
          <p className="career-copy mt-5 max-w-3xl text-base leading-7 sm:text-lg">
            Explore the questions students and families ask most about career
            counselling, higher studies, and studying abroad.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3" aria-label="FAQ sections">
          <a
            href="#career-counselling"
            className="career-gold-card rounded-md px-4 py-2 text-sm font-semibold text-[color:var(--career-primary-ink)] transition hover:-translate-y-0.5"
          >
            Career Counselling FAQs
          </a>
          <a
            href="#study-abroad"
            className="career-gold-card rounded-md px-4 py-2 text-sm font-semibold text-[color:var(--career-primary-ink)] transition hover:-translate-y-0.5"
          >
            Study Abroad FAQs
          </a>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          <section id="career-counselling" className="scroll-mt-36">
            <p className="career-eyebrow">
              Career Counselling
            </p>
            <h2 className="career-heading mt-3 font-heading text-3xl font-bold sm:text-4xl">
              Understand your strengths and options.
            </h2>
            <div className="mt-7">
              <FaqAccordion items={careerFaqItems} />
            </div>
          </section>

          <section id="study-abroad" className="scroll-mt-36">
            <p className="career-eyebrow">
              Study Abroad
            </p>
            <h2 className="career-heading mt-3 font-heading text-3xl font-bold sm:text-4xl">
              Plan your international education journey.
            </h2>
            <div className="mt-7 grid gap-6">
              <FaqAccordion items={genericFaqs} />

              <aside className="career-card h-fit rounded-lg p-5 lg:sticky lg:top-36">
                <h3 className="career-heading font-heading text-xl font-semibold">
                  Country FAQs
                </h3>
                <p className="career-copy mt-2 text-sm leading-6">
                  For destination-specific questions, open the country page.
                </p>
                <div className="mt-5 grid gap-2">
                  {countryDestinations.map((country) => (
                    <Link
                      key={country.id}
                      to={country.route}
                      className="rounded-md border border-[color:var(--career-border)] bg-white/70 px-3 py-2 text-sm font-semibold text-[color:var(--career-primary-ink)] transition hover:border-[color:var(--career-primary)] hover:text-[color:var(--career-primary-deep)]"
                    >
                      {country.name}
                    </Link>
                  ))}
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent"
                >
                  <MessageCircle size={17} />
                  Ask on WhatsApp
                </a>
              </aside>
            </div>
          </section>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default FAQs;
