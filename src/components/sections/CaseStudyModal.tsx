"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import {
  getCaseStudyBySlug,
  type CaseStudy,
  type CaseStudySlug,
} from "@/content/caseStudies";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const imagesBySlug: Record<string, string[]> = {
  "4track-vistogps-pro": [
    "/images/experience/4TRACK/4T_01.png",
    "/images/experience/4TRACK/4T_02.png",
    "/images/experience/4TRACK/4T_03.png",
    "/images/experience/4TRACK/4T_04.png",
  ],
  jobmatch: [
    "/images/experience/JM/jm_candidate_dashboard.png",
    "/images/experience/JM/jm_candidate_job_search.png",
    "/images/experience/JM/jm_candidate_applications_lane.png",
    "/images/experience/JM/jm_recruiter_kanban_mode.png",
  ],
  cookpilot: [
    "/images/experience/CookPilot/img_app_home.png",
    "/images/experience/CookPilot/img_app_recipe_detail.png",
    "/images/experience/CookPilot/img_app_cookflow_chat.jpg",
    "/images/experience/CookPilot/cookpilot.png",
    "/images/experience/CookPilot/img_app_pricing_comparator.png",
  ],
};

const companyLogos: Record<string, string> = {
  "4track-vistogps-pro": "/images/experience/4TRACK/4track-logo.webp",
  jobmatch: "/images/experience/JM/jobmatch_orange.jpg",
  cookpilot: "/images/experience/CookPilot/cookpilot_logo.png",
};

function GalleryCarousel({ images }: { images: string[] }) {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const len = images.length;

  useEffect(() => {
    if (!len || isHover || shouldReduceMotion) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % len);
    }, 3500);

    return () => window.clearInterval(id);
  }, [len, isHover, shouldReduceMotion]);

  const prev = () => setIndex((current) => (current - 1 + len) % len);
  const next = () => setIndex((current) => (current + 1) % len);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxSrc]);

  if (!len) return <div className="case-modal__placeholder" aria-hidden="true" />;

  return (
    <div
      className="case-modal__carousel"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className="case-modal__carousel-side case-modal__carousel-side--left"
        aria-hidden="true"
      />
      <div
        className="case-modal__carousel-side case-modal__carousel-side--right"
        aria-hidden="true"
      />

      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          onClick={() => setLightboxSrc(src)}
          className={`case-modal__carousel-slide ${i === index ? "is-active" : ""}`}
          style={{
            cursor: i === index ? "pointer" : "default",
            pointerEvents: i === index ? "auto" : "none",
          }}
        />
      ))}

      <div className="case-modal__carousel-controls" aria-hidden={!isHover}>
        <button
          className="case-modal__carousel-arrow case-modal__carousel-arrow--left"
          onClick={prev}
          aria-label="Previous image"
        >
          <ArrowLeft size={18} />
        </button>

        <button
          className="case-modal__carousel-arrow case-modal__carousel-arrow--right"
          onClick={next}
          aria-label="Next image"
        >
          <ArrowRight size={18} />
        </button>
      </div>
      {lightboxSrc && (
        <div
          className="case-modal__lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxSrc(null)}
        >
          <img src={lightboxSrc} alt="Preview" onClick={(e) => e.stopPropagation()} />
          <button
            className="case-modal__lightbox-close"
            aria-label="Close image"
            onClick={() => setLightboxSrc(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

function CaseShowcase({ caseStudy }: { caseStudy: CaseStudy }) {
  const images = imagesBySlug[caseStudy.slug] ?? [];

  return (
    <div
      className={`case-modal__showcase case-modal__showcase--${caseStudy.visualVariant}`}
      aria-label={`${caseStudy.projectName} gallery`}
    >
      <span className="case-modal__showcase-corner case-modal__showcase-corner--tl" />
      <span className="case-modal__showcase-corner case-modal__showcase-corner--br" />

      <GalleryCarousel images={images} />
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="case-modal__section-header">
      <h3 className="case-modal__section-title type-title-s">{children}</h3>
      <span className="case-modal__section-line" />
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <div className="case-modal__list">
      {items.map((item) => (
        <div key={item} className="case-modal__list-item type-body-s">
          <span className="case-modal__list-bullet" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function ChipList({ items }: { items: readonly string[] }) {
  return (
    <div className="case-modal__chips">
      {items.map((item) => (
        <span key={item} className="case-modal__chip">
          {item}
        </span>
      ))}
    </div>
  );
}

function FlowList({ items }: { items: readonly string[] }) {
  return (
    <div className="case-modal__flow">
      {items.map((item, index) => (
        <div key={item} className="case-modal__flow-step type-body-s">
          <span className="case-modal__flow-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function CaseStudyContent({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="case-modal__content">
      <div className="case-modal__hero">
        <CaseShowcase caseStudy={caseStudy} />

        <aside className="case-modal__summary">
          <div className="case-modal__meta-grid">
            <div className="case-modal__meta-card">
              <p className="case-modal__meta-label type-label-s">Role</p>
              <p className="case-modal__meta-value type-body-s">
                <BriefcaseBusiness size={15} strokeWidth={1.8} />
                <span>{caseStudy.role}</span>
              </p>
            </div>

            <div className="case-modal__meta-card">
              <p className="case-modal__meta-label type-label-s">Timeline</p>
              <p className="case-modal__meta-value type-body-s">
                <CalendarDays size={15} strokeWidth={1.8} />
                <span>{caseStudy.timeline}</span>
              </p>
            </div>
          </div>

          <p className="case-modal__context type-body-s">{caseStudy.context}</p>
        </aside>
      </div>

      <section className="case-modal__section">
        <SectionTitle>{caseStudy.ownedTitle}</SectionTitle>
        <p className="case-modal__paragraph type-body-m">{caseStudy.owned}</p>
      </section>

      <section className="case-modal__section">
        <SectionTitle>Key work</SectionTitle>
        <BulletList items={caseStudy.keyWork} />
      </section>

      {caseStudy.workflow && (
        <section className="case-modal__section">
          <SectionTitle>{caseStudy.workflowTitle}</SectionTitle>
          <FlowList items={caseStudy.workflow} />
        </section>
      )}

      {caseStudy.designSystemWork && (
        <section className="case-modal__section">
          <SectionTitle>Design system work</SectionTitle>
          <BulletList items={caseStudy.designSystemWork} />
        </section>
      )}

      <section className="case-modal__section">
        <SectionTitle>Technical highlights</SectionTitle>
        <ChipList items={caseStudy.technicalHighlights} />
      </section>

      {caseStudy.proof && (
        <section className="case-modal__section">
          <SectionTitle>Proof</SectionTitle>
          <div className="case-modal__proof-card">
            <BulletList items={caseStudy.proof} />
          </div>
        </section>
      )}

      {caseStudy.businessProof && (
        <section className="case-modal__section">
          <SectionTitle>Business proof</SectionTitle>
          <div className="case-modal__proof-card">
            <p className="type-body-m">{caseStudy.businessProof}</p>
          </div>
        </section>
      )}

      {caseStudy.currentState && (
        <section className="case-modal__section">
          <SectionTitle>Current state</SectionTitle>
          <ChipList items={caseStudy.currentState} />
        </section>
      )}
    </div>
  );
}

export function CaseStudyModal() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedSlug, setSelectedSlug] = useState<CaseStudySlug | null>(null);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const detail = (event as CustomEvent<{ slug?: CaseStudySlug }>).detail;
      if (!detail?.slug) return;
      setSelectedSlug(detail.slug);
    };

    window.addEventListener(
      "portfolio:open-case-study",
      handleOpen as EventListener
    );

    return () => {
      window.removeEventListener(
        "portfolio:open-case-study",
        handleOpen as EventListener
      );
    };
  }, []);

  const selectedCaseStudy = selectedSlug
    ? getCaseStudyBySlug(selectedSlug)
    : null;

  return (
    <Dialog.Root
      open={Boolean(selectedCaseStudy)}
      onOpenChange={(open) => {
        if (!open) setSelectedSlug(null);
      }}
    >
      <AnimatePresence>
        {selectedCaseStudy && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="case-modal__overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="case-modal"
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 24,
                  scale: shouldReduceMotion ? 1 : 0.98,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 16,
                  scale: shouldReduceMotion ? 1 : 0.98,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.45,
                  ease: easeOutExpo,
                }}
              >
                <div className="case-modal__scroll">
                  <header className="case-modal__topbar">
                    <div className="case-modal__topbar-content">
                      <div className="case-modal__topbar-logo-wrapper">
                        <Image
                          src={companyLogos[selectedCaseStudy.slug as CaseStudySlug]}
                          alt={`${selectedCaseStudy.projectName} logo`}
                          width={80}
                          height={80}
                          className="case-modal__topbar-logo"
                        />
                      </div>

                      <div className="case-modal__topbar-column">
                        <p className="case-modal__eyebrow type-label-s">
                          {selectedCaseStudy.eyebrow}
                        </p>
                        <h2 className="case-modal__top-title type-title-m">
                          {selectedCaseStudy.title}
                        </h2>
                      </div>
                    </div>

                    <Dialog.Close
                      className="case-modal__close"
                      aria-label="Close case study"
                    >
                      <X size={18} />
                    </Dialog.Close>
                  </header>

                  <CaseStudyContent caseStudy={selectedCaseStudy} />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
