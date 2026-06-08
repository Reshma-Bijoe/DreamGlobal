import canadaImage from "@/countries/canada.png";
import type { CountryDestination } from "@/data/countryDestinations";

export const canadaDestination: CountryDestination = {
  id: "canada",
  name: "Canada",
  image: canadaImage,
  route: "/countries/canada",
  tagline: "Study in a welcoming destination with strong career-focused pathways.",
  whyStudyHere:
    "Canada combines quality education, safe student cities, practical learning, and opportunities to gain international work exposure after graduation.",
  highlights: [
    "Career-oriented diplomas, degrees, and postgraduate programs",
    "Friendly multicultural campuses across major student cities",
    "Practical learning and co-op opportunities at many institutions",
  ],
  faqs: [
    {
      question: "Why is Canada a strong study destination?",
      answer:
        "Canada is known for quality education, practical learning, multicultural campuses, and career-focused diplomas, degrees, and postgraduate programs.",
    },
    {
      question: "Are co-op programs available in Canada?",
      answer:
        "Many Canadian institutions offer co-op or practical learning options, especially in career-oriented programs, though availability depends on the course.",
    },
    {
      question: "What intakes are common in Canada?",
      answer:
        "September is the major intake, with January and May options available at selected institutions and programs.",
    },
    {
      question: "Do I need IELTS for Canada?",
      answer:
        "Most institutions require proof of English ability. IELTS, PTE, TOEFL, or accepted alternatives may be allowed depending on the university or college.",
    },
  ],
};
