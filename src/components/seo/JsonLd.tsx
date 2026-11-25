type JsonLdProps = {
  siteUrl: string;
  siteName: string;
  role: string;
  description: string;
  linkedInUrl: string;
  githubUrl: string;
  email: string;
};

export function JsonLd({
  siteUrl,
  siteName,
  role,
  description,
  linkedInUrl,
  githubUrl,
  email,
}: JsonLdProps) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteName,
    jobTitle: role,
    url: siteUrl,
    sameAs: [linkedInUrl, githubUrl],
    email: `mailto:${email}`,
    knowsAbout: [
      "Software Engineering",
      "Backend Engineering",
      "Full-Stack Development",
      "Applied AI",
      "Autonomous Agents",
      "PostgreSQL",
      "Node.js",
      "TypeScript",
      "React",
      "Next.js",
      "Google Cloud",
      "Docker",
      "CI/CD",
      "Payments and Billing",
      "Flutter",
      "UX/UI",
    ],
    description,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: ["en", "es"],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: siteName,
    url: siteUrl,
    inLanguage: "en",
    mainEntity: {
      "@type": "Person",
      name: siteName,
      jobTitle: role,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
    </>
  );
}
