"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState, type ReactNode } from "react";

type ImageLightboxProps = {
  src: string;
  alt: string;
  children: ReactNode;
  closeLabel: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ImageLightbox({
  src,
  alt,
  children,
  closeLabel,
  open,
  onOpenChange,
}: ImageLightboxProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = open ?? uncontrolledOpen;

  function handleOpenChange(nextOpen: boolean) {
    if (open === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="case-modal__lightbox-overlay" />
        <Dialog.Content className="case-modal__lightbox" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          {/* Preserve the original image at full size in the lightbox. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
          <Dialog.Close className="case-modal__lightbox-close focus-ring" aria-label={closeLabel}>
            <X size={22} aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
