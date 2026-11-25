"use client";

import Image from "next/image";
import {
  Bot,
  Cloud,
  Layers,
  Palette,
  Rocket,
  Server,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Dictionary } from "@/app/i18n";
import { ImageLightbox } from "./ImageLightbox";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type CapabilitiesContent = Dictionary["capabilitiesContent"];
type CapabilityItem = CapabilitiesContent["items"][number];
type LightboxLabels = Pick<Dictionary["caseStudySectionTitles"], "expand" | "closeImage">;

const capabilityIcons: Record<string, LucideIcon> = {
  "01": Server,
  "02": Bot,
  "03": Cloud,
  "04": Wallet,
  "05": Layers,
  "06": Palette,
  "07": Rocket,
};

function CapabilityCard({
  item,
  index,
  shouldReduceMotion,
  lightboxLabels,
}: {
  item: CapabilityItem;
  index: number;
  shouldReduceMotion: boolean;
  lightboxLabels: LightboxLabels;
}) {
  const Icon = capabilityIcons[item.index];

  return (
    <ImageLightbox
      src={item.proofImage}
      alt={item.proofAlt}
      closeLabel={lightboxLabels.closeImage}
    >
      <motion.article
        className="capability-card capability-card--expandable"
        role="button"
        tabIndex={0}
        aria-label={`${item.title}: ${lightboxLabels.expand}`}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.currentTarget.click();
          }
        }}
        initial={{
          opacity: 0,
          y: shouldReduceMotion ? 0 : 24,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "0px 0px 120px 0px",
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.32,
          ease: easeOutExpo,
          delay: shouldReduceMotion ? 0 : index * 0.035,
        }}
      >
        <span className="capability-card__ornament" aria-hidden="true" />

        <div className="capability-card__top">
          <div className="capability-card__icon" aria-hidden="true">
            <Icon size={25} strokeWidth={1.85} />
          </div>

          <p className="capability-card__index type-label-s">{item.index}</p>
        </div>

        <div className="capability-card__content">
          <h3 className="capability-card__title type-title-m">{item.title}</h3>

          <p className="capability-card__description type-body-s">
            {item.description}
          </p>

          <div className="capability-card__proof">
            <Image
              src={item.proofImage}
              alt={item.proofAlt}
              fill
              sizes={index >= 3 ? "(max-width: 720px) 90vw, 45vw" : "(max-width: 720px) 90vw, (max-width: 1120px) 45vw, 30vw"}
              className="capability-card__proof-image"
            />
          </div>
        </div>

        <div className="capability-card__keywords">
          {item.keywords.map((keyword) => (
            <span key={keyword} className="capability-card__keyword">
              {keyword}
            </span>
          ))}
        </div>
      </motion.article>
    </ImageLightbox>
  );
}

export function Capabilities({
  content,
  lightboxLabels,
}: {
  content: CapabilitiesContent;
  lightboxLabels: LightboxLabels;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px 120px 0px",
  });

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="site-shell-wide">
        <motion.div
          className="capabilities__header"
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 18,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : undefined
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.32,
            ease: easeOutExpo,
          }}
        >
          <p className="type-eyebrow">{content.eyebrow}</p>

          <h2
            id="capabilities-title"
            className="capabilities__title type-section-title"
          >
            {content.headline}
          </h2>

          <p className="capabilities__intro type-body-l">
            {content.intro}
          </p>
        </motion.div>

        <div className="capabilities__grid">
          {content.items.map((item, index) => (
            <CapabilityCard
              key={item.index}
              item={item}
              index={index}
              shouldReduceMotion={Boolean(shouldReduceMotion)}
              lightboxLabels={lightboxLabels}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
