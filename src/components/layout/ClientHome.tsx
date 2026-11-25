"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  dictionaries,
  defaultLocale,
  isLocale,
  type Locale,
} from "@/app/i18n";
import { SideDock } from "@/components/navigation/SideDock";
import { InteractiveBackground } from "@/components/effects/InteractiveBackground";
import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { CaseStudyModal } from "@/components/sections/CaseStudyModal";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";

const localeKey = "portfolio:locale";
const experienceChange = "portfolio:experience-changed";
const localeChange = "portfolio:locale-changed";
let sessionLocale: Locale = defaultLocale;

function readLocale(): Locale {
  try {
    const stored = localStorage.getItem(localeKey);
    if (stored && isLocale(stored)) return stored;
  } catch {
    // Storage can be unavailable in privacy-restricted sessions.
  }

  return sessionLocale;
}

function subscribeLocale(notify: () => void) {
  window.addEventListener(localeChange, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(localeChange, notify);
    window.removeEventListener("storage", notify);
  };
}

function readExperience() {
  return new URLSearchParams(window.location.search).get("experience");
}

function subscribeExperience(notify: () => void) {
  window.addEventListener(experienceChange, notify);
  window.addEventListener("popstate", notify);
  return () => {
    window.removeEventListener(experienceChange, notify);
    window.removeEventListener("popstate", notify);
  };
}

function redirectLegacyAnchor() {
  const url = new URL(window.location.href);
  const target = { "#work": "experience", "#build": "contact" }[url.hash];
  if (!target) return;

  url.hash = target;
  window.history.replaceState(window.history.state, "", url);
  document.getElementById(target)?.scrollIntoView({ block: "start" });
}

function openExperience(slug: string) {
  const url = new URL(window.location.href);
  url.searchParams.delete("experience");
  url.hash = "experience";

  // Back should return to the timeline at the original scroll position.
  window.history.replaceState(window.history.state, "", url);
  url.searchParams.set("experience", slug);
  window.history.pushState({ portfolioExperience: true }, "", url);
  window.dispatchEvent(new Event(experienceChange));
}

function closeExperience() {
  if (window.history.state?.portfolioExperience) {
    window.history.back();
    return;
  }

  const url = new URL(window.location.href);
  url.searchParams.delete("experience");
  url.hash = "experience";
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(experienceChange));
}

export function ClientHome() {
  const locale = useSyncExternalStore(subscribeLocale, readLocale, (): Locale => defaultLocale);
  const selectedSlug = useSyncExternalStore(subscribeExperience, readExperience, () => null);
  const dictionary = dictionaries[locale];
  const selectedExperience = dictionary.caseStudies.find((item) => item.slug === selectedSlug);
  const selectedProject = dictionary.experienceContent.items.find((item) => item.slug === selectedSlug);

  const handleToggleLocale = () => {
    sessionLocale = locale === "es" ? "en" : "es";
    try {
      localStorage.setItem(localeKey, sessionLocale);
    } catch {
      // Keep the selected language for the current session.
    }
    window.dispatchEvent(new Event(localeChange));
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    redirectLegacyAnchor();
    window.addEventListener("hashchange", redirectLegacyAnchor);
    return () => window.removeEventListener("hashchange", redirectLegacyAnchor);
  }, []);

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
      <Hero
        content={dictionary.heroContent}
        siteConfig={dictionary.siteConfig}
      />
      <Experience content={dictionary.experienceContent} onOpen={openExperience} />
      <Capabilities content={dictionary.capabilitiesContent} />
      <Contact content={dictionary.contactContent} siteConfig={dictionary.siteConfig} />
      <Footer content={dictionary.footerContent} siteConfig={dictionary.siteConfig} />

      <CaseStudyModal
        experience={selectedExperience}
        logo={selectedProject?.logo}
        sectionTitles={dictionary.caseStudySectionTitles}
        onClose={closeExperience}
      />
    </main>
  );
}
