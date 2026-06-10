import { australiaCallbackProfile } from "./australia";
import { canadaCallbackProfile } from "./canada";
import { franceCallbackProfile } from "./france";
import { germanyCallbackProfile } from "./germany";
import { irelandCallbackProfile } from "./ireland";
import { italyCallbackProfile } from "./italy";
import {
  mbbsCallbackOption,
  mbbsCallbackProfile,
  mbbsInterestOptions,
} from "./mbbs";
import { newZealandCallbackProfile } from "./new-zealand";
import { spainCallbackProfile } from "./spain";
import { unitedKingdomCallbackProfile } from "./united-kingdom";
import type { CallbackProfile } from "./types";

export { mbbsCallbackOption, mbbsInterestOptions };
export type { CallbackOption, CallbackProfile } from "./types";

export const countryAliases: Record<string, string> = {
  uk: "united-kingdom",
  "united-kingdom": "united-kingdom",
  "united kingdom": "united-kingdom",
  england: "united-kingdom",
};

export const callbackProfiles: Record<string, CallbackProfile> = {
  france: franceCallbackProfile,
  italy: italyCallbackProfile,
  "united-kingdom": unitedKingdomCallbackProfile,
  ireland: irelandCallbackProfile,
  canada: canadaCallbackProfile,
  australia: australiaCallbackProfile,
  "new-zealand": newZealandCallbackProfile,
  germany: germanyCallbackProfile,
  spain: spainCallbackProfile,
  mbbs: mbbsCallbackProfile,
};
