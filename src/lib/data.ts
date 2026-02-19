export type Plan = {
  name: string;
  badge: string;
  price: string;
  cadence?: string;
  details: string;
  bullets: string[];
  termsTitle?: string;
  terms?: string[];
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    name: "A-Level • 3 Month Plan",
    badge: "A-Level • Fast",
    price: "£750",
    cadence: "PCM",
    details: "Course format: Learn from our notes + 2 x 60-minute weekly tutorials",
    bullets: [
      "Intensive 12-week roadmap with clear weekly deliverables",
      "2 x 60-minute weekly tutorials to explain hard topics and practise questions",
      "Priority feedback and rapid correction cycles between sessions",
      "Performance tracking against target-grade milestones",
    ],
    termsTitle: "Cancellation & refund terms",
    terms: [
      "You may cancel after the first month.",
      "Refunds: 50% of remaining fees may be issued if eligibility criteria are met.",
      "Eligibility requires: (1) attendance at all scheduled weekly tutorials, (2) completion of 5+ subsections in your chosen A-Level Maths topic area, and (3) completion of all exam-style questions for each completed subsection.",
      "We may agree tailored targets where appropriate; any changes will be confirmed during your call.",
    ],
  },
  {
    name: "A-Level • 6 Month Plan",
    badge: "A-Level • Normal",
    price: "£500",
    cadence: "PCM",
    details: "Course format: Learn from our notes + 1 x 60-minute weekly tutorial",
    bullets: [
      "Structured long-run roadmap with clear weekly deliverables",
      "1 x 60-minute weekly tutorial to explain hard topics and practise questions",
      "Consistent feedback loops and accountability checkpoints",
      "Performance tracking against target-grade milestones",
    ],
    termsTitle: "Cancellation & refund terms",
    terms: [
      "You may cancel after the first month.",
      "Refunds: no refunds are provided after the first payment.",
      "Eligibility requires: (1) attendance at all scheduled weekly tutorials, (2) completion of 3+ subsections in your chosen A-Level Maths topic area, and (3) completion of all exam-style questions for each completed subsection.",
      "We may agree tailored targets where appropriate; any changes will be confirmed during your call.",
    ],
    highlighted: true,
  },
  {
    name: "A-Level • Traditional Tutoring",
    badge: "A-Level • 1:1",
    price: "£100",
    cadence: "per hour",
    details: "1:1 tutoring only",
    bullets: [
      "Bespoke 1:1 strategy aligned to your target grade and timeline",
      "Tutor-led deep dives with precise weakness and error analysis",
      "Session-by-session action plan with measurable progress checkpoints",
      "Priority scheduling and premium, fully personalised support",
    ],
    termsTitle: "Right-fit call & study requirements",
    terms: [
      "A Free Call is available to confirm student objectives and whether our programme is the right match.",
      "During the Free Call, we explain exactly how we deliver results and review the terms & conditions for the A/A* within 3 months guarantee.",
      "After the call, expectations align with the 6 Month Plan: (1) attendance at agreed check-ins/lessons, (2) completion of 3+ subsections in the chosen A-Level Maths topic area, and (3) completion of all exam-style questions for each completed subsection.",
      "Targets and requirements can be adjusted to match your needs; this is discussed and agreed during your call.",
    ],
  },
  {
    name: "GCSE • 3 Month Plan",
    badge: "GCSE • Fast",
    price: "£550",
    cadence: "PCM",
    details: "Course format: Learn from our notes + 2 x 60-minute weekly tutorials",
    bullets: [
      "Intensive 12-week roadmap with clear weekly deliverables",
      "2 x 60-minute weekly tutorials to explain hard topics and practise questions",
      "Priority feedback and rapid correction cycles between sessions",
      "Performance tracking against target-grade milestones",
    ],
    termsTitle: "Cancellation & refund terms",
    terms: [
      "You may cancel after the first month.",
      "Refunds: 50% of remaining fees may be issued if eligibility criteria are met.",
      "Eligibility requires: (1) attendance at all scheduled weekly tutorials, (2) completion of 5+ subsections in your chosen GCSE Maths topic area, and (3) completion of all exam-style questions for each completed subsection.",
      "We may agree tailored targets where appropriate; any changes will be confirmed during your call.",
    ],
  },
  {
    name: "GCSE • 6 Month Plan",
    badge: "GCSE • Normal",
    price: "£400",
    cadence: "PCM",
    details: "Course format: Learn from our notes + 1 x 60-minute weekly tutorial",
    bullets: [
      "Structured long-run roadmap with clear weekly deliverables",
      "1 x 60-minute weekly tutorial to explain hard topics and practise questions",
      "Consistent feedback loops and accountability checkpoints",
      "Performance tracking against target-grade milestones",
    ],
    termsTitle: "Cancellation & refund terms",
    terms: [
      "You may cancel after the first month.",
      "Refunds: no refunds are provided after the first payment.",
      "Eligibility requires: (1) attendance at all scheduled weekly tutorials, (2) completion of 3+ subsections in your chosen GCSE Maths topic area, and (3) completion of all exam-style questions for each completed subsection.",
      "We may agree tailored targets where appropriate; any changes will be confirmed during your call.",
    ],
    highlighted: true,
  },
  {
    name: "GCSE • Traditional Tutoring",
    badge: "GCSE • 1:1",
    price: "£75",
    cadence: "per hour",
    details: "1:1 tutoring only",
    bullets: [
      "Bespoke 1:1 strategy aligned to your target grade and timeline",
      "Tutor-led deep dives with precise weakness and error analysis",
      "Session-by-session action plan with measurable progress checkpoints",
      "Priority scheduling and premium, fully personalised support",
    ],
    termsTitle: "Right-fit call & study requirements",
    terms: [
      "A Free Call is available to confirm student objectives and whether our programme is the right match.",
      "During the Free Call, we explain exactly how we deliver results and review the terms & conditions for the A/A* within 3 months guarantee.",
      "After the call, expectations align with the 6 Month Plan: (1) attendance at agreed check-ins/lessons, (2) completion of 3+ subsections in the chosen GCSE Maths topic area, and (3) completion of all exam-style questions for each completed subsection.",
      "Targets and requirements can be adjusted to match your needs; this is discussed and agreed during your call.",
    ],
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Ayesha Khan",
    role: "A-Level Maths Student",
    quote:
      "I was stuck at a C because I revised randomly. UpGrade gave me a clear subsection plan and made sure I finished the exam questions for each part. After 6 weeks, my accuracy improved and I went from a C to a solid B in mocks — and finally felt confident on timing.",
  },
  {
    name: "Thomas Reed",
    role: "GCSE Maths Student",
    quote:
      "The biggest difference was routine. The daily check-ins kept me consistent, and each session ended with exam-style questions so I stopped losing marks on wording. I moved up a whole grade boundary in my next assessment.",
  },
  {
    name: "Sana Malik",
    role: "A-Level Maths Student",
    quote:
      "I wasn’t sure if my syllabus matched UK A-Level, but they mapped it quickly and focused on the exact skills I needed. The structured practice + exam questions after every subsection helped me fix weak areas fast and feel prepared for the real exam style.",
  },
  {
    name: "Jamal Hassan",
    role: "Parent of GCSE Maths Student",
    quote:
      "UpGrade were extremely organised. We got weekly targets, clear feedback, and measurable progress. My son became more disciplined and his confidence improved because he could see exactly what he’d completed and what was next.",
  },
  {
    name: "Emily Parker",
    role: "A-Level Maths Student",
    quote:
      "I used to understand topics in class but fall apart on exam questions. UpGrade drilled exam technique — method marks, timing, and how to set work out properly. My mock grade went from C to A and the improvement felt repeatable, not lucky.",
  },

  {
    name: "Omar Ali",
    role: "GCSE Maths Student",
    quote:
      "I was dropping easy marks from silly mistakes. The targeted practice made me slow down in the right places, and the end-of-topic exam questions showed me the exact patterns examiners use. My score jumped by 18 marks on my next paper.",
  },
  {
    name: "Priya Shah",
    role: "A-Level Maths Student",
    quote:
      "We broke my weakest topics into subsections and I had to complete each set of exam questions before moving on. That accountability stopped me skipping hard parts. After two months, I felt confident on integration and my timed papers improved massively.",
  },
  {
    name: "Noah Bennett",
    role: "Parent of A-Level Maths Student",
    quote:
      "What impressed me was how structured everything was. They didn’t just ‘teach’ — they tracked progress and made sure my daughter completed exam questions consistently. Her confidence grew and she stopped panicking in timed conditions.",
  },
  {
    name: "Zara Ahmed",
    role: "GCSE Maths Student",
    quote:
      "The lessons were clear and fast, but never rushed. They showed me how to break down multi-step maths questions and avoid dropping method marks. My grade improved and I finally started enjoying maths again.",
  },
  {
    name: "Daniel Cooper",
    role: "A-Level Maths Student",
    quote:
      "UpGrade fixed my revision because it wasn’t vague anymore — it was measurable. I had to complete subsections and then do the exam questions immediately. That cycle made everything stick, and my mock results improved across every topic area.",
  },
  {
    name: "Mia Collins",
    role: "GCSE Maths Student",
    quote:
      "Before UpGrade, I understood topics but still lost marks in exams. They taught me how maths mark schemes work, and we practised writing full method steps clearly. My teacher noticed my solutions became much more precise.",
  },
  {
    name: "Hassan Iqbal",
    role: "A-Level Maths Student",
    quote:
      "They didn’t let me ‘almost’ understand — we kept going until I could do exam questions under time. The check-ins kept me on track during busy weeks. I improved my timing a lot and stopped leaving big questions unfinished.",
  },
  {
    name: "Grace Liu",
    role: "GCSE Maths Student",
    quote:
      "The plan was simple: learn, practise, exam questions. That structure made revision less stressful. I improved on algebra and problem-solving because we reviewed full working properly, not just whether the final answer was right.",
  },
  {
    name: "Ethan Brooks",
    role: "A-Level Maths Student",
    quote:
      "I needed an A but my weakest areas kept dragging me down. UpGrade identified exactly which subsections were costing marks and gave me a clear order to fix them. The exam-question requirement forced real practice and my consistency improved.",
  },
  {
    name: "Leah Williams",
    role: "Parent of GCSE Maths Student",
    quote:
      "The accountability was the key. The check-ins created routine, and the tutor made sure work was actually completed — not just ‘planned’. My child’s confidence rose because progress was visible and steady.",
  },
  {
    name: "Arjun Patel",
    role: "A-Level Maths Student",
    quote:
      "The biggest win was exam technique. I learned how to structure solutions to maximise method marks and avoid silly slips. By the time mocks arrived, I’d done so many exam questions that the papers felt familiar.",
  },
  {
    name: "Sofia Martinez",
    role: "GCSE Maths Student",
    quote:
      "UpGrade helped me stop freezing in exams. We practised timed questions and reviewed mistakes properly, so I didn’t repeat them. I became quicker, more confident, and my grade improved from a 6 to a 7 in the next mock.",
  },
  {
    name: "Ben Turner",
    role: "GCSE Further Maths Student",
    quote:
      "Very efficient lessons — no wasted time. They explained tough concepts in a clean way, then immediately moved to exam-style practice. My problem-solving improved and I stopped relying on guessing methods.",
  },
  {
    name: "Amina Yusuf",
    role: "A-Level Maths Student",
    quote:
      "I liked that the goals were concrete. I always knew which subsections I had to complete and that I needed to finish every set of exam questions. That consistency improved my accuracy and gave me confidence for harder questions.",
  },
  {
    name: "Kai Robertson",
    role: "GCSE Maths Student",
    quote:
      "I didn’t just learn content — I learned how to score marks in maths papers. The tutor taught me how to interpret questions, what examiners want, and how to avoid common traps. My results improved because my working became exam-ready.",
  },
];

export type FAQItem = { q: string; a: string };

export const faqs: FAQItem[] = [
  {
    q: "Who Is UpGrade Designed For?",
    a: "Students who are serious about improving GCSE Maths or A-Level Maths results through structured teaching, consistent accountability, and exam-focused execution.",
  },
  {
    q: "How Does Onboarding Work After The Free Call?",
    a: "We align on target grades, timeline, exam board, and current gaps, then set a clear starting roadmap with expectations for attendance, independent work, and review points.",
  },
  {
    q: "How Do You Personalise Support Without Losing Structure?",
    a: "Every student follows a structured progress framework, but sequencing, pacing, and emphasis are adapted to their baseline, timeline, and paper-specific weaknesses.",
  },
  {
    q: "What Standard Of Commitment Do You Expect From Students?",
    a: "We expect punctual attendance, completion of assigned subsections, and full completion of exam-style questions. Consistency is a core part of how results are delivered.",
  },
  {
    q: "How Is Progress Measured And Communicated?",
    a: "Progress is tracked against subsection completion, exam-question performance, and quality of method. We use this data to adjust targets and keep improvement measurable.",
  },
  {
    q: "Which Exam Boards And Specifications Do You Cover?",
    a: "We support major UK GCSE and A-Level Maths specifications, including AQA, Edexcel, and OCR. Coverage is confirmed during onboarding.",
  },
  {
    q: "How Do Terms And Refunds Work?",
    a: "Terms are reviewed during your Free Call and confirmed before starting. Refund decisions are considered case by case in line with plan commitments and engagement.",
  },
  {
    q: "What Communication Can Families Expect Outside Lessons?",
    a: "We keep communication concise and performance-focused, with updates centered on progress, risks, and next actions needed to stay on track.",
  },
  {
    q: "Do You Offer A Free Call Before Enrolment?",
    a: "Yes. The Free Call is where we assess objectives, explain delivery, and confirm whether the programme is the right match before any plan begins.",
  },
];
