"use client";

import { ArrowUp, ExternalLink, FileDown, Mail } from "lucide-react";
import Image from "next/image";
import { footerContent } from "@/content/site";

function getFooterIcon(label: string) {
  switch (label) {
    case "Email":
      return Mail;
    case "LinkedIn":
      return null;
    case "Resume":
      return FileDown;
    default:
      return ExternalLink;
  }
}

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="site-shell-wide">
          <div className="footer__layout">
            <div className="footer__identity">
              <h2 className="footer__name type-title-m">
                {footerContent.name}
              </h2>

              <p className="footer__role type-body-s">
                {footerContent.role}
              </p>

            </div>

            <div className="footer__sidebar">
              <img
                src="/images/signature.png"
                alt="Signature"
                className="footer__signature"
              />

              <nav className="footer__links" aria-label="Footer links">
                {footerContent.links.map((link) => {
                  const Icon = getFooterIcon(link.label);

                  return (
                    <a
                      key={link.label}
                      className="footer__link"
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                    >
                      {link.label === "LinkedIn" ? (
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