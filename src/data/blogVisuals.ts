import campus from "@/assets/study-abroad/graduation-pathway.jpg";
import classroom from "@/assets/study-abroad/classroom.jpg";
import business from "@/assets/study-abroad/business-school.jpg";
import laboratory from "@/assets/study-abroad/stem-lab.jpg";
import design from "@/assets/study-abroad/design-studio.jpg";

export type BlogVisual = {
  image: string;
  alt: string;
  takeaway: string;
  diagramTitle: string;
  diagramNote: string;
  diagramKind?: "funding" | "assessment";
  steps: { title: string; detail: string }[];
};

export const blogVisuals: Record<string, BlogVisual> = {
  "choose-the-right-study-destination": {
    image: campus,
    alt: "Students walking together on a university campus",
    takeaway: "Choose the course and learning experience first. Let the destination follow your goals and budget.",
    diagramTitle: "Your shortlist, in four steps",
    diagramNote: "Compare each destination using the same criteria before choosing where to apply.",
    steps: [
      { title: "Your goals", detail: "What do you want to learn?" },
      { title: "Course fit", detail: "Modules, teaching, and entry requirements" },
      { title: "Full budget", detail: "Tuition, living costs, and confirmed funding" },
      { title: "Shortlist", detail: "Options you can explain and afford" },
    ],
  },
  "documents-to-prepare-before-applying-abroad": {
    image: business,
    alt: "Students collaborating around laptops and study materials",
    takeaway: "A complete application starts with a clear checklist. Follow each programme's instructions, then review every file.",
    diagramTitle: "From scattered files to a ready application",
    diagramNote: "Track admissions, scholarship, and immigration documents separately: their requirements can differ.",
    steps: [
      { title: "Check", detail: "Read the official document requirements" },
      { title: "Collect", detail: "Request records and recommendations" },
      { title: "Tailor", detail: "Prepare course-specific statements and evidence" },
      { title: "Review", detail: "Check details, upload, and save confirmation" },
    ],
  },
  "what-students-should-know-about-intakes": {
    image: campus,
    alt: "Students arriving on a university campus with their study materials",
    takeaway: "The intake is when teaching begins. Your application, funding, and enrolment deadlines are separate milestones.",
    diagramTitle: "Plan backwards from your intake",
    diagramNote: "An illustrative sequence, not a fixed calendar. Confirm every date for your programme and destination.",
    steps: [
      { title: "Research", detail: "Course, start date, and budget" },
      { title: "Prepare", detail: "Tests, documents, and funding deadlines" },
      { title: "Apply", detail: "Submit and track offers and conditions" },
      { title: "Arrive", detail: "Complete requirements and enrol" },
    ],
  },
  "scholarship-readiness-for-international-students": {
    image: classroom,
    alt: "Students exchanging ideas in a bright university classroom",
    takeaway: "Compare what you still need to pay, not just the size of the scholarship. Larger awards do not always mean lower costs.",
    diagramTitle: "A bigger scholarship isn't always a cheaper degree",
    diagramNote: "Hypothetical units for illustration, not actual fees. Add living costs and other expenses to your final budget.",
    diagramKind: "funding",
    steps: [],
  },
  "career-counselling-for-confident-decisions": {
    image: classroom,
    alt: "A student explaining an idea during a group discussion",
    takeaway: "Good counselling turns uncertainty into a shortlist and a practical action plan you can review as you grow.",
    diagramTitle: "From uncertainty to a confident next step",
    diagramNote: "Return to the plan after trying a project or having a useful conversation. New evidence can change your direction.",
    steps: [
      { title: "Understand", detail: "Interests, strengths, values, and circumstances" },
      { title: "Explore", detail: "Compare real courses and career pathways" },
      { title: "Experience", detail: "Try a project or talk to a professional" },
      { title: "Act", detail: "Choose next steps and a review date" },
    ],
  },
  "how-psychometric-assessment-supports-career-planning": {
    image: laboratory,
    alt: "Students exploring a practical science project together in a laboratory",
    takeaway: "An assessment opens questions and possibilities. Combine the findings with experience and guidance before making a decision.",
    diagramTitle: "An assessment is one piece of the picture",
    diagramNote: "These inputs work together. A score alone should not decide your course or career.",
    diagramKind: "assessment",
    steps: [
      { title: "Assessment", detail: "Patterns in interests and abilities" },
      { title: "Experience", detail: "What you have tried and enjoyed" },
      { title: "Your context", detail: "Goals, values, budget, and support" },
      { title: "Counselling", detail: "Interpretation and practical options" },
    ],
  },
  "choosing-streams-and-courses-with-clarity": {
    image: design,
    alt: "Students testing their ideas through a hands-on design project",
    takeaway: "Look beyond course names. Compare the actual subjects, learning demands, costs, and pathways they open.",
    diagramTitle: "Turn an interest into a reasoned choice",
    diagramNote: "Use a small project or subject taster to test your assumptions before making a major commitment.",
    steps: [
      { title: "Interest", detail: "Which activities hold your attention?" },
      { title: "Requirements", detail: "Subjects, eligibility, and recognition" },
      { title: "Comparison", detail: "Modules, format, costs, and alternatives" },
      { title: "Trial", detail: "Experience the work, then choose" },
    ],
  },
};
