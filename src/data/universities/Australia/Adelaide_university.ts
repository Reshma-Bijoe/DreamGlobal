import image from "@/ads/adelaide.jpg";
import type { University } from "@/types/universities";

export const adelaide: University = {
  id: "adelaide",
  enabled: true,
  name: "University of Adelaide",
  image,

  sections: [
    { title: "Offer Turnaround Time", type: "text", value: "3 weeks" },
    { title: "UG Requirement", type: "text", value: "80% in 12th" },
    {
      title: "Postgraduate Requirement",
      type: "text",
      value: "65–70%",
    },
    { title: "IELTS", type: "text", value: "6.5 (no band below 6)" },
    {
      title: "Scholarships",
      type: "list",
      value: ["30% based on admission", "Up to 50% excellence scholarship"],
    },
  ],
};