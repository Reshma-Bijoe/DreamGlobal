import { blogPosts } from "../data/faqs";
import { DREAMGLOBAL_LOGO_URL } from "./branding";

export const SITE_URL = "https://dreamglobal.in";

export const seoPages: Record<string, { title: string; description: string }> = {
  "/": {
    title: "DreamGlobal | Career Counselling, Study Abroad & MBBS Guidance",
    description: "DreamGlobal offers career counselling, study abroad consultancy, study in India guidance, MBBS admissions counselling and IELTS coaching for students in Kerala and across India. Visit us in Aluva, Ernakulam.",
  },
  "/higher-studies": {
    title: "Study Abroad Consultants in Aluva, Kerala | DreamGlobal",
    description: "Study abroad guidance in Aluva, Ernakulam: course and university selection, applications, scholarships, education loans, documents and travel support with DreamGlobal.",
  },
  "/career-counselling": {
    title: "Career Counselling & Psychometric Assessment in Aluva | DreamGlobal",
    description: "Career counselling in Aluva, Kerala for school students, college students and professionals. Explore psychometric assessments, course selection, mentoring and career planning.",
  },
  "/countries": { title: "Study Abroad Countries & University Guidance | DreamGlobal", description: "Compare study abroad destinations, courses, entry requirements and education pathways with DreamGlobal's counselling team in Aluva, Kerala." },
  "/mbbs": { title: "MBBS Admissions in India & Abroad | DreamGlobal Aluva", description: "Explore medical education pathways, university choices and MBBS admission guidance in India and abroad with DreamGlobal in Aluva, Kerala." },
  "/mbbs/guide": { title: "MBBS Admission Guide: Courses, Costs & Eligibility | DreamGlobal", description: "Understand MBBS pathways, eligibility, costs and admissions planning before choosing medical education in India or abroad." },
  "/faqs": { title: "Study Abroad & Career Counselling FAQs | DreamGlobal", description: "Answers about career assessments, scholarships, university applications, higher education and study abroad planning from DreamGlobal, Aluva." },
  "/founder": { title: "Bijoe Thomas: Career Counsellor & Founder | DreamGlobal", description: "Meet Bijoe Thomas, DreamGlobal's founder and career strategist. Explore his career development credentials, global leadership experience and education guidance." },
  "/testimonials": { title: "Student Testimonials: Career & Study Abroad Guidance | DreamGlobal", description: "Read student experiences with DreamGlobal's career counselling, psychometric assessments and higher education guidance." },
  "/success-letters": { title: "Student Success Stories & Admission Letters | DreamGlobal", description: "Explore student success stories and admission outcomes from DreamGlobal's career and higher education guidance." },
  "/blogs": { title: "Study Abroad, Scholarships & Career Planning Guides | DreamGlobal", description: "Practical guides to scholarships, admissions documents, study abroad destinations, psychometric assessments and career choices." },
  "/book-consultation": { title: "Book Career Counselling or Study Abroad Guidance | DreamGlobal", description: "Book a consultation with DreamGlobal in Aluva for career counselling, study abroad applications, course selection and higher education planning." },
  "/contact": { title: "Contact DreamGlobal in Aluva, Ernakulam | Study Abroad & Careers", description: "Visit DreamGlobal at 1st Floor, BT ARCADE, near Private Bus Stand, Aluva. Call +91 88486 74757 for study abroad and career counselling guidance." },
  "/privacy-policy": { title: "Privacy Policy | DreamGlobal", description: "Read DreamGlobal's privacy policy and how personal information is handled when you use our career and education guidance services." },
  "/higher-studies/callback": { title: "Request Study Abroad Counselling | DreamGlobal", description: "Request a callback to discuss your academic profile, preferred course, study abroad destination and application plans with DreamGlobal." },
};

export const seoCountryNames: Record<string, string> = {
  australia: "Australia", canada: "Canada", france: "France", germany: "Germany",
  ireland: "Ireland", italy: "Italy", "new-zealand": "New Zealand", spain: "Spain",
  "united-kingdom": "the UK",
};

export const normaliseSeoPath = (pathname: string) => pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

export const getSeoMetadata = (pathname: string) => {
  const path = normaliseSeoPath(pathname);
  const blog = blogPosts.find((post) => path === `/blogs/${post.slug}`);
  const country = path.startsWith("/countries/") ? seoCountryNames[path.split("/")[2]] : undefined;
  const knownCallback = path.startsWith("/higher-studies/callback/") && seoCountryNames[path.split("/")[3]];
  const details = blog ? { title: `${blog.title} | DreamGlobal`, description: blog.excerpt }
    : country ? { title: `Study in ${country}: University & Admission Guidance | DreamGlobal`, description: `Explore study in ${country}, course choices, university applications, scholarships and student pathways with DreamGlobal's study abroad team in Aluva, Kerala.` }
    : knownCallback ? seoPages["/higher-studies/callback"] : seoPages[path];
  return {
    ...(details ?? { title: "Page Not Found | DreamGlobal", description: "Explore DreamGlobal's career counselling and study abroad guidance." }),
    canonical: `${SITE_URL}${path}`,
    robots: details ? "index, follow" : "noindex, follow",
    image: `${SITE_URL}${DREAMGLOBAL_LOGO_URL}`,
  };
};

export const publicSeoPaths = [
  ...Object.keys(seoPages),
  ...Object.keys(seoCountryNames).map((id) => `/countries/${id}`),
  ...blogPosts.map((post) => `/blogs/${post.slug}`),
];
