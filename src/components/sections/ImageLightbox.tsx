"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { getImageProps } from "next/image";
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
  const imageProps = isOpen ? getImageProps({ src, alt, fill: true, sizes: "95vw", quality: 85, loading: "eager", decoding: "async", fetchPriority: "high" }).props : null;

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
          {/* Use a viewport-sized optimized source, retaining the intrinsic aspect ratio. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {imageProps && <img {...imageProps} style={undefined} />}
          <Dialog.Close className="case-modal__lightbox-close focus-ring" aria-label={closeLabel}>
            <X size={22} aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
