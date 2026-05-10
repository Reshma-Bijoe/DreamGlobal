import image from "@/ads/uwa.jpg";
import type { University } from "@/types/universities";

export const uwa: University = {
  id: "uwa",
  enabled: true,
  name: "University of Western Australia",
  image,

  sections: [
    { title: "Offer Turnaround Time", type: "text", value: "1–2 weeks" },
    {
      title: "UG Requirements",
      type: "regions",
      value: [
        {
          states: "Punjab, Haryana, Telangana",
          requirement: "75% (CBSE/ICSE)",
        },
        {
          states: "Rest of India",
          requirement: "60% CBSE/ICSE, 65% others",
        },
      ],
    },
    { title: "IELTS", type: "text", value: "6.5" },
    {
      title: "Why choose this university",
      type: "list",
      value: ["PSW up to 4 years", "+5 PR points", "Group of 8"],
    },
  ],
};