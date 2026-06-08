import irelandImage from "@/countries/ireland.png";
import type { CountryDestination } from "@/data/countryDestinations";

export const irelandDestination: CountryDestination = {
  id: "ireland",
  name: "Ireland",
  image: irelandImage,
  route: "/countries/ireland",
  tagline:
    "Study in an English-speaking European hub for technology, business, and research.",
  whyStudyHere:
    "Ireland offers globally connected universities, welcoming student cities, and strong links to leading international employers across technology, finance, healthcare, and life sciences.",
  highlights: [
    "Popular programs in IT, business, data, healthcare, and engineering",
    "English-speaking study destination with access to Europe",
    "Strong graduate career pathways for eligible students",
  ],
  faqs: [
    {
      question: "Why should I consider Ireland for studies?",
      answer:
        "Ireland is an English-speaking European destination with strong programs in technology, business, data, healthcare, engineering, and research.",
    },
    {
      question: "Is Ireland good for technology and business courses?",
      answer:
        "Yes. Ireland has strong links with global technology, finance, life sciences, and business employers, making it attractive for career-focused students.",
    },
    {
      question: "What are the main Ireland intakes?",
      answer:
        "September is the main intake, and some universities also offer January intake options depending on the program.",
    },
    {
      question: "Can international students work after studying in Ireland?",
      answer:
        "Eligible graduates may access post-study stay-back options under current Irish immigration rules, depending on course level and qualification.",
    },
  ],
};
