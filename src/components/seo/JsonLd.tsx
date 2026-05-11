type JsonLdProps = {
  siteUrl: string;
  siteName: string;
  role: string;
  description: string;
  linkedInUrl: string;
  email: string;
};

export function JsonLd({
  siteUrl,
  siteName,
  role,
  description,
  linkedInUrl,
  email,
}: JsonLdProps) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Christopher Paz León",
    jobTitle: role,
    url: siteUrl,
    sameAs: [linkedInUrl],
    email: `mailto:${email}`,
    knowsAbout: [
      "Flutter",
      "Dart",
      "Supabase",
      "PostgreSQL",
      "UX/UI",
      "AI workflows",
      "Mobile development",
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
      name: "Christopher Paz León",
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
