import franceImage from "@/countries/france.png";
import type { CountryDestination } from "@/data/countryDestinations";

export const franceDestination: CountryDestination = {
  id: "france",
  name: "France",
  image: franceImage,
  route: "/countries/france",
  tagline: "Study in a global hub for culture, business, fashion, and research.",
  whyStudyHere:
    "France gives students access to respected public and private institutions, strong post-study career pathways, and a rich international lifestyle at the center of Europe.",
  highlights: [
    "Globally respected universities and business schools",
    "Strong options in management, fashion, hospitality, arts, and engineering",
    "A multicultural student experience with access to Europe",
  ],
  faqs: [
    {
      question: "Is France a good option for Indian students?",
      answer:
        "Yes. France is popular for business, fashion, hospitality, engineering, arts, and management programs, with strong international exposure and access to major European cities.",
    },
    {
      question: "Can I study in France in English?",
      answer:
        "Many French universities and private institutions offer English-taught programs, especially at bachelor's and master's level.",
    },
    {
      question: "Are scholarships available for France?",
      answer:
        "Scholarships can be available through institutions and government-backed programs. Eligibility depends on academics, course level, intake, and the university.",
    },
    {
      question: "Do I need French language skills before applying?",
      answer:
        "French is not always required for English-taught courses, but basic French is useful for daily life, part-time work, and adapting comfortably.",
    },
  ],
};
