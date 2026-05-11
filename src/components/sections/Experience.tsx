"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import {
  experienceContent,
  type ExperienceItem as ExperienceItemType,
} from "@/content/site";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const experienceCaseStudySlugs = [
  "cookpilot",
  "jobmatch",
  "4track-vistogps-pro",
] as const;

function ExperienceTimelineItem({
  item,
  index,
  isCurrent,
  shouldReduceMotion,
}: {
  item: ExperienceItemType;
  index: number;
  isCurrent: boolean;
  shouldReduceMotion: boolean;
}) {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(itemRef, {
    once: false,
    amount: 0.52,
    margin: "-18% 0px -22% 0px",
  });

  const handleOpenCaseStudy = () => {
    const slug = experienceCaseStudySlugs[index];
    if (!slug) return;

    window.dispatchEvent(
      new CustomEvent("portfolio:open-case-study", {
        detail: { slug },
      })
    );
  };

  const handleCardPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    handleOpenCaseStudy();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    handleOpenCaseStudy();
  };

  return (
    <motion.div
      ref={itemRef}
      className="experience-item"
      data-active={isCurrent ? "true" : "false"}
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 24,
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
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: easeOutExpo,
        delay: shouldReduceMotion ? 0 : index * 0.08,
      }}
    >
      <aside className="experience-item__meta" aria-label={`${item.company} metadata`}>
        <p className="experience-item__date type-label-s">{item.date}</p>

        <div className="experience-item__role-group">
          <h3 className="experience-item__role type-title-m">{item.role}</h3>
          <p className="experience-item__company type-body-s">{item.company}</p>
        </div>
      </aside>

      <article
        className="experience-item__card"
        role="button"
        tabIndex={0}
        aria-label={`Open case study: ${item.company}`}
        onPointerDown={handleCardPointerDown}
        onKeyDown={handleCardKeyDown}
      >
        <span className="experience-item__corner experience-item__corner--tl" />
        <span className="experience-item__corner experience-item__corner--br" />

        <div className="experience-item__card-content">

          <p className="experience-item__summary type-body-m">
            {item.summary}
          </p>

          <div className="experience-item__impact">
            <p className="experience-item__impact-label type-label-s">Why it matters</p>
            <p className="experience-item__impact-text type-body-s">
              {item.impact}
            </p>
          </div>

          <ul className="experience-item__details">
            {item.details.map((detail) => (
              <li key={detail} className="experience-item__detail type-body-s">
                {detail}
              </li>
            ))}
          </ul>

          <div className="experience-item__tags" aria-label={`${item.company} tags`}>
            {item.tags.map((tag) => (
              <span key={tag} className="experience-item__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-18% 0px",
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="experience"
      aria-labelledby="experience-title"
    >
      <div className="site-shell-wide">
        <motion.div
          className="experience__header"
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
          <p className="type-eyebrow">{experienceContent.eyebrow}</p>

          <h2 id="experience-title" className="experience__title type-section-title">
            {experienceContent.headline}
          </h2>

          <p className="experience__intro type-body-l">
            {experienceContent.intro}
          </p>
        </motion.div>

        <div className="experience__timeline">
          {experienceContent.items.map((item, index) => (
            <ExperienceTimelineItem
              key={`${item.company}-${item.date}`}
              item={item}
              index={index}
              isCurrent={index === 0}
              shouldReduceMotion={Boolean(shouldReduceMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}