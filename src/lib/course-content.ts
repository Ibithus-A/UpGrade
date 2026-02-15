export type CourseChapter = {
  id: number;
  slug: string;
  title: string;
  sections: string[];
  noteStatus: "empty" | "draft" | "published";
};

export type Course = {
  slug: string;
  title: string;
  subtitle: string;
  chapters: CourseChapter[];
};

function makeChapter(id: number, title: string, sections: string[]): CourseChapter {
  return {
    id,
    slug: `chapter-${String(id).padStart(2, "0")}`,
    title,
    sections,
    noteStatus: "empty",
  };
}

export const aLevelMathsCourse: Course = {
  slug: "a-level-maths",
  title: "A-Level Maths",
  subtitle: "Course chapters",
  chapters: [
    makeChapter(1, "Chapter 1: Algebra 1", [
      "1.1 Argument and proof",
      "1.2 Index laws",
      "1.3 Surds",
      "1.4 Quadratic functions",
      "1.5 Lines and circles",
      "1.6 Simultaneous equations",
      "1.7 Inequalities",
    ]),
    makeChapter(2, "Chapter 2: Polynomials and the binomial theorem", [
      "2.1 Expanding and factorising",
      "2.2 The binomial theorem",
      "2.3 Algebraic division",
      "2.4 Curve sketching",
    ]),
    makeChapter(3, "Chapter 3: Trigonometry", [
      "3.1 Sine, cosine and tangent",
      "3.2 The sine and cosine rules",
    ]),
    makeChapter(4, "Chapter 4: Differentiation and integration", [
      "4.1 Differentiation from first principles",
      "4.2 Differentiating ax^n and Leibniz notation",
      "4.3 Rates of change",
      "4.4 Tangents and normals",
      "4.5 Turning points",
      "4.6 Integration",
      "4.7 Area under a curve",
    ]),
    makeChapter(5, "Chapter 5: Exponentials and logarithms", [
      "5.1 The laws of logarithms",
      "5.2 Exponential functions",
      "5.3 Exponential processes",
      "5.4 Curve fitting",
    ]),
    makeChapter(6, "Chapter 6: Vectors", [
      "6.1 Definitions and properties",
      "6.2 Components of a vector",
    ]),
    makeChapter(7, "Chapter 7: Units and kinematics", [
      "7.1 Standard units and basic dimensions",
      "7.2 Motion in a straight line - definitions and graphs",
      "7.3 Equations of motion for constant acceleration",
      "7.4 Motion with variable acceleration",
    ]),
    makeChapter(8, "Chapter 8: Forces and Newton's laws", [
      "8.1 Forces 1",
      "8.2 Dynamics 1",
      "8.3 Motion under gravity",
      "8.4 Systems of forces",
    ]),
    makeChapter(9, "Chapter 9: Collecting, representing and interpreting data", [
      "9.1 Sampling",
      "9.2 Central tendency and spread",
      "9.3 Single-variable data",
      "9.4 Bivariate data",
    ]),
    makeChapter(10, "Chapter 10: Probability and discrete random variables", [
      "10.1 Probability",
      "10.2 Binomial distribution",
    ]),
    makeChapter(11, "Chapter 11: Hypothesis testing 1", [
      "11.1 Formulating a test",
      "11.2 The critical region",
    ]),
    makeChapter(12, "Chapter 12: Algebra 2", [
      "12.1 Further mathematical proof",
      "12.2 Functions",
      "12.3 Parametric equations",
      "12.4 Algebraic fractions",
      "12.5 Partial fractions",
      "12.6 Vectors in 3D",
    ]),
    makeChapter(13, "Chapter 13: Sequences", [
      "13.1 The binomial series",
      "13.2 Introduction to sequences",
      "13.3 Arithmetic sequences",
      "13.4 Geometric sequences",
    ]),
    makeChapter(14, "Chapter 14: Trigonometric identities", [
      "14.1 Radians",
      "14.2 Reciprocal and inverse trigonometric functions",
      "14.3 Compound angles",
      "14.4 Equivalent forms for a cos θ + b sin θ",
    ]),
    makeChapter(15, "Chapter 15: Differentiation 2", [
      "15.1 The shapes of functions",
      "15.2 Trigonometric functions",
      "15.3 Exponential and logarithmic functions",
      "15.4 The product and quotient rules",
      "15.5 The chain rule",
      "15.6 Inverse functions",
      "15.7 Implicit differentiation",
      "15.8 Parametric functions",
    ]),
    makeChapter(16, "Chapter 16: Integration and differential equations", [
      "16.1 Standard integrals",
      "16.2 Integration by substitution",
      "16.3 Integration by parts",
      "16.4 Integrating rational functions",
      "16.5 Differential equations",
    ]),
    makeChapter(17, "Chapter 17: Numerical methods", [
      "17.1 Simple root finding",
      "17.2 Iterative root finding",
      "17.3 Newton-Raphson root finding",
      "17.4 Numerical integration",
    ]),
    makeChapter(18, "Chapter 18: Motion in two dimensions", [
      "18.1 Two-dimensional motion with constant acceleration",
      "18.2 Two-dimensional motion with variable acceleration",
      "18.3 Motion under gravity 2",
      "18.4 Motion under forces",
    ]),
    makeChapter(19, "Chapter 19: Forces 2", [
      "19.1 Statics",
      "19.2 Dynamics 2",
      "19.3 Moments",
    ]),
    makeChapter(20, "Chapter 20: Probability and continuous random variables", [
      "20.1 Conditional probability",
      "20.2 Modelling with probability",
      "20.3 The Normal distribution",
      "20.4 Using the Normal distribution as an approximation to the binomial",
    ]),
    makeChapter(21, "Chapter 21: Hypothesis testing 2", [
      "21.1 Testing correlation",
      "21.2 Testing a Normal distribution",
    ]),
  ],
};

export function getChapterBySlug(chapterSlug: string) {
  return aLevelMathsCourse.chapters.find((chapter) => chapter.slug === chapterSlug);
}
