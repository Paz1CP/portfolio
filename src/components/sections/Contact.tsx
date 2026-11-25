"use client";

import { FileDown, Mail } from "lucide-react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Dictionary } from "@/app/i18n";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type ContactContent = Dictionary["contactContent"];
type SiteConfig = Dictionary["siteConfig"];

export function Contact({
  content,
  siteConfig,
}: {
  content: ContactContent;
  siteConfig: SiteConfig;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px 120px 0px",
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact__grid" aria-hidden="true" />

      <div className="site-shell-wide contact__shell">
        <motion.div
          className="contact-card"
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 28,
            scale: shouldReduceMotion ? 1 : 0.985,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
              : undefined
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.32,
            ease: easeOutExpo,
          }}
        >
          <span className="contact-card__corner contact-card__corner--tl" />
          <span className="contact-card__corner contact-card__corner--br" />

          <div className="contact-card__inner">
            <motion.p
              className="contact-card__availability type-label-s"
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 12,
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
                delay: shouldReduceMotion ? 0 : 0.08,
              }}
            >
              {content.eyebrow}
            </motion.p>

            <motion.h2
              id="contact-title"
              className="contact-card__title type-section-title"
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
                delay: shouldReduceMotion ? 0 : 0.14,
              }}
            >
              {content.headline}
            </motion.h2>

            <motion.p
              className="contact-card__body type-body-l"
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
                delay: shouldReduceMotion ? 0 : 0.2,
              }}
            >
              {content.body}
            </motion.p>

            <motion.div
              className="contact-card__actions"
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
                delay: shouldReduceMotion ? 0 : 0.26,
              }}
            >
              <a
                className="btn btn-primary focus-ring"
                href={`mailto:${siteConfig.email}`}
              >
                <Mail size={19} strokeWidth={2.2} />
                {content.primaryCta}
              </a>

              <a
                className="btn btn-secondary focus-ring"
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FileDown size={19} strokeWidth={2.2} />
                {content.secondaryCta}
              </a>

              <a
                className="btn btn-secondary focus-ring"
                href={siteConfig.linkedInUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/linkedln-icon.svg"
                  alt=""
                  width={19}
                  height={19}
                />
                {content.tertiaryCta}
              </a>

              <a className="btn btn-secondary focus-ring" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
                <Image src="/github-outline.svg" alt="" width={19} height={19} />
                {content.githubCta}
              </a>
            </motion.div>

            <motion.div
              className="contact-card__looking"
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
                delay: shouldReduceMotion ? 0 : 0.34,
              }}
            >
              <p className="contact-card__looking-title type-label-s">
                {content.lookingForTitle}
              </p>

              <div className="contact-card__chips">
                {content.lookingFor.map((item) => (
                  <span key={item} className="contact-card__chip">
                    {item}
                  </span>
                ))}
              </div>
              <p className="contact-card__availability-note type-body-s">{content.availabilityNote}</p>
            </motion.div>

            <motion.p
              className="contact-card__email type-body-s"
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 12,
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
                delay: shouldReduceMotion ? 0 : 0.42,
              }}
            >
              <a href={`mailto:${siteConfig.email}`}>
                {content.contactLine}
              </a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
