import { useLocation } from "react-router-dom";

import { getCountryDestination } from "@/data/countryDestinations";
import { genericFaqs, getBlogPost } from "@/data/faqs";
import { faqs as careerFaqs } from "@/lib/careerCounsellingData";

const SITE_URL = "https://dreamglobal.in";
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const routeDetails: Record<string, { name: string; description: string }> = {
  "/career-counselling": {
    name: "Career Counselling and Psychometric Assessment | DreamGlobal",
    description:
      "Personalized career counselling, psychometric assessment, career mentoring and academic guidance for students, graduates and professionals.",
  },
  "/higher-studies": {
    name: "Higher Studies and Study Abroad Guidance | DreamGlobal",
    description:
      "Explore higher education pathways, international universities, course selection and study abroad planning with DreamGlobal.",
  },
  "/countries": {
    name: "Study Abroad Countries and Destinations | DreamGlobal",
    description:
      "Compare study destinations, universities, courses and student pathways across leading countries with DreamGlobal guidance.",
  },
  "/mbbs": {
    name: "MBBS Admission Counselling in India and Abroad | DreamGlobal",
    description:
      "Compare MBBS in India and abroad, NEET requirements, university routes and realistic medical education options with DreamGlobal.",
  },
  "/mbbs/guide": {
    name: "MBBS Admission Guide | DreamGlobal",
    description:
      "A practical guide to comparing MBBS routes, eligibility, admissions, costs and medical education choices in India and abroad.",
  },
  "/faqs": {
    name: "Career Counselling and Study Abroad FAQs | DreamGlobal",
    description:
      "Answers to common questions about career counselling, psychometric assessment, higher studies and studying abroad.",
  },
  "/founder": {
    name: "Meet the Founder | DreamGlobal",
    description:
      "Learn about the vision behind DreamGlobal and its approach to career counselling and global education guidance.",
  },
  "/testimonials": {
    name: "DreamGlobal Student Testimonials",
    description:
      "Read student experiences with DreamGlobal career counselling, higher education planning and study abroad guidance.",
  },
  "/blogs": {
    name: "Career Counselling and Study Abroad Blog | DreamGlobal",
    description:
      "Practical guidance and insights about career decisions, higher studies, study abroad planning and student admissions.",
  },
  "/book-consultation": {
    name: "Book a Career or Study Abroad Consultation | DreamGlobal",
    description:
      "Book a consultation with DreamGlobal for career counselling, higher education planning, MBBS guidance or study abroad support.",
  },
  "/contact": {
    name: "Contact DreamGlobal | Career and Education Guidance",
    description:
      "Contact DreamGlobal in Aluva, Kerala for career counselling, higher education, MBBS and study abroad guidance.",
  },
  "/success-letters": {
    name: "DreamGlobal Student Success Stories",
    description:
      "Explore student success stories and outcomes from DreamGlobal career and higher education guidance.",
  },
  "/privacy-policy": {
    name: "Privacy Policy | DreamGlobal",
    description: "Read the DreamGlobal privacy policy and information handling practices.",
  },
  "/callback": {
    name: "Request a Callback | DreamGlobal",
    description:
      "Request a callback from DreamGlobal for career counselling, higher studies and study abroad guidance.",
  },
};

const getFaqEntities = () => [
  ...careerFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
  ...genericFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
];

const RouteSchema = () => {
  const { pathname } = useLocation();
  const cleanPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

  // The admin area is not a public SEO page.
  if (cleanPath === "/admin") return null;

  const countryId = cleanPath.startsWith("/countries/")
    ? cleanPath.split("/")[2]
    : undefined;
  const country = getCountryDestination(countryId);
  const blogSlug = cleanPath.startsWith("/blogs/")
    ? cleanPath.split("/")[2]
    : undefined;
  const blog = getBlogPost(blogSlug);
  const countryDetails = country
    ? {
        name: `Study in ${country.name} | DreamGlobal`,
        description: country.whyStudyHere,
      }
    : undefined;
  const blogDetails = blog
    ? {
        name: `${blog.title} | DreamGlobal`,
        description: blog.content[0],
      }
    : undefined;
  const details = countryDetails || blogDetails || routeDetails[cleanPath] || {
    name: "DreamGlobal | Career Counselling and Higher Education",
    description:
      "DreamGlobal provides career counselling, higher education guidance and study abroad consultancy in Kerala and across India.",
  };

  // The homepage already has its canonical WebPage node in index.html.
  if (cleanPath === "/") return null;

  const pageUrl = `${SITE_URL}${cleanPath}`;
  const page: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: details.name,
    description: details.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    inLanguage: "en-IN",
  };

  if (cleanPath === "/faqs") {
    page["@type"] = ["WebPage", "FAQPage"];
    page.mainEntity = getFaqEntities();
  }

  const graph: Record<string, unknown>[] = [page];

  if (blog) {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${pageUrl}#article`,
      url: pageUrl,
      headline: blog.title,
      description: blog.content[0],
      articleSection: blog.category,
      articleBody: blog.content.join("\n\n"),
      isPartOf: { "@id": `${pageUrl}#webpage` },
      author: { "@id": BUSINESS_ID },
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    });
  }

  if (country) {
    graph.push({
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: `Study in ${country.name} Counselling`,
      serviceType: "Study Abroad Counselling",
      description: country.whyStudyHere,
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "Country", name: country.name },
    });
  }

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/<\/script/gi, "<\\/script");

  return (
    <script
      id="dreamglobal-route-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  );
};

export default RouteSchema;
