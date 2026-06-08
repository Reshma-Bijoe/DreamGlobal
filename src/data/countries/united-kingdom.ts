import ukImage from "@/countries/uk.png";
import type { CountryDestination } from "@/data/countryDestinations";

export const unitedKingdomDestination: CountryDestination = {
  id: "united-kingdom",
  name: "United Kingdom",
  image: ukImage,
  route: "/countries/united-kingdom",
  tagline: "Earn a world-recognized qualification with flexible study choices.",
  whyStudyHere:
    "The UK offers internationally recognized degrees, shorter course durations, diverse campuses, and strong exposure to global employers and industries.",
  highlights: [
    "One-year master's options at many institutions",
    "World-renowned academic standards and research culture",
    "Graduate route opportunities for eligible students",
  ],
  faqs: [
    {
      question: "Why is the UK popular for international students?",
      answer:
        "The UK offers globally recognized degrees, shorter course durations, strong academic standards, and a wide range of universities and programs.",
    },
    {
      question: "Can I study a one-year master's in the UK?",
      answer:
        "Yes. Many UK universities offer one-year master's programs, which can reduce overall time and living costs compared with longer study routes.",
    },
    {
      question: "What intakes are common in the UK?",
      answer:
        "September is the main intake, while January and other smaller intakes may be available depending on the university and course.",
    },
    {
      question: "Does the UK offer post-study work options?",
      answer:
        "Eligible international students may access graduate route opportunities after completing a qualifying course, subject to current visa rules.",
    },
  ],
};
