"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import type { Dictionary } from "@/app/i18n";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
type ExperienceContent = Dictionary["experienceContent"];
type ExperienceItemType = ExperienceContent["items"][number];

function ExperienceTimelineItem({
  item,
  index,
  shouldReduceMotion,
  cta,
  onOpen,
}: {
  item: ExperienceItemType;
  index: number;
  shouldReduceMotion: boolean;
  cta: string;
  onOpen: (slug: string) => void;
}) {
  return (
    <motion.div
      className="experience-item"
      data-active={item.slug === "mirai"}
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
      <div className="experience-item__meta">
        <p className="experience-item__date type-label-s">{item.date}</p>

        <div className="experience-item__role-group">
          <h3 className="experience-item__role type-title-m">{item.role}</h3>
          <p className="experience-item__company type-body-s">{item.company}</p>
          <p className="experience-item__context type-body-s">{item.contextLabel}</p>
        </div>
      </div>

      <article className="experience-item__card">
        <button
          id={`experience-${item.slug}-trigger`}
          type="button"
          className="experience-item__card-trigger"
          aria-label={`${cta} · ${item.company}`}
          aria-haspopup="dialog"
          onClick={() => onOpen(item.slug)}
        />
        <span className="experience-item__corner experience-item__corner--tl" />
        <span className="experience-item__corner experience-item__corner--br" />

        <div className="experience-item__card-content">
          <div className="experience-item__cover">
            <Image
              src={item.cover}
              alt={item.coverAlt}
              fill
              sizes="(max-width: 980px) 90vw, (max-width: 1470px) 62vw, 900px"
            />
          </div>

          <div className="experience-item__overview">
            <Image className="experience-item__logo" src={item.logo} alt="" width={160} height={160} sizes="208px" />
            <p className="experience-item__summary type-body-m">{item.summary}</p>
          </div>

          <ul className="experience-item__details">
            {item.details.map((detail) => (
              <li key={detail} className="experience-item__detail type-body-s">
                {detail}
              </li>
            ))}
          </ul>

          <div className="experience-item__tags">
            {item.tags.map((tag) => (
              <span key={tag} className="experience-item__tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="experience-item__actions">
            {item.links.map(({ href, label }) => (
              <a key={href} className="focus-ring experience-item__link" href={href} target="_blank" rel="noreferrer">
                {label}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export function Experience({
  content,
  onOpen,
}: {
  content: ExperienceContent;
  onOpen: (slug: string) => void;
}) {
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
          <p className="type-eyebrow">{content.eyebrow}</p>

          <h2 id="experience-title" className="experience__title type-section-title" tabIndex={-1}>
            {content.headline}
          </h2>

          <p className="experience__intro type-body-l">
            {content.intro}
          </p>
        </motion.div>

        <div className="experience__timeline">
          {content.items.map((item, index) => (
            <ExperienceTimelineItem
              key={item.slug}
              item={item}
              index={index}
              shouldReduceMotion={Boolean(shouldReduceMotion)}
              cta={content.cta}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
