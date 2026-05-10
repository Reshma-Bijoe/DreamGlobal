import image from "@/ads/uow.jpg";
import type { University } from "@/types/universities";

export const uow: University = {
  id: "uow",
  enabled: true,
  name: "University of Wollongong",
  image,

  sections: [
    { title: "Offer Turnaround Time", type: "text", value: "2 weeks" },
    {
      title: "UG Requirement",
      type: "text",
      value: "Minimum 75%",
    },
    {
      title: "Postgraduate Requirement",
      type: "text",
      value: "60% First Division",
    },
    {
      title: "Why choose this university",
      type: "list",
      value: [
        "PSW up to 4 years",
        "+5 PR points",
        "15 backlogs accepted",
        "27% cheaper than Sydney",
      ],
    },
  ],
};