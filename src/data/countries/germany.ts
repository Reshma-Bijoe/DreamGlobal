import germanyImage from "@/countries/germany.png";
import type { CountryDestination } from "@/data/countryDestinations";

export const germanyDestination: CountryDestination = {
  id: "germany",
  name: "Germany",
  image: germanyImage,
  route: "/countries/germany",
  tagline:
    "Build your future in a research-led European destination known for engineering and innovation.",
  whyStudyHere:
    "Germany is known for strong public universities, technical education, research culture, industry links, and respected programs in engineering, management, data, sciences, and applied fields.",
  highlights: [
    "Strong options in engineering, IT, business, and applied sciences",
    "Research-focused universities with industry-connected learning",
    "A major European destination for technical and career-focused education",
  ],
  faqs: [
    {
      question: "Is Germany good for engineering and technical courses?",
      answer:
        "Yes. Germany is widely known for engineering, applied sciences, research, technology, and industry-connected education.",
    },
    {
      question: "Can I study in Germany in English?",
      answer:
        "Many universities offer English-taught programs, especially at master's level. German language skills are still helpful for daily life and part-time work.",
    },
    {
      question: "What are the common Germany intakes?",
      answer:
        "Winter intake is the main intake, while summer intake options are available for selected programs and institutions.",
    },
    {
      question: "Do I need German language before applying?",
      answer:
        "It depends on the program language. English-taught courses may not require German for admission, but basic German is useful for life in Germany.",
    },
  ],
};
