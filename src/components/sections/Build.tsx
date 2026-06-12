"use client";

import Image from "next/image";
import { DocumentDownload, Sms } from "iconsax-reactjs";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Dictionary } from "@/app/i18n";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type BuildContent = Dictionary["buildContent"];
type BuildCard = BuildContent["cards"][number];

function BuildPricingCard({
  card,
  index,
  isFeatured,
  whatsappUrl,
  shouldReduceMotion,
}: {
  card: BuildCard;
  index: number;
  isFeatured: boolean;
  whatsappUrl: string;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.article
      className={`build-card${isFeatured ? " build-card--featured" : ""}`}
      role="link"
      tabIndex={0}
      aria-label={`${card.title} — ${card.price}`}
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 30,
        filter: shouldReduceMotion ? "blur(0px)" : "blur(12px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        margin: "-10% 0px",
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: easeOutExpo,
        delay: shouldReduceMotion ? 0 : index * 0.1,
      }}
      onClick={() => {
        window.open(whatsappUrl, "_blank", "noreferrer");
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.open(whatsappUrl, "_blank", "noreferrer");
        }
      }}
    >
      <span className="build-card__corner build-card__corner--tl" />
      <span className="build-card__corner build-card__corner--br" />

      <div className="build-card__content">
        <h3 className="build-card__title type-title-l">{card.title}</h3>

        <p className="build-card__starting">{card.startingLabel}</p>
        <p className="build-card__price">{card.price}</p>

        <div className="build-card__timeline">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="build-card__timeline-icon"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 15.5 14" />
          </svg>
          {card.timeline}
        </div>

        <div className="build-card__body">
          <ul className="build-card__features">
            {card.features.map((feature) => (
              <li key={feature} className="build-card__feature type-body-s">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="build-card__feature-icon"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="var(--leather-gold)"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <path
                    d="M8.5 12.5L11 15L15.5 9.5"
                    stroke="var(--leather-gold)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="build-card__asset">
            <Image
              src={card.asset}
              alt={card.title}
              fill
              sizes="(max-width: 720px) 90vw, (max-width: 1180px) 45vw, 22vw"
              className="build-card__asset-image"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Build({
  content,
}: {
  content: BuildContent;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-16% 0px",
  });

  return (
    <section
      id="build"
      ref={sectionRef}
      className="build"
      aria-labelledby="build-title"
    >
      <div className="build__container">
        <motion.div
          className="build__header"
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 22,
            filter: shouldReduceMotion ? "blur(0px)" : "blur(10px)",
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
            duration: shouldReduceMotion ? 0 : 0.76,
            ease: easeOutExpo,
          }}
        >
          <p className="build__eyebrow">{content.eyebrow}</p>

          <h2
            id="build-title"
            className="build__title type-section-title"
          >
            {content.headline}
          </h2>

          <p className="build__subtitle type-body-l">
            {content.subtitle}
          </p>

          <div className="build__actions">
            <a
              className="build__action-btn"
              href={content.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${content.whatsappLabel} — contact Christopher`}
            >
              <Image
                src="/whatsapp.png"
                alt=""
                width={23}
                height={23}
                className="build__whatsapp-icon"
              />
              {content.whatsappLabel}
            </a>

            <a
              className="build__action-btn"
              href={`mailto:${content.emailAddress}`}
              aria-label={`${content.emailLabel} — contact Christopher`}
            >
              <Sms size={21} color="currentColor" variant="TwoTone" />
              {content.emailLabel}
            </a>

            <a
              className="build__action-btn"
              href={content.pdfUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={content.pdfLabel}
            >
              <DocumentDownload size={21} color="currentColor" variant="TwoTone" />
              {content.pdfLabel}
            </a>
          </div>
        </motion.div>

        <div className="build__grid">
          {content.cards.map((card, index) => (
            <BuildPricingCard
              key={card.title}
              card={card}
              index={index}
              isFeatured={index === 1}
              whatsappUrl={content.whatsappUrl}
              shouldReduceMotion={Boolean(shouldReduceMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
