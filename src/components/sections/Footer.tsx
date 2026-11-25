"use client";

import { ArrowUp, ExternalLink, FileDown, Mail } from "lucide-react";
import Image from "next/image";
import type { Dictionary } from "@/app/i18n";

type FooterContent = Dictionary["footerContent"];
type SiteConfig = Dictionary["siteConfig"];

export function Footer({ content, siteConfig }: { content: FooterContent; siteConfig: SiteConfig }) {
  const links = [
    { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail, external: false },
    { label: "LinkedIn", href: siteConfig.linkedInUrl, icon: null, external: true },
    { label: "GitHub", href: siteConfig.githubUrl, icon: ExternalLink, external: true },
    { label: content.resumeLabel, href: siteConfig.resumeUrl, icon: FileDown, external: true },
  ];

  return (
    <>
      <footer className="footer">
        <div className="site-shell-wide">
          <div className="footer__layout">
            <div className="footer__identity">
              <Image
                src="/images/signature.png"
                alt=""
                width={144}
                height={144}
                className="footer__signature"
              />

              <h2 className="footer__name type-title-m">
                {siteConfig.name}
              </h2>

              <p className="footer__role type-body-s">
                {siteConfig.role}
              </p>
            </div>

            <div className="footer__sidebar">
              <nav className="footer__links" aria-label={content.linksLabel}>
                {links.map(({ label, href, icon: Icon, external }) => (
                  <a
                    key={label}
                    className="footer__link"
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                  >
                    {Icon ? (
                      <Icon size={15} strokeWidth={2.1} aria-hidden="true" />
                    ) : (
                      <Image src="/linkedln-icon.svg" alt="" width={15} height={15} />
                    )}
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </footer>
      <a data-scroll-top className="footer__back-to-top" href="#hero" aria-label={content.backToTop}>
        <ArrowUp size={16} strokeWidth={2.2} />
      </a>
    </>
  );
}
