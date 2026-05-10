import image from "@/ads/latrobe.jpg";
import type { University } from "@/types/universities";

export const latrobe: University = {
  id: "latrobe",
  enabled: true,
  name: "La Trobe University",
  image,

  sections: [
    { title: "Offer Turnaround Time", type: "text", value: "3–4 days" },
    {
      title: "Postgraduate Requirement",
      type: "text",
      value: "60% First Division",
    },
    { title: "Scholarship", type: "text", value: "10–25%" },
  ],
};