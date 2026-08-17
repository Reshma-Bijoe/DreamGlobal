export const genericFaqs = [
  {
    question: "How does DreamGlobal help students choose a country?",
    answer:
      "We look at your academics, budget, preferred intake, career goals, English test status, and course interest before shortlisting suitable study destinations.",
  },
  {
    question: "Can I get counselling before choosing a university?",
    answer:
      "Yes. You can speak with the counselling team first, compare suitable options, and then decide which universities or programs to apply for.",
  },
  {
    question: "Do you help with scholarships?",
    answer:
      "We help students identify scholarship possibilities based on the university, course, academic profile, and application timing.",
  },
  {
    question: "When should I start my study abroad application?",
    answer:
      "Starting 8 to 12 months before your target intake is ideal because it gives enough time for shortlisting, documents, tests, applications, visa steps, and financial planning.",
  },
  {
    question: "What documents are usually needed?",
    answer:
      "Common documents include academic transcripts, passport, statement of purpose, resume, recommendation letters, English test scores, financial documents, and university-specific forms.",
  },
  {
    question: "Can I apply if my IELTS or PTE is not ready yet?",
    answer:
      "In many cases, you can begin counselling and shortlisting before the test is complete. Final university and visa requirements depend on the destination and institution.",
  },
  {
    question: "Do you guide students after admission?",
    answer:
      "Yes. Guidance can include offer acceptance, visa documentation, pre-departure preparation, accommodation pointers, and next-step planning.",
  },
  {
    question: "How do I check my eligibility?",
    answer:
      "Open any country page and use the eligibility form. The team can review your profile and help you understand realistic options.",
  },
];

export const blogPosts = [
  {
    slug: "choose-the-right-study-destination",
    title: "How to choose the right study destination",
    category: "Planning",
    readTime: "5 min read",
    excerpt:
      "A practical way to compare country, course, budget, intake, career goals, and long-term fit before applying.",
    content: [
      "The right study destination is not only about popularity. It should match your academic background, budget, course goals, preferred intake, and long-term career direction.",
      "Start by comparing the course quality, admission requirements, tuition range, living costs, English test expectations, and post-study possibilities. A country that works well for one student may not be the best fit for another.",
      "DreamGlobal usually begins with your profile first, then shortlists destinations that feel realistic and useful. This keeps the decision practical instead of overwhelming.",
    ],
  },
  {
    slug: "documents-to-prepare-before-applying-abroad",
    title: "Documents to prepare before applying abroad",
    category: "Applications",
    readTime: "4 min read",
    excerpt:
      "A simple checklist of academic, identity, financial, and profile documents students should organize early.",
    content: [
      "Preparing documents early can make your application smoother and less stressful. Most students need academic transcripts, certificates, passport, resume, statement of purpose, recommendation letters, and English test results if required.",
      "Some universities may also ask for portfolios, work experience letters, backlogs information, financial documents, or course-specific forms.",
      "Keep clear scanned copies ready and make sure names, dates, and marks are consistent across documents. Small errors can slow down an otherwise strong application.",
    ],
  },
  {
    slug: "what-students-should-know-about-intakes",
    title: "What students should know about intakes",
    category: "Admissions",
    readTime: "3 min read",
    excerpt:
      "September, January, and smaller intake cycles explained in plain language so students can plan with less stress.",
    content: [
      "An intake is the period when a university starts a new academic batch. September is usually the biggest intake across many destinations, while January and other smaller intakes depend on country, university, and course availability.",
      "Applying early gives you better time for shortlisting, documents, admission decisions, scholarships, visa steps, and travel planning.",
      "If you miss one intake, it does not always mean your plans are over. The right next step depends on your course, documents, and how flexible you are with country and institution choices.",
    ],
  },
  {
    slug: "scholarship-readiness-for-international-students",
    title: "Scholarship readiness for international students",
    category: "Funding",
    readTime: "4 min read",
    excerpt:
      "How academics, timing, course choice, and documentation can affect scholarship opportunities.",
    content: [
      "Scholarships are competitive, so readiness matters. Strong academics, a focused profile, timely applications, and complete documents can improve your chances.",
      "Scholarship rules vary by country and institution. Some are automatic, some need separate applications, and some depend on academic merit, financial need, or course category.",
      "Students should not wait until the last minute. Early counselling helps identify realistic scholarship options and avoid missing important deadlines.",
    ],
  },
  {
    slug: "career-counselling-for-confident-decisions",
    title: "How career counselling helps students make confident decisions",
    category: "Career Counselling",
    readTime: "4 min read",
    excerpt:
      "A practical look at how structured counselling can turn uncertainty about streams, courses, and careers into a clear next step.",
    content: [
      "Career counselling gives students a structured space to understand their strengths, interests, learning preferences, and aspirations before choosing a direction.",
      "Instead of treating one exam score or one popular course as the complete answer, a counsellor helps compare subjects, pathways, work environments, and future opportunities that fit the student's profile.",
      "The process also helps families have more useful conversations. With a shared plan, students can move forward with confidence while parents understand the reasoning behind each option.",
    ],
  },
  {
    slug: "how-psychometric-assessment-supports-career-planning",
    title: "How psychometric assessment supports career planning",
    category: "Career Counselling",
    readTime: "5 min read",
    excerpt:
      "Learn how aptitude, personality, and interest insights can support better conversations about a student's future.",
    content: [
      "A well-designed psychometric assessment can reveal patterns in aptitude, interests, personality, and preferred ways of working. These insights help students describe what comes naturally to them and what motivates them.",
      "Assessment results are most useful when they are discussed with a qualified counsellor. The conversation connects the findings with academic performance, lived experience, family context, and realistic education pathways.",
      "The goal is not to assign a student one fixed career. It is to open better options, identify development areas, and create a practical plan for exploring the next stage.",
    ],
  },
  {
    slug: "choosing-streams-and-courses-with-clarity",
    title: "Choosing streams and courses with clarity",
    category: "Career Planning",
    readTime: "4 min read",
    excerpt:
      "Questions students can ask when comparing subjects, degree options, and the kind of future they want to build.",
    content: [
      "Choosing a stream or course becomes easier when students compare more than titles. Look at the subjects involved, the skills they build, the learning environment, admission requirements, and the kinds of work they may lead to.",
      "It is also worth separating genuine interest from short-term pressure. A course should be challenging enough to develop the student while still connecting with their strengths and long-term goals.",
      "A counselling conversation can turn this comparison into a shortlist with clear actions: subjects to strengthen, experiences to try, people to speak with, and deadlines to track.",
    ],
  },
];

export const getBlogPost = (slug: string | undefined) =>
  blogPosts.find((post) => post.slug === slug);
