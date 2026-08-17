import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { careerTestimonials } from "@/lib/careerCounsellingData";

const studyAbroadTestimonials = [
  {
    name: "Study abroad applicant",
    detail: "University shortlisting",
    rating: "5.0",
    quote:
      "The team helped me compare countries, courses, budgets, and timelines without making the decision feel overwhelming.",
  },
  {
    name: "Parent of an international applicant",
    detail: "Admission and visa planning",
    rating: "4.9",
    quote:
      "We always knew what the next step was. The guidance from shortlisting through visa preparation gave our family real confidence.",
  },
  {
    name: "Higher studies student",
    detail: "Profile and application support",
    rating: "4.8",
    quote:
      "My application plan became much clearer after the counselling. I understood how my interests, profile, and course choice fit together.",
  },
  {
    name: "Study abroad family",
    detail: "Pre-departure guidance",
    rating: "4.9",
    quote:
      "The support went beyond admission. We also received practical guidance for documents, accommodation, travel, and settling in.",
  },
];

const careerStories = careerTestimonials.map((testimonial) => ({
  ...testimonial,
  category: "Career Counselling",
}));

const studyAbroadStories = studyAbroadTestimonials.map((testimonial) => ({
  ...testimonial,
  category: "Study Abroad",
}));

const Testimonials = () => (
  <div className="career-theme min-h-screen">
    <Navbar />

    <main className="career-hero-surface relative overflow-hidden px-4 pb-16 pt-36 md:pt-32">
      <section className="container mx-auto max-w-[96rem]">
        <div className="max-w-3xl">
          <p className="career-eyebrow">Student Stories</p>
          <h1 className="career-heading mt-3 font-heading text-4xl font-bold leading-tight sm:text-6xl">
            Clearer choices. More confident futures.
          </h1>
          <p className="career-copy mt-5 max-w-2xl text-base leading-8 sm:text-lg">
            Every student starts with a different question. These stories reflect
            the kind of clarity, structure, and personal guidance DreamGlobal is
            built to provide.
          </p>
        </div>

        <div className="mt-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="career-eyebrow">Career Counselling</p>
              <h2 className="career-heading mt-2 font-heading text-3xl font-bold sm:text-4xl">
                Finding direction with less pressure.
              </h2>
            </div>
            <p className="career-copy max-w-md text-sm leading-6">
              Support for students and parents navigating streams, courses, and
              long-term career decisions.
            </p>
          </div>
          <TestimonialCarousel
            items={careerStories}
            ariaLabel="Career counselling testimonials"
          />
        </div>

        <div className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="career-eyebrow">Study Abroad</p>
              <h2 className="career-heading mt-2 font-heading text-3xl font-bold sm:text-4xl">
                Making global education feel manageable.
              </h2>
            </div>
            <p className="career-copy max-w-md text-sm leading-6">
              From the first shortlist to the next flight, families deserve a
              plan they can understand at every stage.
            </p>
          </div>
          <TestimonialCarousel
            items={studyAbroadStories}
            ariaLabel="Study abroad testimonials"
          />
        </div>

        <div className="mt-14 rounded-2xl bg-[color:var(--career-primary-ink)] p-8 text-center text-white shadow-xl shadow-[#18324a]/20 sm:p-10">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Ready to plan your next step?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/75">
            Start with one conversation and leave with a clearer direction for
            your career or study-abroad journey.
          </p>
          <Link
            to="/book-consultation"
            className="dream-gold-button mt-6 inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold"
          >
            Book a Consultation
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default Testimonials;
