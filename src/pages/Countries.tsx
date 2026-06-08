import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { countryDestinations } from "@/data/countryDestinations";

const Countries = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <main className="px-4 pb-16 pt-52 sm:pt-48">
      <section className="container mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Study destinations
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Explore countries with DreamGlobal.
          </h1>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {countryDestinations.map((country) => (
            <Link
              key={country.id}
              to={country.route}
              className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={country.image}
                  alt={country.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  {country.name}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {country.tagline}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  View country
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default Countries;
