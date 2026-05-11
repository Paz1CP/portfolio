"use client";

import { ArrowRight, FileDown, Mail } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { contactContent, siteConfig } from "@/content/site";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-18% 0px",
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
            filter: shouldReduceMotion ? "blur(0px)" : "blur(12px)",
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }
              : undefined
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.82,
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
                duration: shouldReduceMotion ? 0 : 0.58,
                ease: easeOutExpo,
                delay: shouldReduceMotion ? 0 : 0.08,
              }}
            >
              {contactContent.eyebrow}
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
                duration: shouldReduceMotion ? 0 : 0.68,
                ease: easeOutExpo,
                delay: shouldReduceMotion ? 0 : 0.14,
              }}
            >
              {contactContent.headline}
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
                duration: shouldReduceMotion ? 0 : 0.68,
                ease: easeOutExpo,
                delay: shouldReduceMotion ? 0 : 0.2,
              }}
            >
              {contactContent.body}
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
                duration: shouldReduceMotion ? 0 : 0.68,
                ease: easeOutExpo,
                delay: shouldReduceMotion ? 0 : 0.26,
              }}
            >
              <a
                className="btn btn-primary focus-ring"
                href={`mailto:${siteConfig.email}`}
                aria-label="Email Christopher Paz León"
              >
                <Mail size={19} strokeWidth={2.2} />
                {contactContent.primaryCta}
              </a>

              <a
                className="btn btn-secondary focus-ring"
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="View Christopher Paz León resume"
              >
                <FileDown size={19} strokeWidth={2.2} />
                {contactContent.secondaryCta}
              </a>

              <a
                className="contact-card__link-button"
                href={siteConfig.linkedInUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Connect with Christopher Paz León on LinkedIn"
              >
                <img
                  src="/linkedln-icon.svg"
                  alt="LinkedIn"
                  aria-hidden="true"
                  width={19}
                  height={19}
                />
                {contactContent.tertiaryCta}
                <ArrowRight size={17} strokeWidth={2.2} />
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
                duration: shouldReduceMotion ? 0 : 0.68,
                ease: easeOutExpo,
                delay: shouldReduceMotion ? 0 : 0.34,
              }}
            >
              <p className="contact-card__looking-title type-label-s">
                {contactContent.lookingForTitle}
              </p>

              <div className="contact-card__chips">
                {contactContent.lookingFor.map((item) => (
                  <span key={item} className="contact-card__chip">
                    {item}
                  </span>
                ))}
              </div>
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
                duration: shouldReduceMotion ? 0 : 0.58,
                ease: easeOutExpo,
                delay: shouldReduceMotion ? 0 : 0.42,
              }}
            >
              Direct line:{" "}
              <a href={`mailto:${siteConfig.email}`}>
                {contactContent.contactLine}
              </a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}