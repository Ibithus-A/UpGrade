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
    name: "3 Month Plan",
    badge: "Quick",
    price: "£200",
    cadence: "PCM",
    details: "Daily group check-ins (Mon–Fri): 2 check ins",
    bullets: [
      "Fast-paced support with clear weekly targets",
      "Built for short timelines and rapid improvement",
      "Structured A-Level Maths progress tracking",
    ],
    termsTitle: "Cancellation & refund terms",
    terms: [
      "You may cancel after the first month.",
      "Refunds: 50% of remaining fees may be issued if eligibility criteria are met.",
      "Eligibility requires: (1) attendance at all scheduled Mon–Fri group check-ins, (2) completion of 5+ subsections in your chosen A-Level Maths topic area, and (3) completion of all exam-style questions for each completed subsection.",
      "We may agree tailored targets where appropriate; any changes will be confirmed during your call.",
    ],
  },
  {
    name: "6 Month Plan",
    badge: "Normal",
    price: "£150",
    cadence: "PCM",
    details: "Daily group check-ins (Mon–Fri): 1 check-in",
    bullets: [
      "Longer runway for consistent grade building",
      "Sustainable pacing with regular checkpoints",
      "Exam-board aligned approach",
    ],
    termsTitle: "Cancellation & refund terms",
    terms: [
      "You may cancel after the first month.",
      "Refunds: no refunds are provided after the first payment.",
      "Eligibility requires: (1) attendance at all scheduled group check-ins, (2) completion of 3+ subsections in your chosen A-Level Maths topic area, and (3) completion of all exam-style questions for each completed subsection.",
      "We may agree tailored targets where appropriate; any changes will be confirmed during your call.",
    ],
    highlighted: true,
  },
  {
    name: "Custom Plan",
    badge: "1:1",
    price: "£75",
    cadence: "per hour",
    details: "1:1 tutoring only (billed per hour)",
    bullets: [
      "Fully personalised lesson plan",
      "Target weaknesses quickly and efficiently",
      "Flexible scheduling",
    ],
    termsTitle: "Right-fit call & study requirements",
    terms: [
      "A free right-fit call is available to confirm student objectives and whether our programme is the right match.",
      "During the call, we explain exactly how we deliver results and review the terms & conditions for the A/A* within 3 months guarantee.",
      "After the call, expectations align with the 6 Month Plan: (1) attendance at agreed check-ins/lessons, (2) completion of 3+ subsections in the chosen topic area, and (3) completion of all exam-style questions for each completed subsection.",
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
    role: "GCSE Combined Science",
    quote:
      "The biggest difference was routine. The daily check-ins kept me consistent, and each session ended with exam-style questions so I stopped losing marks on wording. I moved up a whole grade boundary in my next assessment.",
  },
  {
    name: "Sana Malik",
    role: "A-Level Maths (International)",
    quote:
      "I wasn’t sure if my syllabus matched UK A-Level, but they mapped it quickly and focused on the exact skills I needed. The structured practice + exam questions after every subsection helped me fix weak areas fast and feel prepared for the real exam style.",
  },
  {
    name: "Jamal Hassan",
    role: "Parent of GCSE Student",
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
    role: "Parent of A-Level Student",
    quote:
      "What impressed me was how structured everything was. They didn’t just ‘teach’ — they tracked progress and made sure my daughter completed exam questions consistently. Her confidence grew and she stopped panicking in timed conditions.",
  },
  {
    name: "Zara Ahmed",
    role: "GCSE Physics Student",
    quote:
      "The lessons were clear and fast, but never rushed. They showed me how to answer 6-mark questions properly and how to pick out what the question is really asking. My physics grade improved and I finally started enjoying the subject.",
  },
  {
    name: "Daniel Cooper",
    role: "A-Level Maths Student",
    quote:
      "UpGrade fixed my revision because it wasn’t vague anymore — it was measurable. I had to complete subsections and then do the exam questions immediately. That cycle made everything stick, and my mock results improved across every topic area.",
  },
  {
    name: "Mia Collins",
    role: "GCSE Chemistry Student",
    quote:
      "Before UpGrade, I’d memorise content but still lose marks. They taught me how exam questions are structured, and we practised the exact phrasing needed for marks. My teacher noticed my answers became much clearer and more precise.",
  },
  {
    name: "Hassan Iqbal",
    role: "A-Level Maths Student",
    quote:
      "They didn’t let me ‘almost’ understand — we kept going until I could do exam questions under time. The check-ins kept me on track during busy weeks. I improved my timing a lot and stopped leaving big questions unfinished.",
  },
  {
    name: "Grace Liu",
    role: "GCSE Biology Student",
    quote:
      "The plan was simple: learn, practise, exam questions. That structure made revision less stressful. I improved on command words and longer answers because we reviewed them properly, not just marked them right or wrong.",
  },
  {
    name: "Ethan Brooks",
    role: "A-Level Maths Student",
    quote:
      "I needed an A but my weakest areas kept dragging me down. UpGrade identified exactly which subsections were costing marks and gave me a clear order to fix them. The exam-question requirement forced real practice and my consistency improved.",
  },
  {
    name: "Leah Williams",
    role: "Parent of GCSE Student",
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
    role: "GCSE Science Student",
    quote:
      "I didn’t just learn content — I learned how to score marks. The tutor taught me how to interpret questions, what examiners want, and how to avoid common traps. My results improved because my answers became exam-ready.",
  },
];

export type FAQItem = { q: string; a: string };

export const faqs: FAQItem[] = [
  {
    q: "Will you add more subjects?",
    a: "Yes. We plan to add more subjects over time. We prioritise quality, so new subjects will only launch once they meet our standards.",
  },
  {
    q: "What happens if I can’t make it to a lesson?",
    a: "No problem — please let us know as soon as possible, ideally at least 24 hours in advance.",
  },
  {
    q: "Do you teach international students?",
    a: "Yes. We teach international equivalents of A-Level Mathematics. If you’re unsure whether your qualification is covered, contact us and we’ll advise.",
  },
  {
    q: "How are payments handled?",
    a: "Payments are made via bank transfer after each lesson.",
  },
  {
    q: "Which exam boards do you teach?",
    a: "We teach all main UK exam boards (e.g., OCR, Edexcel). If you’re unsure, get in touch and we’ll confirm coverage.",
  },
  {
    q: "Do you offer a right-fit call?",
    a: "Yes. We offer a free right-fit call to discuss student objectives, how we deliver them, and the terms & conditions for the A/A* within 3 months guarantee.",
  },
];
