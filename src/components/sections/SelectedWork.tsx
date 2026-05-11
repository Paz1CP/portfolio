"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  selectedWorkContent,
  type SelectedProject,
} from "@/content/site";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const projectThumbnailImages = {
  "4track-vistogps-pro": "/images/experience/4track_mobile_store_map.webp",
  jobmatch: "/images/experience/jm_product_proof.webp",
  cookpilot: "/images/experience/cookpilot_product_proof.webp",
} as const;

const projectLogos = {
  "4track-vistogps-pro": "/images/experience/4TRACK/4track-logo.webp",
  jobmatch: "/images/experience/JM/jobmatch_orange.jpg",
  cookpilot: "/images/experience/CookPilot/cookpilot_logo.png",
} as const;

function ProjectAsset({ project }: { project: SelectedProject }) {
  return (
    <div
      className={[
        "selected-work-card__asset",
        `selected-work-card__asset--${project.assetVariant}`,
      ].join(" ")}
    >
      <div className="selected-work-card__asset-grid" />
   

      <Image
        src={projectThumbnailImages[project.slug]}
        alt={project.title}
        fill
        sizes="(max-width: 720px) 100vw, (max-width: 1180px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
        className="selected-work-card__asset-image"
      />
    </div>
  );
}

function ProjectCard({
  project,
  index,
  shouldReduceMotion,
}: {
  project: SelectedProject;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const handleOpenCaseStudy = () => {
    window.dispatchEvent(
      new CustomEvent("portfolio:open-case-study", {
        detail: {
          slug: project.slug,
        },
      })
    );
  };

  const handleCardPointerDown = (
    event: React.PointerEvent<HTMLElement>
  ) => {
    if (event.button !== 0) return;
    handleOpenCaseStudy();
  };

  const handleCardKeyDown = (
    event: React.KeyboardEvent<HTMLElement>
  ) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleOpenCaseStudy();
  };

  return (
    <motion.article
      className="selected-work-card"
      role="button"
      tabIndex={0}
      aria-label={`${project.cta}: ${project.title}`}
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 26,
        filter: shouldReduceMotion ? "blur(0px)" : "blur(10px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        margin: "-12% 0px",
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.72,
        ease: easeOutExpo,
        delay: shouldReduceMotion ? 0 : index * 0.08,
      }}
      onPointerDown={handleCardPointerDown}
      onKeyDown={handleCardKeyDown}
    >
      <span className="selected-work-card__corner selected-work-card__corner--tl" />
      <span className="selected-work-card__corner selected-work-card__corner--br" />

      <ProjectAsset project={project} />

      <div className="selected-work-card__body">
        <div className="selected-work-card__content-row">
          <div className="selected-work-card__text-column">
            <div className="selected-work-card__title-row">  <div className="selected-work-card__title-logo-wrapper">
                <Image
                  src={projectLogos[project.slug]}
                  alt={`${project.title} logo`}
                  width={120}
                  height={120}
                  className="selected-work-card__title-logo"
                />
              </div>
              <h3 className="selected-work-card__title type-title-m">
                {project.title}
              </h3>
            
            </div>

            <p className="selected-work-card__description type-body-s">
              {project.description}
            </p>
          </div>
        </div>

        <p className="selected-work-card__proof type-body-xs">
          {project.proof}
        </p>

        <div className="selected-work-card__footer">
          <button
            type="button"
            className="selected-work-card__cta"
            aria-label={`${project.cta}: ${project.title}`}
            data-case-study={project.slug}
            onClick={handleOpenCaseStudy}
            onPointerDown={(event) => event.stopPropagation()}
          >
            {project.cta}
            <ArrowRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-18% 0px",
  });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="selected-work"
      aria-labelledby="selected-work-title"
    >
      <div className="site-shell-wide">
        <div className="selected-work__header">
          <motion.div
            className="selected-work__copy"
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 18,
              filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }
                : undefined
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.72,
              ease: easeOutExpo,
            }}
          >
            <p className="type-eyebrow">{selectedWorkContent.eyebrow}</p>

            <h2
              id="selected-work-title"
              className="selected-work__title type-section-title"
            >
              {selectedWorkContent.headline}
            </h2>

            <p className="selected-work__intro type-body-l">
              {selectedWorkContent.intro}
            </p>
          </motion.div>

        </div>

        <div className="selected-work__grid">
          {selectedWorkContent.projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              shouldReduceMotion={Boolean(shouldReduceMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
