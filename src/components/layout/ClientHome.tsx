"use client";

import { useState } from "react";
import {
  dictionaries,
  defaultLocale,
  type Locale,
} from "@/app/i18n";
import { SideDock } from "@/components/navigation/SideDock";
import { InteractiveBackground } from "@/components/effects/InteractiveBackground";
import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { CaseStudyModal } from "@/components/sections/CaseStudyModal";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";

export function ClientHome() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const dictionary = dictionaries[locale];

  const handleToggleLocale = () => {
    setLocale((current) => (current === "es" ? "en" : "es"));
  };

  return (
    <main className="portfolio-page desktop-rail-offset">
      <InteractiveBackground />
      <div className="grain-layer" />
      <div className="page-vignette" />

      <SideDock
        navigationItems={dictionary.navigationItems}
        locale={locale}
        onToggleLocale={handleToggleLocale}
      />
      <Hero content={dictionary.heroContent} siteConfig={dictionary.siteConfig} />
      <SelectedWork content={dictionary.selectedWorkContent} />
      <Experience content={dictionary.experienceContent} />
      <Capabilities content={dictionary.capabilitiesContent} />
      <Contact content={dictionary.contactContent} siteConfig={dictionary.siteConfig} />
      <Footer content={dictionary.footerContent} />

        <CaseStudyModal caseStudies={dictionary.caseStudies} />
    </main>
  );
}
