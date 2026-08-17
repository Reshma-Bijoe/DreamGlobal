import StudentOne from "../assets/student-1.jpg";
import StudentTwo from "../assets/student-2.jpg";
import StudentThree from "../assets/student-3.jpg";
import StudentFour from "../assets/student-4.jpg";

export const CAREER_TEST_URL =
  "https://careertest.edumilestones.com/student-dashboard/suitability-registration/login/NDU1Mg==/as11-as12-as13-as14-as204-pt15-grd18";
const ASSESSMENT_BASE_URL =
  "https://careertest.edumilestones.com/student-dashboard/suitability-registration/login/NDU1Mg==";

export const WHATSAPP_NUMBER = "918848674757";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const PHONE_NUMBER = "+91 88486 74757";
export const FOUNDER_NAME = "Mr. Bijoe Thomas";

export const studentImages = [
  {
    src: StudentOne,
    alt: "DreamGlobal student counselling session",
  },
  {
    src: StudentTwo,
    alt: "Student exploring career guidance options",
  },
  {
    src: StudentThree,
    alt: "Student planning academic pathway",
  },
  {
    src: StudentFour,
    alt: "Students preparing for their future",
  },
];

export const serviceBand = [
  "Career Counselling",
  "Psychometric Analysis",
  "Higher Studies",
  "Stream Selection",
  "Study Abroad",
  "University Guidance",
  "Admission Support",
  "Parent Counselling",
  "Global Education",
];

export const counsellingBenefits = [
  "Understand your strengths and interests",
  "Explore careers that match your potential",
  "Make informed stream and course choices",
  "Get personalised mentor guidance",
  "Build a clear roadmap for the future",
];

export const roadmapSteps = ["Discover", "Assess", "Explore", "Decide", "Plan"];

export const intentOptions = [
  "Career Counselling",
  "Stream Selection",
  "Course Selection",
  "Higher Studies",
  "Study Abroad",
  "University Selection",
  "General Guidance",
];

export const consultationInterestOptions = [
  "Career Consultation",
  "Higher Studies India",
  "Higher Studies Abroad",
  "MBBS",
];

export const assessmentPaths = [
  {
    category: "Career Analysis",
    title: "Classes 2 to 7",
    objective: "Multiple intelligence and learning potential",
    description:
      "Discover a child's natural strengths, learning style, curiosity patterns, and early potential through age-appropriate scientific profiling.",
    href: `${ASSESSMENT_BASE_URL}/as11`,
  },
  {
    category: "Career Analysis",
    title: "Classes 8, 9 and 10",
    objective: "Stream, subject and career direction",
    description:
      "Build confident subject choices by mapping aptitude, personality, interests, and future career fit before key academic decisions.",
    href: `${ASSESSMENT_BASE_URL}/as12`,
  },
  {
    category: "Career Analysis",
    title: "Classes 11 and 12",
    objective: "Career path with a practical execution roadmap",
    description:
      "Clarify suitable courses, entrance exams, college pathways, and long-term career options with a structured plan for the years ahead.",
    href: `${ASSESSMENT_BASE_URL}/as13`,
  },
  {
    category: "Career Analysis",
    title: "Graduates",
    objective: "Career fit, course direction and transition planning",
    description:
      "Identify career opportunities aligned with your degree, strengths, and ambitions while exploring higher-study or transition pathways.",
    href: `${ASSESSMENT_BASE_URL}/as14`,
  },
  {
    category: "Professional Analysis",
    title: "Early and Mid-Career Professionals",
    objective: "Focused growth, transition and execution strategy",
    description:
      "Find stronger opportunities within your industry, evaluate career shifts, and shape a practical plan for the next phase of work.",
    href: `${ASSESSMENT_BASE_URL}/as204`,
  },
  {
    category: "Recommended Professional Assessment",
    title: "Industry-Specific Career Assessment",
    objective: "Best opportunities within and beyond your current industry",
    description:
      "A multi-dimensional assessment for working professionals to identify high-fit roles, growth paths, and smart transition possibilities.",
    href: `${ASSESSMENT_BASE_URL}/pt15`,
  },
  {
    category: "Recommended Graduate Assessment",
    title: "Course-Specific Career Assessment",
    objective: "Career opportunities aligned with your education",
    description:
      "A course-specific assessment for graduates to connect academic background with suitable roles, higher-study options, and transition plans.",
    href: `${ASSESSMENT_BASE_URL}/grd18`,
  },
] as const;

export const careerPlanningServices = [
  {
    title: "Career Discovery and Counselling",
    description:
      "Structured conversations that help students and families move from uncertainty to informed direction.",
  },
  {
    title: "Psychometric Assessments and Career Profiling",
    description:
      "State-of-the-art evaluation tools that reveal aptitude, personality, interests, and learning preferences.",
  },
  {
    title: "Personalised Career Roadmaps",
    description:
      "Clear execution plans for streams, courses, exams, skill building, and long-term career milestones.",
  },
  {
    title: "Stream, Course and Career Selection",
    description:
      "Practical guidance for choosing academic and professional paths that match ability, motivation, and opportunity.",
  },
  {
    title: "Career Coaching and Mentoring",
    description:
      "Ongoing mentoring to build confidence, decision-making discipline, and future-ready academic habits.",
  },
  {
    title: "Future-Ready Skills Development",
    description:
      "Guidance on communication, leadership, digital fluency, AI awareness, and global mindset development.",
  },
  {
    title: "Emerging Careers in the Age of AI",
    description:
      "Insights into new-age careers, changing industries, and the skills students need to stay ahead.",
  },
  {
    title: "Higher Education Planning",
    description:
      "Support for course research, university shortlisting, admissions strategy, and study-abroad planning.",
  },
] as const;

export const founderHighlights = [
  "30+ years professional experience",
  "Former Fortune 100 technology leader",
  "Global career strategist",
  "International education specialist",
  "Certified career counsellor",
];

export const founderStats = [
  { value: "30+", label: "Years Experience" },
  { value: "25", label: "Years With TCS" },
  { value: "7,000+", label: "Candidates Evaluated" },
];

export const careerTestimonials = [
  {
    name: "Ananya R.",
    detail: "Grade 10 Student",
    rating: "4.9",
    quote:
      "The session helped me understand which stream matched my strengths. I felt clear instead of pressured.",
  },
  {
    name: "Meera K.",
    detail: "Parent",
    rating: "5.0",
    quote:
      "The counselling made the options practical for our family. We knew what to focus on next.",
  },
  {
    name: "Rohan S.",
    detail: "Higher Studies Applicant",
    rating: "4.8",
    quote:
      "DreamGlobal connected my career interests with the right course direction and a realistic study plan.",
  },
  {
    name: "Ishaan P.",
    detail: "Grade 12 Student",
    rating: "4.7",
    quote:
      "I was confused between engineering and design. The counselling helped me compare both paths calmly.",
  },
  {
    name: "Nisha M.",
    detail: "Parent",
    rating: "5.0",
    quote:
      "The counsellor explained everything in simple steps. My daughter finally felt confident about her stream.",
  },
  {
    name: "Aditya K.",
    detail: "Grade 9 Student",
    rating: "4.6",
    quote:
      "The test showed what I am naturally good at and the session made the next steps easy to understand.",
  },
  {
    name: "Sana F.",
    detail: "Undergraduate Student",
    rating: "4.9",
    quote:
      "I got a realistic plan for higher studies and career options instead of random advice from everywhere.",
  },
  {
    name: "Kavya S.",
    detail: "Grade 11 Student",
    rating: "4.8",
    quote:
      "The session helped me choose subjects with more confidence and less pressure from outside opinions.",
  },
  {
    name: "Arjun V.",
    detail: "Parent",
    rating: "4.9",
    quote:
      "We understood our son's interests better and got a practical roadmap for the next two years.",
  },
];

export const expertiseAreas = [
  "Career Counselling and Planning",
  "Global Higher Education Guidance",
  "Stream and Course Selection",
  "International Education Counselling",
  "Industry-Ready Career Roadmaps",
  "Emerging Technology Awareness",
  "Student and Parent Mentoring",
  "Talent Evaluation Insights",
  "Academic and Industry Collaboration",
];

export const faqs = [
  {
    q: "What is career counselling?",
    a: "Career counselling helps students understand their strengths, interests, and options so they can make informed choices about streams, courses, and future careers.",
  },
  {
    q: "Who should take a career assessment?",
    a: "Any student who is unsure about a stream, course, career direction, or higher studies path can benefit from a structured assessment.",
  },
  {
    q: "Which grades can benefit from counselling?",
    a: "Students from middle school through graduation can benefit, especially around Grade 8 to 12 when important academic decisions are made.",
  },
  {
    q: "How does the career assessment work?",
    a: "The student completes an online assessment, then receives guidance to understand the report and plan practical next steps.",
  },
  {
    q: "Can parents attend the counselling?",
    a: "Yes. Parent involvement is welcome because education and career decisions are often family decisions.",
  },
  {
    q: "Can I choose my counselling date?",
    a: "Yes. The form lets you share a preferred date and time, and the team will confirm availability.",
  },
  {
    q: "Do you provide higher studies guidance?",
    a: "Yes. DreamGlobal supports course selection, university guidance, and admission planning.",
  },
  {
    q: "Do you provide study-abroad guidance?",
    a: "Yes. DreamGlobal helps students explore countries, universities, courses, and admission pathways.",
  },
  {
    q: "Can I submit my details without WhatsApp?",
    a: "Yes. You can use Submit Request to send your details directly.",
  },
];
