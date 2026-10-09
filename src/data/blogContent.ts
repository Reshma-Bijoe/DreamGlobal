export type BlogSection = {
  heading: string;
  paragraphs: string[];
  checklist?: string[];
};

type BlogGuide = {
  sections: BlogSection[];
  resources: { label: string; url: string }[];
};

const careerResource = {
  label: "CareerOneStop: explore interests, skills, and career options",
  url: "https://cloudfront.careeronestop.org/HowTo/Findcareerideas/find-career-ideas.aspx",
};
const fundingResource = {
  label: "EducationUSA: planning how to finance your U.S. studies",
  url: "https://educationusa.state.gov/your-5-steps-us-study/finance-your-studies",
};
const deadlineResource = {
  label: "UCAS: official application dates and deadlines",
  url: "https://www.ucas.com/applying/applying-to-university/dates-and-deadlines-for-uni-applications",
};

export const blogGuides: Record<string, BlogGuide> = {
  "choose-the-right-study-destination": {
    sections: [
      {
        heading: "Start with the education you want, then the country",
        paragraphs: [
          "Before opening a list of popular destinations, write down what you want to learn and why. Are you looking for a practical undergraduate degree, a specialist master's programme, research experience, or a career change? Describe the skills you hope to develop and the kind of work you would like to explore. A destination becomes easier to judge when it serves a clear learning goal.",
          "Read actual course modules rather than relying on degree names. Two programmes called business analytics might place very different emphasis on statistics, coding, management, or industry projects. Check compulsory modules, assessment methods, opportunities to specialise, and the final project. If those details do not excite you, a famous university name will not necessarily make the course a good fit.",
        ],
      },
      {
        heading: "Check academic fit before building a shortlist",
        paragraphs: [
          "Use the university's official programme page to check required subjects, qualifications, language evidence, and any portfolio or experience requirements. Record the requirements beside your current profile. Where wording is unclear, ask admissions how your qualification will be assessed. An eligibility question is much easier to resolve before paying an application fee than after receiving an unexpected decision.",
          "Build a balanced shortlist: ambitious choices, options that appear well aligned with your profile, and alternatives you would be happy to attend. These are planning categories, not predictions of admission. For each option, identify a genuine reason to apply, such as relevant modules, a suitable teaching approach, or a project opportunity. Avoid adding programmes simply to make the list longer.",
        ],
      },
      {
        heading: "Compare the full cost of the degree",
        paragraphs: [
          "A useful budget includes more than tuition. List accommodation, food, transport, insurance, study materials, application costs, required tests, travel, and initial settling-in expenses. Estimate the whole programme, not just the first semester. Note the currency and date of each estimate, because an affordable plan can become tighter when exchange rates or living costs change.",
          "Separate confirmed funding from possibilities. Family contributions and an awarded scholarship belong in one column; a scholarship you intend to apply for belongs in another. Compare how manageable each option would be without an unconfirmed award. If borrowing is part of the plan, discuss the terms and repayment implications with the lender before committing. Treat future employment income as uncertain rather than as the foundation of your budget.",
        ],
      },
      {
        heading: "Picture everyday life, not just the campus brochure",
        paragraphs: [
          "Think about where you would actually live, how you would travel to class, and what support you might need. A large city and a smaller university town can offer very different experiences. Consider climate, distance from home, accessibility, food preferences, accommodation arrangements, and opportunities to find a community. These practical factors can affect how comfortably you settle into your studies.",
          "Ask current students specific questions: How easy was it to find accommodation? What surprised you about the workload? Which student services did you use? What would you do differently before arriving? Their experiences add context, but remember that one student's story is not a guarantee. Use it alongside official housing information and the university's published support services.",
        ],
      },
      {
        heading: "Research career relevance without relying on promises",
        paragraphs: [
          "Look for evidence of how the programme builds useful skills: substantial projects, access to relevant facilities, careers support, and opportunities to interact with employers. Ask whether placements are compulsory, optional, competitive, or separately arranged. A course mentioning industry links does not automatically mean every student receives a placement or a job offer.",
          "If the qualification leads towards a regulated profession, investigate recognition and any further requirements in the country where you hope to work. For immigration or post-study work questions, use the relevant government's current guidance. Keep education fit and career development central to the decision; rules can change, and an attractive route today should not be treated as a permanent promise.",
        ],
      },
      {
        heading: "Use a comparison sheet to make the decision clearer",
        paragraphs: [
          "Imagine a student comparing a higher-cost programme with excellent specialist modules and a lower-cost option with a broader curriculum. The answer depends on priorities, not on which country sounds more impressive. Give each factor a weight that reflects your situation: course fit might matter most, followed by affordability, entry requirements, and student support. Write a short explanation beside each score so the numbers remain meaningful.",
          "Discuss the comparison with your family or counsellor, then decide what still needs verification. A shortlist is ready when you can explain why each option belongs on it and what would make you choose one over another. DreamGlobal can help turn that discussion into a practical application plan based on your profile, budget, and aspirations.",
        ],
        checklist: [
          "Read the current programme modules and entry requirements.",
          "Compare total programme costs and confirmed funding.",
          "Check accommodation, student support, and personal preferences.",
          "Record application deadlines and unresolved questions.",
          "Choose a balanced shortlist with a clear reason for every option.",
        ],
      },
    ],
    resources: [fundingResource, deadlineResource],
  },
  "documents-to-prepare-before-applying-abroad": {
    sections: [
      {
        heading: "Build a checklist for each application",
        paragraphs: [
          "There is no single document pack that fits every country, university, and programme. Begin with the official application instructions for each choice. Create a tracker with the document name, who issues it, required format, deadline, and submission method. Mark whether an item is needed at application, after an offer, or during a later process. This prevents you from collecting unnecessary material while overlooking something essential.",
          "Separate admissions documents from scholarship and immigration documents. They may overlap, but the recipient and rules can differ. A university accepting a particular file does not mean another organisation will accept it. When instructions conflict with a general checklist, follow the receiving institution's requirements and ask for clarification rather than guessing.",
        ],
      },
      {
        heading: "Organise identity and academic records first",
        paragraphs: [
          "Check your passport details against your academic records: name, date of birth, and other identifying information should be accurate. If a difference exists, ask the issuing authority or receiving institution what evidence is needed to explain it. Do not edit an official document yourself. Check passport validity against the current requirements relevant to your intended journey rather than assuming one rule applies everywhere.",
          "Collect the academic records your programmes request, such as marksheets, transcripts, completion certificates, or evidence of ongoing study. Ask your school or university how long issuing official copies takes. Some applications have specific requirements for translations or documents sent directly by an institution. Keep those instructions in your tracker; a readable personal copy and an officially submitted record may serve different purposes.",
        ],
      },
      {
        heading: "Make your CV and statement specific to the course",
        paragraphs: [
          "A student CV should make relevant experience easy to find. Include education, projects, internships, employment, volunteering, and useful skills, with accurate dates. Explain what you actually did rather than filling the page with broad adjectives. For example, describe the question your project explored, your role, and the tools you used. A clear account of modest experience is stronger than an impressive claim you cannot explain.",
          "Where a statement or application response is requested, answer the institution's actual prompt. Explain your interest in the subject, the experiences that prepared you, and why the programme fits your goals. Avoid copying the same paragraph into every application without reviewing it. If you receive writing support, retain your own voice and check the institution's rules on outside help and AI tools.",
        ],
      },
      {
        heading: "Give recommenders enough time and useful context",
        paragraphs: [
          "If recommendations are required, choose people who know your work well and meet the programme's stated criteria. A teacher who can describe your progress may offer more useful evidence than someone with an impressive title who barely knows you. Ask whether they are comfortable recommending you, explain the deadlines, and confirm whether the letter must be submitted through a private link or another official process.",
          "Provide a brief information pack: your course choices, relevant projects, a current CV, and reminders of work you completed with them. This helps the recommender write accurately without expecting them to remember everything. Keep track of submission status and send polite reminders. Do not write or upload a letter in their name unless the receiving institution explicitly permits that process.",
        ],
      },
      {
        heading: "Prepare course-specific evidence and financial records",
        paragraphs: [
          "Creative programmes may request a portfolio, research programmes may request a proposal, and some courses may ask for work experience evidence or test results. Check the exact format and selection criteria before preparing them. A portfolio should explain your contribution and process, not simply show polished images. A research proposal should address the requested questions and demonstrate a realistic area of investigation.",
          "For financial evidence, first identify who is asking and what they require. Scholarship applications, universities, lenders, and immigration authorities can use different criteria. Use current official instructions for acceptable evidence, dates, and submission channels. Keep sensitive records in a secure folder and share them only through the appropriate process. Avoid sending identity and bank documents casually to unverified contacts.",
        ],
      },
      {
        heading: "Run a final check before pressing submit",
        paragraphs: [
          "Create a clean folder for each application and name files clearly, such as your name followed by the document type. Open every uploaded file to confirm it is readable, complete, and the correct version. Follow the portal's file limits and upload instructions. For UK undergraduate applications, UCAS publishes specific document guidance; other application systems may work differently, so do not transfer those rules automatically.",
          "Set aside a review session for names, dates, course titles, attachments, and unanswered fields. Ask a trusted reviewer to look for inconsistencies, then check the final submission yourself. Save the confirmation and note any follow-up actions. A tidy document system also makes it easier to respond quickly if admissions requests clarification or additional evidence.",
        ],
        checklist: [
          "Confirm the official checklist for every programme.",
          "Request records and recommendations before your internal deadline.",
          "Tailor statements and CVs without changing factual details.",
          "Check file quality, naming, format, and submission method.",
          "Save confirmations and track outstanding requests.",
        ],
      },
    ],
    resources: [{ label: "UCAS: official guidance on uploading application documents", url: "https://www.ucas.com/applying/applying-to-university/uploading-documents-to-your-application" }],
  },
  "what-students-should-know-about-intakes": {
    sections: [
      {
        heading: "An intake is a course start date, not an application deadline",
        paragraphs: [
          "Students often use the words intake and deadline interchangeably, but they describe different milestones. The intake tells you when teaching begins. The application deadline tells you when the university expects a completed application. You may also face separate dates for scholarships, interviews, offer acceptance, accommodation, or meeting conditions. Put each milestone in its own column rather than recording one date for the whole process.",
          "The original course start date should come from the programme's current official listing. Broad labels such as autumn or spring help with orientation, but availability varies by university and course. Do not assume that every programme offers a September or January start. The correct question is: when does this particular programme admit students, and what must I complete before that date?",
        ],
      },
      {
        heading: "Choose the intake around readiness and course fit",
        paragraphs: [
          "An earlier departure is not automatically a better decision. Compare the programmes actually available, your academic completion date, language preparation, document readiness, and funding plan. If the next intake requires you to rush into a course that does not suit your goals, waiting for a stronger option may be more sensible. The aim is a workable start to the right programme.",
          "Think about dependencies. You may be able to research universities before receiving final results, but whether you can apply with pending qualifications depends on the institution. Ask what can be submitted now, what must follow later, and the latest date for meeting conditions. Keep these answers in writing where possible so your plan is based on confirmed information.",
        ],
      },
      {
        heading: "Work backwards from the start of teaching",
        paragraphs: [
          "Once you have a target, create a reverse timeline. Start with arrival and enrolment, then work backwards through accommodation, travel preparation, any required immigration process, offer acceptance, funding, applications, tests, and research. This exposes tasks that need to begin before you expected. A recommendation or official transcript may depend on someone else's availability, so leave space for those delays.",
          "As an illustrative planning framework, spend the earlier stage clarifying your course and budget, the next stage gathering documents and strengthening your profile, and the application stage completing tailored submissions. Your exact calendar may be shorter or longer. Set internal deadlines before official ones so a technical issue or missing record does not consume the last available day.",
        ],
      },
      {
        heading: "Track scholarship deadlines separately",
        paragraphs: [
          "A course application remaining open does not establish that its funding opportunities are still open. Review the official scholarship pages alongside admissions information and note whether funding needs a separate application or an admission offer first. Where the sequence is unclear, contact the provider. You want to understand both eligibility and timing before choosing your submission order.",
          "Keep one tracker for the entire shortlist with programme starts, application dates, funding dates, and required actions. Check it regularly rather than relying on an old screenshot or a friend's experience. UCAS's official deadline guidance illustrates why dates can differ by application type and course; it should be used for the relevant UK application route, not as a global admissions calendar.",
        ],
      },
      {
        heading: "Understand offers and keep the next steps realistic",
        paragraphs: [
          "When an offer arrives, read every condition carefully. Record what evidence is still needed, when it must be supplied, and the process for accepting or declining. If a deposit is required, review payment deadlines and refund terms before paying. Ask questions while there is time to act. An offer is an important milestone, but it does not finish the preparation for enrolment.",
          "Give yourself room for the remaining tasks rather than booking everything around an optimistic schedule. For any immigration process, consult current official instructions and build your timeline from the requirements that apply to you. Do not treat a university offer as a guarantee of a travel document or assume that a friend's processing experience predicts yours.",
        ],
      },
      {
        heading: "If you miss an intake, make a deliberate next plan",
        paragraphs: [
          "First establish what was missed: a programme deadline, funding round, condition, or the course start itself. Ask admissions whether any suitable option remains or whether the next cycle is more appropriate. Consider alternatives without lowering your standards simply to leave sooner. A different university can be a good choice, but it still needs to meet your academic, financial, and personal priorities.",
          "If you defer your plan, make the additional time useful. Improve a relevant skill, prepare a stronger project, organise records, gain appropriate experience, or revisit your budget. Set a review date and a new application calendar so the delay becomes purposeful. DreamGlobal can help compare the available routes and identify which next step is realistic for your circumstances.",
        ],
        checklist: [
          "Confirm the exact programme and intake on the official website.",
          "Separate application, funding, offer, and enrolment deadlines.",
          "Plan backwards with time for documents and follow-up tasks.",
          "Check conditions and payment terms before committing.",
          "Keep an alternative plan you would be comfortable choosing.",
        ],
      },
    ],
    resources: [deadlineResource],
  },
  "scholarship-readiness-for-international-students": {
    sections: [
      {
        heading: "Understand the award before preparing an application",
        paragraphs: [
          "The word scholarship can describe very different forms of support. An award may reduce tuition, contribute towards living costs, apply only to one year, or cover a particular course. Some opportunities assess academic merit, others consider financial need or a specific achievement. Read the provider's current description rather than assuming that every award is a full scholarship available to every international applicant.",
          "Record who is eligible, what the award covers, how applications are assessed, and whether it can be combined with other support. Note any renewal requirements and obligations. If the wording is unclear, contact the provider before investing time in an essay. The most useful scholarship for you is one that fits your circumstances and meaningfully reduces a cost you would otherwise need to meet.",
        ],
      },
      {
        heading: "Build a focused scholarship tracker",
        paragraphs: [
          "Begin with the official funding pages of your shortlisted universities and relevant scholarship providers. EducationUSA also offers official resources for researching finance options for U.S. study. Treat directories as starting points: verify the opportunity on the provider's own website before relying on eligibility, deadlines, or award details. An attractive listing can be outdated even if it appears near the top of a search.",
          "Use a tracker with the award name, source link, eligible course, required documents, deadline, application method, decision schedule, and renewal terms. Add a brief note explaining why you fit the criteria. Prioritise opportunities where you can demonstrate the requested evidence rather than submitting many applications that do not match. Recheck the tracker when you change your course or university shortlist.",
        ],
      },
      {
        heading: "Develop evidence that matches the selection criteria",
        paragraphs: [
          "A strong profile is more than a folder of unrelated certificates. Start with the scholarship's criteria and choose experiences that show them. If it values leadership, explain a responsibility you took, the decisions you made, and the outcome. If it values academic engagement, describe a project, investigation, or sustained subject interest. Give concrete details that a reviewer can understand without knowing your background.",
          "For example, helping a school club run a tutoring programme can show planning and service if you explain your contribution honestly. State how you organised sessions, adapted to a challenge, or worked with others. Do not inflate participation into leadership or invent results. Thoughtful reflection on a smaller contribution is more credible than a sweeping achievement with no supporting detail.",
        ],
      },
      {
        heading: "Write for the scholarship's actual purpose",
        paragraphs: [
          "A scholarship response and an admissions statement may ask different questions. Read the prompt closely and identify what each paragraph needs to establish. Connect your goals to the award's purpose, explain the preparation you have undertaken, and show how the support would help. Avoid spending most of the word limit repeating your CV or praising the institution in general terms.",
          "Where financial need is relevant, explain your circumstances clearly and provide only the evidence requested through the appropriate channel. Ask recommenders early and give them the criteria and deadline. Review the submission for accuracy, consistency, and the provider's rules about outside writing assistance. Your final application should sound like you and remain something you can discuss confidently in an interview.",
        ],
      },
      {
        heading: "Compare the remaining cost, not just the award headline",
        paragraphs: [
          "Use a simple hypothetical comparison: a programme costing 20 units with a 5-unit tuition award leaves 15 units before other expenses, while a programme costing 14 units with a 2-unit award leaves 12. The larger scholarship is not automatically the cheaper choice. Add living costs and the programme duration, then compare the full remaining cost. These numbers illustrate a method rather than actual fees or awards.",
          "Prepare one budget with confirmed support and another showing what happens if a pending application is unsuccessful. If a loan may be needed, obtain the lender's actual terms and consider repayment with your family. Decide how much uncertainty you can reasonably accept before paying deposits. A scholarship can be valuable without covering everything, but the remaining funding plan still needs to be workable.",
        ],
      },
      {
        heading: "Use early planning to improve preparation",
        paragraphs: [
          "Starting early gives you time to discover opportunities, request evidence, revise essays, and meet separate deadlines. It also leaves room to strengthen relevant skills or complete a meaningful project before applying. Early planning helps you make a better submission; it does not guarantee selection or increase an award simply because you began sooner. The benefit is preparation and access to opportunities you might otherwise miss.",
          "After receiving an award, read the written terms before making decisions. Confirm whether acceptance, enrolment, academic progress, or other conditions apply and record future review dates. Keep copies of correspondence and ask the provider about any change in circumstances. DreamGlobal can help organise your search and application plan while keeping the focus on suitable opportunities and a realistic budget.",
        ],
        checklist: [
          "Verify eligibility and coverage on the provider's official page.",
          "Match your evidence to the award's stated selection criteria.",
          "Track scholarship deadlines separately from admission deadlines.",
          "Compare total remaining costs with and without the award.",
          "Read renewal conditions and keep written confirmation.",
        ],
      },
    ],
    resources: [fundingResource],
  },
  "career-counselling-for-confident-decisions": {
    sections: [
      {
        heading: "Begin with the decision you need to make",
        paragraphs: [
          "A useful counselling conversation starts with a concrete question. A school student might be deciding between subject combinations. A college student might be comparing specialisations or postgraduate study. A working professional might be considering a change of role. Naming the decision helps the conversation stay focused and makes it easier to identify what information is missing.",
          "Bring a short account of your situation: subjects or tasks you enjoy, activities you avoid, recent academic or work experiences, and the options you are considering. You do not need a polished career goal before asking for support. Uncertainty is useful information when you can explain what creates it, whether that is lack of exposure, family expectations, budget, or conflicting interests.",
        ],
      },
      {
        heading: "Look at interests, abilities, values, and circumstances together",
        paragraphs: [
          "Enjoying a subject, doing well in it, and wanting the work associated with it are related but separate questions. A student may enjoy biology while having little interest in clinical practice, or enjoy technology without wanting a coding-heavy role. Explore the activities behind the course title. Ask what kinds of problems, people, tools, and environments you would like to spend time with.",
          "Values and practical circumstances also matter. Consider whether you prefer structure or variety, independent work or teamwork, and a local route or the possibility of moving. Discuss time, finances, responsibilities, and available support openly. A plan that fits your interests but ignores the resources needed to pursue it may be difficult to act on; counselling should help bring those pieces together.",
        ],
      },
      {
        heading: "Use assessments as one input to a wider conversation",
        paragraphs: [
          "An appropriate career assessment can provide a starting point for discussing interests or strengths, but a report should be interpreted alongside your experiences and goals. Ask what the assessment measures, how it was designed, and how the results will be explained. A useful session gives you room to question a result rather than presenting it as a label you must accept.",
          "CareerOneStop's exploration resources distinguish interests from skills and encourage learning about related occupations. Use that distinction when discussing your own profile: an interest suggests something to explore, while a skill indicates something you can currently do. Both can develop. The aim is to generate and test useful possibilities, not to assume that one score defines your future.",
        ],
      },
      {
        heading: "Compare pathways instead of choosing by popularity",
        paragraphs: [
          "Once you have a few directions, compare the education required, entry conditions, learning demands, typical tasks, and costs. Read course modules and talk to people studying or working in the field. Ask what they actually do in a normal week and which parts are challenging. A fashionable title can hide work you dislike, while a less familiar pathway may fit your strengths well.",
          "For example, a student interested in design and technology could explore several options rather than immediately choosing one degree. A small interface project, an introductory technical lesson, and a conversation with a practitioner can reveal different aspects of that interest. The counsellor can help the student reflect on those experiences and compare the preparation needed for each possible route.",
        ],
      },
      {
        heading: "Turn family discussions into a shared plan",
        paragraphs: [
          "Parents and students can agree on wanting a good future while disagreeing about the route. Try separating the concern from the proposed solution. A parent suggesting a particular course may be worried about stability or cost; a student resisting it may be worried about daily work or motivation. Naming those concerns creates a more useful discussion than repeating which course each person prefers.",
          "Bring evidence to that conversation: programme requirements, a realistic budget, the student's experiences, and alternatives. Agree on which questions still need research and who will help answer them. The student should have space to explain their preferences while the family can discuss practical limits. A written comparison makes it easier to revisit decisions without starting the same argument again.",
        ],
      },
      {
        heading: "Leave with actions, not only reassurance",
        paragraphs: [
          "A good outcome is a short, workable plan. Identify the leading options, the reason for considering each, and an action that will test or strengthen the choice. This might mean reviewing two course syllabuses, completing a subject project, meeting a professional, or checking admissions requirements. Assign a date to each action and decide when to review what you learned.",
          "Build in room to adjust. New experiences may confirm an interest or show that a different direction fits better. That is useful progress, not failure. School students, college students, and professionals all benefit from checking their plans as circumstances change. DreamGlobal's counselling can help connect self-understanding with education choices, skill development, and practical next steps that you can explain with confidence.",
        ],
        checklist: [
          "Describe the decision and the questions you want answered.",
          "Discuss interests, abilities, values, and practical constraints.",
          "Compare a small number of pathways using real evidence.",
          "Choose a project or conversation to test your assumptions.",
          "Agree on actions, dates, and a follow-up review.",
        ],
      },
    ],
    resources: [careerResource],
  },
  "how-psychometric-assessment-supports-career-planning": {
    sections: [
      {
        heading: "Understand what your assessment actually measures",
        paragraphs: [
          "Psychometric assessment is a broad term, and not every tool measures the same things. An interest questionnaire explores preferred activities, an aptitude assessment examines performance on particular tasks, and a personality questionnaire asks about patterns in how you tend to respond. Ask which areas your assessment covers before interpreting the report. A colourful chart is useful only when you understand what its categories mean.",
          "Also ask what evidence supports the tool's use for someone of your age and background. The language, instructions, and purpose should be clear. If you need an accommodation or have concerns about access, raise them before starting. A career-focused assessment is intended to support exploration; it should not be treated as a medical diagnosis or a complete judgement of your ability.",
        ],
      },
      {
        heading: "Prepare honestly instead of trying to get a 'good' result",
        paragraphs: [
          "For interest or personality questions, answer based on your usual preferences rather than the person you think a parent, teacher, or employer wants you to be. These questions are most helpful when they reflect your experience. For timed aptitude tasks, follow the instructions, work in a suitable environment, and ask in advance what conditions the provider expects.",
          "If illness, language difficulty, interruptions, or misunderstanding affected the session, tell the counsellor. Do not assume that a result obtained under poor conditions fully represents you. Explain any uncertainty about the questions. The interpretation should consider how the assessment was completed, as well as the report, so that the conversation remains grounded in your circumstances.",
        ],
      },
      {
        heading: "Read patterns rather than treating rankings as destiny",
        paragraphs: [
          "A report might suggest a preference for investigative tasks, practical activity, creativity, or working with people. Treat those patterns as prompts for questions: when have I enjoyed this kind of activity, and when have I found it difficult? Ask what a score compares you with and what it does not establish. A small difference between categories need not justify a major life decision.",
          "Separate current performance from future development. If one task is difficult today, you may need better preparation, different teaching, or further practice before deciding whether the pathway suits you. Equally, performing well at a task does not mean you must build your career around it. Your interest, values, academic record, and willingness to develop the required skills belong in the discussion.",
        ],
      },
      {
        heading: "Connect the findings with your real experience",
        paragraphs: [
          "Suppose an assessment suggests that a student enjoys analysis and helping others. Rather than assigning a single career, explore several contexts where those preferences could matter. The student could investigate health-related study, educational research, user research, or other suitable routes. Check the subject requirements and daily work involved before deciding which possibilities deserve more attention.",
          "Bring examples from school, projects, hobbies, volunteering, or employment. Perhaps the student enjoyed interpreting survey results but disliked writing a lengthy report, or liked explaining ideas but found repeated public presentations tiring. Those details help refine the picture. A qualified counsellor can help explore why the report and lived experience align in some areas and differ in others.",
        ],
      },
      {
        heading: "Test the shortlist through small experiences",
        paragraphs: [
          "Translate each promising direction into a low-cost exploration activity. Read a first-year module outline, try an introductory lesson, complete a small project, or speak with someone in the field. Record what you enjoyed, what challenged you, and what you would like to understand next. This gives you evidence that a course title or assessment score cannot provide on its own.",
          "Keep the experiments manageable. A school student might compare a short data task with a design task over two weekends. A college student might interview two professionals about different roles. A working professional might explore a new skill before considering further study. The point is to learn enough to improve the decision, not to commit to a costly programme immediately after receiving a report.",
        ],
      },
      {
        heading: "Ask for an explanation and a practical follow-up plan",
        paragraphs: [
          "Before choosing a provider, ask who interprets the results, what the feedback session includes, and whether you receive an understandable report. Discuss how your information will be stored and shared. You should be able to explain the purpose of the assessment and understand how it supports the decision you are making. Ask for clarification when technical language obscures the practical meaning.",
          "At the end, identify the options to explore, skills to strengthen, and next review date. Keep the report as one piece of evidence alongside your later experiences. CareerOneStop's interests and skills resources offer another way to think about these different inputs. DreamGlobal can help connect assessment findings with suitable subjects, courses, and career exploration without reducing your future to a single label.",
        ],
        checklist: [
          "Confirm the assessment's purpose and what it measures.",
          "Ask about suitability, interpretation, and data handling.",
          "Discuss results alongside academic and real-life experiences.",
          "Test promising options through small practical activities.",
          "Use the findings to create a flexible action plan.",
        ],
      },
    ],
    resources: [careerResource],
  },
  "choosing-streams-and-courses-with-clarity": {
    sections: [
      {
        heading: "Separate subject interest from outside pressure",
        paragraphs: [
          "Begin by writing what attracts you to each option in your own words. Do you enjoy the subject itself, the type of work it may lead to, or the reputation attached to it? Notice whether your reasons come mainly from personal experience, friends, family, or social media. Other people's advice can be useful, but you need enough understanding to explain why the choice fits you.",
          "Review the tasks behind your favourite subjects. You might enjoy solving structured problems, interpreting evidence, creating visual work, explaining ideas, or organising people. These activities reveal more than a mark alone. Also identify what you find difficult and whether that difficulty comes from limited practice, lack of interest, or the way the subject has been taught.",
        ],
      },
      {
        heading: "Check which subjects keep your preferred pathways open",
        paragraphs: [
          "If you have a possible degree or career in mind, check its actual entry requirements before choosing subjects. Requirements can differ between institutions and admission routes. Consult current official programme pages and relevant admissions guidance; do not rely solely on a relative's experience from an earlier year. If you are unsure how a particular subject combination is treated, ask the institution directly.",
          "You do not need to keep every possible future open, but you should understand the trade-offs. A subject choice might support one group of programmes while limiting another. Record the options you want to preserve and any alternative routes that may exist. Where a profession requires additional training or recognition, check that separately instead of assuming the degree alone completes the route.",
        ],
      },
      {
        heading: "Compare the curriculum and learning demands",
        paragraphs: [
          "Read the course structure, not only the title. Compare compulsory modules, electives, practical work, projects, assessments, and opportunities to specialise. A broad degree can help you explore several directions, while a specialist course may expect a clearer commitment. Consider how much mathematics, writing, laboratory work, coding, or independent study each option involves and how prepared you feel for it.",
          "For example, two students interested in business may prefer different routes. One could enjoy accounting and numerical analysis; another could be more interested in customer research and communication. Looking closely at modules helps distinguish the options. Ask which skills you are ready to develop, not simply which degree name sounds closest to a job you have heard about.",
        ],
      },
      {
        heading: "Evaluate campus, online, and international routes carefully",
        paragraphs: [
          "An Indian campus programme, an online degree, and overseas study can meet different needs. Compare the quality of the learning experience, costs, schedule, support, assessment format, and your ability to manage the workload. Campus learning may suit someone seeking regular face-to-face interaction; an online route may appeal to a person balancing work or other responsibilities. Neither format is automatically right for everyone.",
          "Before committing, verify the institution and programme through the relevant official recognition or accreditation sources for that route. Check whether the qualification is accepted for your intended further study or professional purpose. Ask about practical components, examinations, attendance, and any in-person requirements. A convenient schedule is valuable only when the programme also serves your educational goal.",
        ],
      },
      {
        heading: "Build a decision sheet with costs and alternatives",
        paragraphs: [
          "Choose a few factors that genuinely matter to you: subject fit, entry requirements, affordability, teaching approach, location, flexibility, and career relevance. Give each option a short evidence-based note under those headings. Highlight information you still need rather than pretending every comparison is settled. Discuss the sheet with a counsellor or family member who can help challenge assumptions constructively.",
          "Include the full cost and a realistic funding plan. Check scholarship criteria and deadlines separately, and distinguish awarded support from hoped-for support. Identify an alternative you would be comfortable pursuing if admission or funding does not work out. A backup should still fit your interests and circumstances; it should not be a random choice made only to reduce anxiety.",
        ],
      },
      {
        heading: "Try the work before making the commitment",
        paragraphs: [
          "Use small experiences to test what the comparison suggests. Attend a subject taster, complete a beginner project, speak to a current student, or ask a professional about a typical working day. Prepare specific questions: which tasks take the most time, which skills were harder to learn, and what did the person misunderstand before entering the field? Their answers can make your research more concrete.",
          "Afterward, review what changed. Perhaps you liked the project but discovered a prerequisite to strengthen, or found that another course better matched your interests. Turn that insight into a plan with subjects to focus on, applications to prepare, and a date to review progress. DreamGlobal can help school students, college students, and professionals compare routes and move from a broad interest to a reasoned next step.",
        ],
        checklist: [
          "Explain your interest using activities and experiences.",
          "Verify subject requirements for the pathways you want.",
          "Compare modules, assessment styles, and learning formats.",
          "Check recognition, full costs, and funding assumptions.",
          "Test an option and set concrete next steps.",
        ],
      },
    ],
    resources: [careerResource, deadlineResource],
  },
};
