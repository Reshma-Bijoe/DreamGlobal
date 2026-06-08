import spainImage from "@/countries/spain.png";
import type { CountryDestination } from "@/data/countryDestinations";

export const spainDestination: CountryDestination = {
  id: "spain",
  name: "Spain",
  image: spainImage,
  route: "/countries/spain",
  tagline:
    "Study in a vibrant European destination known for business, tourism, design, and culture.",
  whyStudyHere:
    "Spain offers an international student lifestyle, growing English-taught programs, respected business schools, and strong options in hospitality, tourism, design, management, and technology.",
  highlights: [
    "Strong choices in business, hospitality, tourism, design, and management",
    "International student cities with a vibrant European lifestyle",
    "English-taught programs available at many institutions",
  ],
  faqs: [
    {
      question: "Why should I consider Spain for studies?",
      answer:
        "Spain is a good option for students interested in business, hospitality, tourism, design, management, and a culturally rich European study experience.",
    },
    {
      question: "Are English-taught programs available in Spain?",
      answer:
        "Yes. Many institutions, especially business schools and international programs, offer English-taught courses.",
    },
    {
      question: "What are the common Spain intakes?",
      answer:
        "September is the main intake, while some institutions also offer February or rolling admissions depending on the program.",
    },
    {
      question: "Is Spanish language required?",
      answer:
        "Spanish may not be required for English-taught courses, but learning basic Spanish helps with daily life, networking, and part-time opportunities.",
    },
  ],
};
