"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, BriefcaseBusiness, CalendarDays, Maximize2, Pause, Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Dictionary, ExperienceDetail } from "@/app/i18n";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
type SectionTitles = Dictionary["caseStudySectionTitles"];

function GalleryCarousel({
  images,
  labels,
}: {
  images: ExperienceDetail["images"];
  labels: SectionTitles;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const count = images.length;

  useEffect(() => {
    if (count < 2 || isHover || isPaused || isExpanded || shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [count, isHover, isPaused, isExpanded, shouldReduceMotion]);

  const currentImage = images[index];
  if (!currentImage) return null;

  function step(direction: number) {
    setIsPaused(true);
    setIndex((current) => (current + direction + count) % count);
  }

  const RotationIcon = isPaused ? Play : Pause;
  return (
    <figure className="case-modal__gallery" aria-label={labels.gallery}>
      <div className="case-modal__showcase">
        <span className="case-modal__showcase-corner case-modal__showcase-corner--tl" />
        <span className="case-modal__showcase-corner case-modal__showcase-corner--br" />

        <div
          className="case-modal__carousel"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Dialog.Root open={isExpanded} onOpenChange={setIsExpanded}>
            <Dialog.Trigger asChild>
              <button type="button" className="case-modal__carousel-expand focus-ring" aria-label={labels.expand}>
                {images.map(({ src, alt }, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt={alt}
                    aria-hidden={i !== index}
                    fill
                    sizes="(max-width: 760px) 90vw, 560px"
                    className={i === index ? "case-modal__carousel-slide is-active" : "case-modal__carousel-slide"}
                  />
                ))}
                <span className="case-modal__carousel-expand-icon" aria-hidden="true">
                  <Maximize2 size={17} />
                </span>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="case-modal__lightbox-overlay" />
              <Dialog.Content className="case-modal__lightbox" aria-describedby={undefined}>
                <Dialog.Title className="sr-only">{currentImage.alt}</Dialog.Title>
                {/* Preserve the original screenshot at full size in the lightbox. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={currentImage.src} alt={currentImage.alt} />
                <Dialog.Close className="case-modal__lightbox-close focus-ring" aria-label={labels.closeImage}>
                  <X size={22} aria-hidden="true" />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          {count > 1 && (
            <div className="case-modal__carousel-controls">
              <button type="button" className="case-modal__carousel-arrow focus-ring" onClick={() => step(-1)} aria-label={labels.previousImage}>
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button type="button" className="case-modal__carousel-arrow focus-ring" onClick={() => step(1)} aria-label={labels.nextImage}>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      <figcaption className="case-modal__gallery-meta">
        <span className="type-body-s" aria-live={isPaused || shouldReduceMotion ? "polite" : "off"}>
          {currentImage.alt}
        </span>
        {count > 1 && !shouldReduceMotion && (
          <button
            type="button"
            className="case-modal__carousel-toggle focus-ring"
            onClick={() => setIsPaused((paused) => !paused)}
            aria-label={isPaused ? labels.resume : labels.pause}
          >
            <RotationIcon size={16} aria-hidden="true" />
          </button>
        )}
      </figcaption>
    </figure>
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="case-modal__list">
      {items.map((item) => (
        <li key={item} className="case-modal__list-item type-body-s">
          <span className="case-modal__list-bullet" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ChipList({ items }: { items: string[] }) {
  return (
    <div className="case-modal__chips">
      {items.map((item) => (
        <span key={item} className="case-modal__chip">{item}</span>
      ))}
    </div>
  );
}

function FlowList({ items }: { items: string[] }) {
  return (
    <ol className="case-modal__flow">
      {items.map((item, index) => (
        <li key={item} className="case-modal__flow-step type-body-s">
          <span className="case-modal__flow-number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function TopicGrid({ items }: { items: { title?: string; body: string }[] }) {
  return (
    <div className="case-modal__topic-grid">
      {items.map(({ title, body }) => (
        <div key={title ?? body} className="case-modal__proof-card">
          <h4 className="case-modal__topic-title type-title-s">{title}</h4>
          <p className="type-body-s">{body}</p>
        </div>
      ))}
    </div>
  );
}

function CaseStudyContent({ experience, labels }: { experience: ExperienceDetail; labels: SectionTitles }) {
  const { architecture, engineeringDecisions, evidenceLinks, designSystemWork, businessProof, currentState } = experience;

  return (
    <div className="case-modal__content">
      <div className="case-modal__hero">
        <GalleryCarousel images={experience.images} labels={labels} />

        <aside className="case-modal__summary">
          <div className="case-modal__meta-grid">
            <div className="case-modal__meta-card">
              <p className="case-modal__meta-label type-label-s">{labels.role}</p>
              <p className="case-modal__meta-value type-body-s">
                <BriefcaseBusiness size={15} strokeWidth={1.8} aria-hidden="true" />
                <span>{experience.role}</span>
              </p>
            </div>
            <div className="case-modal__meta-card">
              <p className="case-modal__meta-label type-label-s">{labels.timeline}</p>
              <p className="case-modal__meta-value type-body-s">
                <CalendarDays size={15} strokeWidth={1.8} aria-hidden="true" />
                <span>{experience.timeline}</span>
              </p>
            </div>
          </div>

          <Dialog.Description className="case-modal__context type-body-s">{experience.context}</Dialog.Description>
          {experience.purpose && <p className="case-modal__context type-body-s">{experience.purpose}</p>}
        </aside>
      </div>

      <section className="case-modal__section">
        <SectionTitle>{labels.ownership}</SectionTitle>
        <p className="case-modal__paragraph type-body-m">{experience.owned}</p>
      </section>

      {architecture && (
        <section className="case-modal__section">
          <SectionTitle>{labels.architecture}</SectionTitle>
          <p className="case-modal__paragraph type-body-m">{architecture.body}</p>
          <figure className="case-modal__architecture">
            <Image src={architecture.src} alt={architecture.alt} width={1536} height={952} sizes="(max-width: 760px) 90vw, 1020px" />
            <figcaption className="type-body-s">{architecture.caption}</figcaption>
          </figure>
        </section>
      )}

      {experience.productWorkflow && <WorkflowSection {...experience.productWorkflow} />}

      <section className="case-modal__section">
        <SectionTitle>{labels.keyWork}</SectionTitle>
        {experience.keyWork[0]?.title
          ? <TopicGrid items={experience.keyWork} />
          : <BulletList items={experience.keyWork.map(({ body }) => body)} />}
      </section>

      {experience.workflows?.map((workflow) => (
        <WorkflowSection key={workflow.title} {...workflow} />
      ))}

      {engineeringDecisions && (
        <section className="case-modal__section">
          <SectionTitle>{labels.decisions}</SectionTitle>
          <TopicGrid items={engineeringDecisions} />
        </section>
      )}

      {designSystemWork && (
        <section className="case-modal__section">
          <SectionTitle>{labels.designSystemWork}</SectionTitle>
          <BulletList items={designSystemWork} />
        </section>
      )}

      {evidenceLinks && (
        <section className="case-modal__section">
          <SectionTitle>{labels.evidence}</SectionTitle>
          <div className="case-modal__topic-grid">
            {evidenceLinks.map(({ href, label, description }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className="case-modal__proof-card case-modal__evidence-link focus-ring">
                <h4 className="case-modal__topic-title type-title-s">{label} <ArrowUpRight size={16} aria-hidden="true" /></h4>
                <p className="type-body-s">{description}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {businessProof && (
        <section className="case-modal__section">
          <SectionTitle>{labels.results}</SectionTitle>
          <div className="case-modal__proof-card">
            <p className="type-body-m">{businessProof}</p>
          </div>
        </section>
      )}

      {currentState && (
        <section className="case-modal__section">
          <SectionTitle>{labels.currentState}</SectionTitle>
          <BulletList items={currentState} />
        </section>
      )}

      <section className="case-modal__section">
        <SectionTitle>{labels.technicalHighlights}</SectionTitle>
        <ChipList items={experience.technicalHighlights} />
      </section>
    </div>
  );
}

function WorkflowSection({ title, steps, description }: { title: string; steps: string[]; description?: string }) {
  return (
    <section className="case-modal__section">
      <SectionTitle>{title}</SectionTitle>
      <FlowList items={steps} />
      {description && <p className="case-modal__paragraph type-body-m">{description}</p>}
    </section>
  );
}

export function CaseStudyModal({
  experience,
  logo,
  sectionTitles,
  onClose,
}: {
  experience?: ExperienceDetail;
  logo?: string;
  sectionTitles: SectionTitles;
  onClose: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const returnFocus = useRef<HTMLElement | null>(null);

  return (
    <Dialog.Root open={Boolean(experience)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <AnimatePresence>
        {experience && (
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
            <Dialog.Content
              asChild
              onOpenAutoFocus={() => {
                returnFocus.current = document.activeElement?.id === "experience-" + experience.slug + "-trigger"
                  ? document.getElementById("experience-" + experience.slug + "-trigger")
                  : null;
              }}
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                const heading = document.getElementById("experience-title");
                (returnFocus.current ?? heading)?.focus({ preventScroll: true });
                if (!returnFocus.current && window.location.hash === "#experience") {
                  document.getElementById("experience")?.scrollIntoView({ block: "start" });
                }
              }}
            >
              <motion.div
                className="case-modal"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24, scale: shouldReduceMotion ? 1 : 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.98 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: easeOutExpo }}
              >
                <div className="case-modal__scroll" key={experience.slug}>
                  <header className="case-modal__topbar">
                    <div className="case-modal__topbar-content">
                      {logo && (
                        <div className="case-modal__topbar-logo-wrapper">
                          <Image src={logo} alt={experience.projectName} width={80} height={80} className="case-modal__topbar-logo" />
                        </div>
                      )}

                      <div className="case-modal__topbar-column">
                        <p className="case-modal__eyebrow type-label-s">{experience.eyebrow}</p>
                        <Dialog.Title className="case-modal__top-title type-title-m">{experience.title}</Dialog.Title>
                      </div>
                    </div>

                    <Dialog.Close className="case-modal__close" aria-label={sectionTitles.closeExperience}>
                      <X size={18} aria-hidden="true" />
                    </Dialog.Close>
                  </header>

                  <CaseStudyContent experience={experience} labels={sectionTitles} />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
