"use client";

import { ArrowUp, ExternalLink, FileDown, Mail } from "lucide-react";
import Image from "next/image";
import type { Dictionary } from "@/app/i18n";

type FooterContent = Dictionary["footerContent"];
type FooterLink = FooterContent["links"][number];

function getFooterIcon(link: FooterLink) {
  if (link.href.startsWith("mailto:")) return Mail;
  if (link.href.includes("linkedin.com")) return null;
  if (link.href.endsWith(".pdf")) return FileDown;
  return ExternalLink;
}

export function Footer({ content }: { content: FooterContent }) {
  return (
    <>
      <footer className="footer">
        <div className="site-shell-wide">
          <div className="footer__layout">
            <div className="footer__identity">
              <h2 className="footer__name type-title-m">
                {content.name}
              </h2>

              <p className="footer__role type-body-s">
                {content.role}
              </p>

            </div>

            <div className="footer__sidebar">
              <img
                src="/images/signature.png"
                alt="Signature"
                className="footer__signature"
              />

              <nav className="footer__links" aria-label="Footer links">
                {content.links.map((link) => {
                  const Icon = getFooterIcon(link);
                  const isLinkedIn = link.href.includes("linkedin.com");

                  return (
                    <a
                      key={link.label}
                      className="footer__link"
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                    >
                      {isLinkedIn ? (
                        <img
                          src="/linkedln-icon.svg"
                          alt="LinkedIn"
                          width={15}
                          height={15}
                        />
                      ) : (
                        Icon && <Icon size={15} strokeWidth={2.1} />
                      )}
                      {link.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>

        
        </div>
      </footer>
      <a className="footer__back-to-top" href="#hero" aria-label="Back to top">
        <ArrowUp size={16} strokeWidth={2.2} />
      </a>
    </>
  );
}