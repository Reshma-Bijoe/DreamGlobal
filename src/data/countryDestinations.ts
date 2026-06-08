import { australiaDestination } from "@/data/countries/australia";
import { canadaDestination } from "@/data/countries/canada";
import { franceDestination } from "@/data/countries/france";
import { germanyDestination } from "@/data/countries/germany";
import { irelandDestination } from "@/data/countries/ireland";
import { italyDestination } from "@/data/countries/italy";
import { newZealandDestination } from "@/data/countries/new-zealand";
import { spainDestination } from "@/data/countries/spain";
import { unitedKingdomDestination } from "@/data/countries/united-kingdom";

export type CountryDestination = {
  id: string;
  name: string;
  image: string;
  route: string;
  tagline: string;
  whyStudyHere: string;
  highlights: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const countryDestinations: CountryDestination[] = [
  franceDestination,
  italyDestination,
  unitedKingdomDestination,
  irelandDestination,
  canadaDestination,
  australiaDestination,
  newZealandDestination,
  germanyDestination,
  spainDestination,
];

export const getCountryDestination = (id: string | undefined) =>
  countryDestinations.find((country) => country.id === id);
