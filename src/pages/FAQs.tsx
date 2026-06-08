import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { countryDestinations } from "@/data/countryDestinations";
import { genericFaqs } from "@/data/faqs";

const FAQs = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <main className="px-4 pb-16 pt-52 sm:pt-48">
      <section className="container mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Student FAQs
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Answers before you start your study abroad journey.
          </h1>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_0.36fr]">
          <FaqAccordion items={genericFaqs} />

          <aside className="h-fit rounded-lg border border-border bg-card p-5 shadow-sm lg:sticky lg:top-36">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Country FAQs
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              For destination-specific questions, open the country page.
            </p>
            <div className="mt-5 grid gap-2">
              {countryDestinations.map((country) => (
                <Link
                  key={country.id}
                  to={country.route}
                  className="rounded-md border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
                >
                  {country.name}
                </Link>
              ))}
            </div>
            <a
              href="https://wa.me/918848674757"
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
    </main>

    <Footer />
  </div>
);

export default FAQs;
