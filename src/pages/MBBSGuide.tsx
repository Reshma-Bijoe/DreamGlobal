import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

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

const MBBSGuide = () => (
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

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-yellow-700">
              Processing support
            </p>
            <h3 className="mt-3 text-2xl font-bold text-slate-950">
              Student-facing fee structure
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              MBBS abroad processing support is typically structured in two
              stages: INR 25,000 at application and INR 25,000 after offer.
            </p>
            <Link
              to="/mbbs#mbbs-forms"
              className="gold-gradient-bg mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Start MBBS enquiry
            </Link>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default MBBSGuide;
