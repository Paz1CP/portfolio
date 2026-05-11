export type CaseStudy = {
  slug: string;
  projectName: string;
  eyebrow: string;
  title: string;
  role: string;
  timeline: string;
  context: string;
  ownedTitle: string;
  owned: string;
  keyWork: readonly string[];
  technicalHighlights: readonly string[];
  assets: readonly string[];
  visualVariant: "map" | "matching" | "system";

  workflowTitle?: string;
  workflow?: readonly string[];
  designSystemWork?: readonly string[];
  proof?: readonly string[];
  businessProof?: string;
  currentState?: readonly string[];
};

export type CaseStudySlug = string;

export const caseStudies = [
  {
    slug: "4track-vistogps-pro",
    projectName: "4Track / VistoGPS",
    eyebrow: "Case study / Production mobile",
    title: "Flutter GPS tracking apps shipped across stores.",
    role: "Mobile Software Engineer",
    timeline: "Oct 2024 – Oct 2025",
    context:
      "4Track / VistoGPS is a GPS tracking product used by businesses to monitor vehicles and operational activity. The product needed a stronger mobile experience for realtime tracking, maps, authentication and production deployment across multiple app stores.",
    ownedTitle: "What I owned",
    owned:
      "I owned the mobile/frontend side end to end: UX/UI redesign, Flutter implementation, realtime map flows, mobile architecture, native integrations, store releases and collaboration with backend, infrastructure and management.",
    keyWork: [
      "Redesigned the mobile UX/UI in Figma.",
      "Implemented production Flutter apps from Figma to store release.",
      "Built realtime GPS tracking flows with WebSockets and map rendering.",
      "Integrated custom backend auth/push, biometric authentication, offline sync and local persistence.",
      "Shipped apps across Google Play, App Store and Huawei Gallery.",
      "Delivered mobile design and implementation still used in production after the engagement.",
    ],
    technicalHighlights: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Clean Architecture",
      "WebSockets",
      "Maps",
      "Custom backend auth/push",
      "Biometric authentication",
      "Offline sync",
      "Local persistence",
      "Codemagic",
      "Google Play Console",
      "App Store Connect",
      "Huawei Gallery",
    ],
    proof: [
      "Published production apps across Google Play, App Store and Huawei Gallery.",
      "Public listings show 1K+ downloads across related production apps.",
      "The delivered mobile design and implementation remained in production after the engagement.",
    ],
    assets: [
      "4track_google_play_listing",
      "vistogps_google_play_listing",
      "4track_huawei_gallery_listing",
      "4track_map_screen",
      "4track_figma_redesign",
      "4track_mobile_flow",
    ],
    visualVariant: "map",
  },
  {
    slug: "jobmatch",
    projectName: "JobMatch",
    eyebrow: "Case study / AI-powered MVP",
    title: "Core MVP foundation for an AI-powered recruiting platform.",
    role: "Technical Product Lead — Contract",
    timeline: "May 2025 – Mar 2026",
    context:
      "JobMatch is a recruiting platform built for candidates, companies and recruiters. The product needed a working MVP foundation: authentication, candidate and company flows, job posts, applications, dashboards, matching logic and backend infrastructure.",
    ownedTitle: "What I owned",
    owned:
      "I built the core MVP foundation and worked across product planning, technical architecture, implementation, UX/UI implementation and handoff. The platform foundation supported the ProInnóvate / Startup Perú 12G process and was later extended by another developer for V1.",
    keyWork: [
      "Built the core MVP foundation for candidates, companies and recruiters.",
      "Implemented authentication, user flows, job posts, applications and dashboards.",
      "Structured the Supabase backend, database schema, Row Level Security and Edge Functions.",
      "Engineered AI-assisted matching workflows later used in production.",
      "Implemented shared UX/UI designs and product flows.",
      "Supported product and technical planning for ProInnóvate / Startup Perú 12G.",
      "Completed a clean technical handoff for continued V1 development.",
    ],
    workflowTitle: "AI / matching workflow",
    workflow: [
      "Candidate profile data",
      "Job post requirements",
      "Matching logic",
      "AI-assisted workflow",
      "Score output",
      "Recruiter dashboard",
      "Production extension after handoff",
    ],
    businessProof:
      "The platform foundation contributed to the product and technical preparation behind S/67,000 in ProInnóvate / Startup Perú 12G funding.",
    technicalHighlights: [
      "Supabase",
      "PostgreSQL",
      "SQL",
      "Row Level Security",
      "RLS",
      "Edge Functions",
      "Supabase Auth",
      "Next.js",
      "AI APIs",
      "Prompt systems",
      "Dashboards",
      "Matching logic",
      "Technical handoff",
    ],
    assets: [
      "jm_candidate_dashboard",
      "jm_company_dashboard",
      "jm_matching_results",
      "jm_job_post_flow",
      "jm_application_pipeline",
      "jm_admin_metrics",
      "jm_ai_matching_flow",
    ],
    visualVariant: "matching",
  },
  {
    slug: "cookpilot",
    projectName: "CookPilot",
    eyebrow: "Case study / Pre-launch product",
    title: "An AI-native product built from zero to one.",
    role: "Lead Product Engineer — Pre-launch Side Project",
    timeline: "Oct 2025 – Present",
    context:
      "CookPilot is a pre-launch product I’m building as a side project and product lab. It demonstrates my end-to-end work across product strategy, UX/UI, Figma systems, Flutter development, Supabase architecture, data modeling, high-fidelity assets and AI-assisted workflows.",
    ownedTitle: "What I own",
    owned:
      "I lead product, UX/UI, Figma design system, Flutter development, Supabase architecture, data modeling, visual assets and structured AI workflows.",
    keyWork: [
      "Built the product direction, UX/UI system and mobile experience from scratch.",
      "Created a Figma design system and high-fidelity product screens.",
      "Developed a public landing page, demo and waitlist.",
      "Built the Flutter app foundation and Supabase backend.",
      "Modeled product data and decision flows around user context.",
      "Created high-fidelity product assets, icons and visual materials.",
      "Built AI-assisted workflows using LLM APIs, structured outputs, prompt systems and backend constraints.",
    ],
    workflowTitle: "AI workflow",
    workflow: [
      "User context",
      "Product constraints",
      "Backend rules",
      "Structured LLM output",
      "Validated product response",
      "Mobile UI action",
    ],
    designSystemWork: [
      "UX/UI direction",
      "Figma design system",
      "Visual hierarchy",
      "Product surfaces",
      "Design tokens",
      "High-fidelity assets",
      "App interaction patterns",
      "Figma-to-Flutter execution",
    ],
    technicalHighlights: [
      "Flutter",
      "Dart",
      "Supabase",
      "PostgreSQL",
      "RLS",
      "Edge Functions",
      "LLM APIs",
      "Structured outputs",
      "Prompt systems",
      "UX/UI",
      "Figma",
      "Design systems",
      "Product assets",
      "Data modeling",
    ],
    currentState: [
      "Pre-launch product",
      "Public landing page",
      "Demo",
      "Waitlist",
      "Flutter app in development",
      "Supabase backend",
      "Product system in progress",
    ],
    assets: [
      "cookpilot_figma_board",
      "cookpilot_mobile_home",
      "cookpilot_decision_flow",
      "cookpilot_design_system",
      "cookpilot_avatar_asset",
      "cookpilot_ai_workflow",
      "cookpilot_product_wall",
    ],
    visualVariant: "system",
  },
] satisfies readonly CaseStudy[];

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug) ?? null;
}