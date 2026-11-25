import en from "./locales/en.json";
import es from "./locales/es.json";

type ExperienceImage = { src: string; alt: string };
type EngineeringTopic = { title: string; body: string };
type ExperienceWorkflow = { title: string; steps: string[]; description?: string };

export type ExperienceDetail = {
  slug: string;
  projectName: string;
  eyebrow: string;
  title: string;
  role: string;
  timeline: string;
  context: string;
  owned: string;
  purpose?: string;
  images: ExperienceImage[];
  keyWork: { title?: string; body: string }[];
  architecture?: ExperienceImage & { body: string; caption: string };
  productWorkflow?: ExperienceWorkflow;
  workflows?: ExperienceWorkflow[];
  engineeringDecisions?: EngineeringTopic[];
  evidenceLinks?: { href: string; label: string; description: string }[];
  designSystemWork?: string[];
  technicalHighlights: string[];
  businessProof?: string;
  currentState?: string[];
};

export type Dictionary = Omit<typeof en, "caseStudies"> & {
  caseStudies: ExperienceDetail[];
};

export const dictionaries: Record<"en" | "es", Dictionary> = {
  en,
  es,
};

export function getDictionary(locale: keyof typeof dictionaries = "en") {
  return dictionaries[locale];
}
