const DEFAULT_SITE_URL = "https://example.com";

function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const candidate = fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_SITE_URL;

  try {
    return new URL(candidate).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  name: "Excelora",
  title: "Excelora | Premium GCSE & A-Level Maths Tuition",
  description:
    "Excelora delivers premium GCSE and A-Level Maths lessons with structured support, exam focus, and high standards.",
  url: getSiteUrl(),
};
