"use client";

import Image from "next/image";
import { DocumentDownload, Send2 } from "iconsax-reactjs";
import { motion, useReducedMotion } from "framer-motion";
import type { Dictionary } from "@/app/i18n";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type HeroContent = Dictionary["heroContent"];
type SiteConfig = Dictionary["siteConfig"];

export function Hero({
  content,
  siteConfig,
}: {
  content: HeroContent;
  siteConfig: SiteConfig;
}) {
  const shouldReduceMotion = useReducedMotion();

  const splitToken = " and ship ";
  const hasAccent = content.headline.includes(splitToken);
  const [headlineLead, headlineTail] = hasAccent
    ? content.headline.split(splitToken)
    : [content.headline, ""];

  const containerTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 0.8,
        ease: easeOutExpo,
        staggerChildren: 0.08,
        delayChildren: 0.08,
      };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  };

  return (
    <section
      id="hero"
      className="portfolio-hero"
      aria-labelledby="portfolio-hero-title"
    >
      <div className="portfolio-hero__ambient" aria-hidden="true" />
      <div className="portfolio-hero__grid" aria-hidden="true" />
      <div className="portfolio-hero__light" aria-hidden="true" />

      <div className="site-shell-wide portfolio-hero__layout">
        <motion.div
          className="portfolio-hero__content"
          initial="hidden"
          animate="visible"
          transition={containerTransition}
        >
          <motion.p
            className="portfolio-hero__availability type-label-s"
            variants={itemVariants}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            {content.availability}
          </motion.p>

          <motion.p
            className="portfolio-hero__eyebrow type-label-m"
            variants={itemVariants}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            {content.eyebrow}
          </motion.p>

          <motion.h1
            id="portfolio-hero-title"
            className="portfolio-hero__title type-display-hero"
            variants={itemVariants}
            transition={{ duration: 0.78, ease: easeOutExpo }}
          >
            {hasAccent ? (
              <>
                <span className="portfolio-hero__title-line">{headlineLead}</span>
                <span className="portfolio-hero__title-accent">
                  and ship {headlineTail}
                </span>
              </>
            ) : (
              <span className="portfolio-hero__title-line">{headlineLead}</span>
            )}
          </motion.h1>

          <motion.p
            className="portfolio-hero__subtitle type-body-l"
            variants={itemVariants}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            {content.subheadline}
          </motion.p>

          <motion.div
            className="portfolio-hero__actions"
            variants={itemVariants}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <a
              className="portfolio-hero__whatsapp-btn"
              href={content.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={content.whatsappAriaLabel}
            >
              <Image
                src="/whatsapp.png"
                alt=""
                width={52}
                height={52}
                className="portfolio-hero__whatsapp-icon"
              />
            </a>

            <a
              className="btn btn-primary focus-ring group portfolio-hero__contact-btn"
              href={`mailto:${siteConfig.email}`}
              aria-label={content.primaryAriaLabel}
            >
              <Send2 size={19} color="currentColor" variant="Bold" />
              {content.primaryCta}
            </a>

            <a
              className="btn btn-secondary focus-ring group portfolio-hero__resume-btn"
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={content.secondaryAriaLabel}
            >
              <DocumentDownload size={19} color="currentColor" variant="TwoTone" />
              {content.secondaryCta}
            </a>
          </motion.div>

          <motion.p
            className="portfolio-hero__proof type-label-m"
            variants={itemVariants}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            {content.microProof}
          </motion.p>
        </motion.div>

        <motion.div
          className="portfolio-hero__portrait-wrap"
          initial={{
            opacity: 0,
            x: shouldReduceMotion ? 0 : 34,
            y: shouldReduceMotion ? 0 : 10,
            rotate: shouldReduceMotion ? 0 : - 1.2,
            filter: shouldReduceMotion ? "blur(0px)" : "blur(12px)",
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.95,
            ease: easeOutExpo,
            delay: 0.22,
          }}
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  y: -8,
                  rotate: 0.6,
                  transition: {
                    duration: 0.55,
                    ease: easeOutExpo,
                  },
                }
          }
        >
          <div className="portfolio-hero__portrait">
            <Image
              src="/images/me.png"
              alt="Portrait of Christopher Paz León"
              fill
              priority
              sizes="(max-width: 1440px) 84vw, (max-width: 1180px) 24rem, 29rem"
              className="portfolio-hero__portrait-image"
            />

            <span className="portfolio-hero__portrait-corner portfolio-hero__portrait-corner--tl" />
            <span className="portfolio-hero__portrait-corner portfolio-hero__portrait-corner--br" />
          </div>

        <motion.div
  className="portfolio-hero__signature"
  initial={{
    opacity: 0,
    y: shouldReduceMotion ? 0 : 18,
  }}
  animate={{
    opacity: 0.94,
    y: 0,
  }}
  transition={{
    duration: shouldReduceMotion ? 0 : 0.9,
    ease: easeOutExpo,
    delay: 0.55,
  }}
  aria-hidden="true"
>
  <div className="portfolio-hero__signature-mark">
    <Image
      src="/images/signature.png"
      alt=""
      fill
      sizes="(max-width: 960px) 20rem, 30rem"
      className="object-contain"
    />
  </div>
</motion.div>
        </motion.div>
      </div>
    </section>
  );
}
