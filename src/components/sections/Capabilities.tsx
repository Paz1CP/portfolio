"use client";

import Image from "next/image";
import {
  Bot,
  Database,
  Palette,
  Rocket,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  capabilitiesContent,
  type CapabilityItem,
} from "@/content/site";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const capabilityIcons: Record<CapabilityItem["title"], LucideIcon> = {
  "Mobile Product Development": Smartphone,
  "UX/UI Systems": Palette,
  "Supabase Backends": Database,
  "AI Product Workflows": Bot,
  "Production Delivery": Rocket,
};

function CapabilityCard({
  item,
  index,
  shouldReduceMotion,
}: {
  item: CapabilityItem;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const Icon = capabilityIcons[item.title];

  return (
    <motion.article
      className="capability-card"
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
        delay: shouldReduceMotion ? 0 : index * 0.07,
      }}
    >
      <span className="capability-card__corner capability-card__corner--tl" />
      <span className="capability-card__corner capability-card__corner--br" />
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

        <div className="capability-card__proof" aria-label={`${item.title} proof visual`}>
          <Image
            src={item.proofImage}
            alt={item.proofAlt}
            fill
            sizes="(max-width: 720px) 100vw, (max-width: 1120px) 50vw, 33vw"
            className="capability-card__proof-image"
          />

          <span className="capability-card__proof-glow" aria-hidden="true" />
         
        </div>
      </div>

      <div
        className="capability-card__keywords"
        aria-label={`${item.title} keywords`}
      >
        {item.keywords.map((keyword) => (
          <span key={keyword} className="capability-card__keyword">
            {keyword}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export function Capabilities() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-18% 0px",
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
          <p className="type-eyebrow">{capabilitiesContent.eyebrow}</p>

          <h2
            id="capabilities-title"
            className="capabilities__title type-section-title"
          >
            {capabilitiesContent.headline}
          </h2>

          <p className="capabilities__intro type-body-l">
            {capabilitiesContent.intro}
          </p>
        </motion.div>

        <div className="capabilities__grid">
          {capabilitiesContent.items.map((item, index) => (
            <CapabilityCard
              key={item.title}
              item={item}
              index={index}
              shouldReduceMotion={Boolean(shouldReduceMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}