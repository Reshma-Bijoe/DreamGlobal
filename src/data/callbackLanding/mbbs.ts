import type { CallbackOption, CallbackProfile } from "./types";

export const mbbsCallbackOption: CallbackOption = {
  id: "mbbs",
  name: "MBBS in India & Abroad",
  route: "/mbbs",
  tagline:
    "Compare India and abroad routes, NEET requirements, recognition checks, and realistic options before you apply.",
};

export const mbbsInterestOptions: CallbackOption[] = [
  {
    id: "mbbs-india",
    name: "MBBS in India",
    route: "/mbbs",
    tagline:
      "Review domestic counselling routes, seat expectations, budget, and backup plans with clearer guidance.",
  },
  {
    id: "mbbs-abroad",
    name: "MBBS Abroad",
    route: "/mbbs",
    tagline:
      "Compare countries, recognition, eligibility, documentation, and university fit before you apply.",
  },
];

export const mbbsCallbackProfile: CallbackProfile = {
  eyebrow: "MBBS counselling priority",
  title: "MBBS decisions should never be made in a panic",
  intro:
    "MBBS in India or abroad is one of the most consequential choices a student can make. You need to compare NEET status, budget, recognition, country rules, university credibility, and long-term practice plans before you commit.",
  urgency:
    "If you wait until seats, documents, or deadlines are already under pressure, you may lose the chance to choose wisely. For a medical career, missing the right guidance at the right time can become a lifetime regret.",
  reasons: [
    "India and abroad options need a realistic comparison, not guesswork.",
    "Recognition, eligibility, and documentation must be checked before applying.",
    "Early counselling protects students from rushed choices and weak-fit universities.",
  ],
};
