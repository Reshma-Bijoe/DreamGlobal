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
  title: "What If Your NEET Score Doesn't Get You the Seat You Deserve?",
  intro: [
    "Whether your goal is to study in India or abroad, DreamGlobal will help you identify the most suitable and cost-effective pathway to achieve your dream of becoming a doctor.",
    "India and abroad options compared through NEET status, budget, seat reality, and family priorities.",
    "Recognition, university credibility, clinical exposure, safety, and long-term practice plans checked early.",
    "A calmer medical admission strategy before documents, payments, and deadlines start creating pressure.",
  ],
  urgency: [
    "MBBS choices affect recognition, clinical exposure, safety, budget, and long-term practice plans.",
    "Seats, documents, and payment timelines become stressful when families wait too long.",
    "Early counselling helps you compare India and abroad with evidence before committing under pressure.",
  ],
  reasons: [
    "NEET route clarity",
    "Recognition checks",
    "University credibility",
  ],
};
