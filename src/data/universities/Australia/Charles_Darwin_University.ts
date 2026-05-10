import image from "@/ads/cdu.jpg";
import type { University } from "@/types/universities";

export const cdu: University = {
  id: "cdu",
  enabled: true,
  name: "Charles Darwin University",
  image,

  sections: [
    { title: "Offer Turnaround Time", type: "text", value: "2 weeks" },
    {
      title: "UG Requirements",
      type: "regions",
      value: [
        { states: "Punjab / Haryana", requirement: "75%" },
        { states: "Other Boards", requirement: "65%" },
        { states: "CBSE / ISC", requirement: "60%" },
      ],
    },
    {
      title: "Postgraduate Requirement",
      type: "text",
      value: "60% First Division",
    },
  ],
};