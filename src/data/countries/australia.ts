import australiaImage from "@/countries/australia.png";
import type { CountryDestination } from "@/data/countryDestinations";

export const australiaDestination: CountryDestination = {
  id: "australia",
  name: "Australia",
  image: australiaImage,
  route: "/countries/australia",
  tagline:
    "Study in a practical, career-focused destination with globally respected universities.",
  whyStudyHere:
    "Australia combines strong academic standards, student-friendly cities, practical learning, and diverse program options across business, IT, healthcare, engineering, hospitality, and research.",
  highlights: [
    "Popular destination for career-oriented degrees and postgraduate programs",
    "Strong practical learning and industry exposure in many courses",
    "Multicultural student cities with globally recognized institutions",
  ],
  faqs: [
    {
      question: "Why do students choose Australia?",
      answer:
        "Students choose Australia for quality education, practical learning, multicultural campuses, and strong course options across business, IT, healthcare, engineering, and hospitality.",
    },
    {
      question: "What are the common Australia intakes?",
      answer:
        "February and July are the major intakes, with some universities offering additional intake options depending on the course.",
    },
    {
      question: "Do Australian universities require IELTS or PTE?",
      answer:
        "Most institutions ask for English proficiency. IELTS, PTE, TOEFL, or accepted alternatives may be considered depending on the university and program.",
    },
    {
      question: "Are scholarships available in Australia?",
      answer:
        "Many institutions offer scholarships based on academics, course level, and application strength. Availability varies by university and intake.",
    },
  ],
};
