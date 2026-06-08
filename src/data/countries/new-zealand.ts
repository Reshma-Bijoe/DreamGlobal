import newZealandImage from "@/countries/new zealand.png";
import type { CountryDestination } from "@/data/countryDestinations";

export const newZealandDestination: CountryDestination = {
  id: "new-zealand",
  name: "New Zealand",
  image: newZealandImage,
  route: "/countries/new-zealand",
  tagline:
    "Study in a safe, welcoming destination with practical learning and strong student support.",
  whyStudyHere:
    "New Zealand offers globally respected education, smaller student-friendly cities, practical learning, and strong programs in business, IT, hospitality, healthcare, agriculture, and applied sciences.",
  highlights: [
    "Welcoming campuses with supportive learning environments",
    "Practical programs across business, IT, healthcare, and hospitality",
    "Safe student cities with a strong quality-of-life focus",
  ],
  faqs: [
    {
      question: "Why study in New Zealand?",
      answer:
        "New Zealand is known for quality education, safe student cities, practical learning, and supportive institutions for international students.",
    },
    {
      question: "What are the popular courses in New Zealand?",
      answer:
        "Popular options include business, IT, healthcare, hospitality, agriculture, applied sciences, and postgraduate programs.",
    },
    {
      question: "What intakes are available in New Zealand?",
      answer:
        "February and July are common intakes, with selected institutions offering additional starts depending on the course.",
    },
    {
      question: "Do I need an English test for New Zealand?",
      answer:
        "Most institutions require proof of English proficiency through IELTS, PTE, TOEFL, or accepted alternatives based on university rules.",
    },
  ],
};
