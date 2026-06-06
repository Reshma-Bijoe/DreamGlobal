import canadaImage from "@/countries/canada.png";
import franceImage from "@/countries/france.png";
import irelandImage from "@/countries/ireland.png";
import italyImage from "@/countries/italy.png";
import ukImage from "@/countries/uk.png";

const countryImages = {
  canada: canadaImage,
  france: franceImage,
  ireland: irelandImage,
  italy: italyImage,
  uk: ukImage,
};

export type CountryDestination = {
  id: string;
  name: string;
  image: string;
  route: string;
  tagline: string;
  whyStudyHere: string;
  highlights: string[];
};

export const countryDestinations: CountryDestination[] = [
  {
    id: "france",
    name: "France",
    image: countryImages.france,
    route: "/countries/france",
    tagline: "Study in a global hub for culture, business, fashion, and research.",
    whyStudyHere:
      "France gives students access to respected public and private institutions, strong post-study career pathways, and a rich international lifestyle at the center of Europe.",
    highlights: [
      "Globally respected universities and business schools",
      "Strong options in management, fashion, hospitality, arts, and engineering",
      "A multicultural student experience with access to Europe",
    ],
  },
  {
    id: "italy",
    name: "Italy",
    image: countryImages.italy,
    route: "/countries/italy",
    tagline: "Build your future in one of Europe's most creative education destinations.",
    whyStudyHere:
      "Italy is known for affordable study options, historic universities, design-led programs, and a student life shaped by culture, innovation, and global connections.",
    highlights: [
      "Excellent programs in design, architecture, arts, business, and engineering",
      "Affordable tuition compared with many European destinations",
      "Scholarship opportunities for eligible international students",
    ],
  },
  {
    id: "united-kingdom",
    name: "United Kingdom",
    image: countryImages.uk,
    route: "/countries/united-kingdom",
    tagline: "Earn a world-recognized qualification with flexible study choices.",
    whyStudyHere:
      "The UK offers internationally recognized degrees, shorter course durations, diverse campuses, and strong exposure to global employers and industries.",
    highlights: [
      "One-year master's options at many institutions",
      "World-renowned academic standards and research culture",
      "Graduate route opportunities for eligible students",
    ],
  },
  {
    id: "ireland",
    name: "Ireland",
    image: countryImages.ireland,
    route: "/countries/ireland",
    tagline: "Study in an English-speaking European hub for technology, business, and research.",
    whyStudyHere:
      "Ireland offers globally connected universities, welcoming student cities, and strong links to leading international employers across technology, finance, healthcare, and life sciences.",
    highlights: [
      "Popular programs in IT, business, data, healthcare, and engineering",
      "English-speaking study destination with access to Europe",
      "Strong graduate career pathways for eligible students",
    ],
  },
  {
    id: "canada",
    name: "Canada",
    image: countryImages.canada,
    route: "/countries/canada",
    tagline: "Study in a welcoming destination with strong career-focused pathways.",
    whyStudyHere:
      "Canada combines quality education, safe student cities, practical learning, and opportunities to gain international work exposure after graduation.",
    highlights: [
      "Career-oriented diplomas, degrees, and postgraduate programs",
      "Friendly multicultural campuses across major student cities",
      "Practical learning and co-op opportunities at many institutions",
    ],
  },
];

export const getCountryDestination = (id: string | undefined) =>
  countryDestinations.find((country) => country.id === id);
