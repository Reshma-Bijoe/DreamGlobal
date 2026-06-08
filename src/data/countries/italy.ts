import italyImage from "@/countries/italy.png";
import type { CountryDestination } from "@/data/countryDestinations";

export const italyDestination: CountryDestination = {
  id: "italy",
  name: "Italy",
  image: italyImage,
  route: "/countries/italy",
  tagline: "Build your future in one of Europe's most creative education destinations.",
  whyStudyHere:
    "Italy is known for affordable study options, historic universities, design-led programs, and a student life shaped by culture, innovation, and global connections.",
  highlights: [
    "Excellent programs in design, architecture, arts, business, and engineering",
    "Affordable tuition compared with many European destinations",
    "Scholarship opportunities for eligible international students",
  ],
  faqs: [
    {
      question: "Why do students choose Italy for higher studies?",
      answer:
        "Italy is known for affordable tuition, historic universities, creative fields, design programs, architecture, arts, business, and engineering pathways.",
    },
    {
      question: "Can I apply for scholarships in Italy?",
      answer:
        "Yes. Italy has regional and institution-based scholarship options, but requirements can vary by university, region, academics, and financial profile.",
    },
    {
      question: "Are English-taught courses available in Italy?",
      answer:
        "Yes. Many universities offer English-taught bachelor's and master's programs, especially in business, design, engineering, and international fields.",
    },
    {
      question: "Is Italy affordable for international students?",
      answer:
        "Italy can be more affordable than several other European destinations, especially when students choose public universities or qualify for scholarships.",
    },
  ],
};
