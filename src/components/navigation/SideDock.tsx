"use client";

import {
  Briefcase,
  Cpu,
  Home2,
  MedalStar,
  Send2,
} from "iconsax-reactjs";
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  ComponentType,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { navigationItems, type NavigationItem } from "@/content/site";

type IconsaxVariant =
  | "Linear"
  | "Outline"
  | "TwoTone"
  | "Bulk"
  | "Broken"
  | "Bold";

type IconsaxIcon = ComponentType<{
  size?: number | string;
  color?: string;
  variant?: IconsaxVariant;
}>;

const navigationIcons: Record<NavigationItem["id"], IconsaxIcon> = {
  hero: Home2,
  work: Briefcase,
  experience: MedalStar,
  capabilities: Cpu,
  contact: Send2,
};

function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const bestMatch = visibleEntries[0]?.target.id;

        if (bestMatch) {
          setActiveSection(bestMatch);
        }
      },
      {
        root: null,
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0.12, 0.24, 0.36, 0.48, 0.6],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}

function useDockMagnification(
  ref: React.RefObject<HTMLElement | null>,
  mouseY: MotionValue<number>,
  config = {
    distance: 116,
    scale: 0.26,
    x: 5,
    icon: 6,
  }
) {
  const scale = useTransform(mouseY, (latest) => {
    const bounds = ref.current?.getBoundingClientRect();

    if (!bounds) return 1;

    const centerY = bounds.top + bounds.height / 2;
    const distance = Math.abs(latest - centerY);
    const influence = Math.max(0, 1 - distance / config.distance);

    return 1 + influence * config.scale;
  });

  const translateX = useTransform(mouseY, (latest) => {
    const bounds = ref.current?.getBoundingClientRect();

    if (!bounds) return 0;

    const centerY = bounds.top + bounds.height / 2;
    const distance = Math.abs(latest - centerY);
    const influence = Math.max(0, 1 - distance / config.distance);

    return influence * config.x;
  });

  const iconSize = useTransform(mouseY, (latest) => {
    const bounds = ref.current?.getBoundingClientRect();

    if (!bounds) return 24;

    const centerY = bounds.top + bounds.height / 2;
    const distance = Math.abs(latest - centerY);
    const influence = Math.max(0, 1 - distance / config.distance);

    return 24 + influence * config.icon;
  });

  return {
    scale,
    translateX,
    iconSize,
  };
}

function DockIconButton({
  item,
  active,
  mouseY,
}: {
  item: NavigationItem;
  active: boolean;
  mouseY: MotionValue<number>;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const Icon = navigationIcons[item.id];

  const { scale, translateX, iconSize } = useDockMagnification(ref, mouseY);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const target = document.getElementById(item.id);

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.a
      ref={ref}
      href={`#${item.id}`}
      className="side-dock__item"
      data-active={active ? "true" : "false"}
      aria-label={item.ariaLabel}
      aria-current={active ? "page" : undefined}
      onClick={handleClick}
      style={{
        scale,
        x: translateX,
      }}
      whileTap={{
        scale: 0.94,
      }}
      transition={{
        duration: 0.24,
        ease: [0.16, 1, 0.3, 1],
      }}
    >

      <motion.span className="side-dock__icon">
        <motion.span
          aria-hidden="true"
          style={{
            width: iconSize,
            height: iconSize,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Icon
            size="100%"
            color="currentColor"
            variant={active ? "Bulk" : "TwoTone"}
          />
        </motion.span>
      </motion.span>

      <span className="side-dock__tooltip" aria-hidden="true">
        <span className="side-dock__tooltip-index">{item.index}</span>
        <span className="side-dock__tooltip-label">{item.label}</span>
      </span>
    </motion.a>
  );
}

// Resume CTA removed per request

export function SideDock() {
  const mouseY = useMotionValue(Number.POSITIVE_INFINITY);

  const sectionIds = useMemo(
    () => navigationItems.map((item) => item.id),
    []
  );

  const activeSection = useActiveSection(sectionIds);

  return (
    <aside
      className="side-dock"
      aria-label="Portfolio navigation"
      onMouseMove={(event) => {
        mouseY.set(event.clientY);
      }}
      onMouseLeave={() => {
        mouseY.set(Number.POSITIVE_INFINITY);
      }}
    >
      <motion.nav
        className="side-dock__shell"
        initial={{
          opacity: 0,
          x: -18,
          filter: "blur(8px)",
        }}
        animate={{
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.12,
        }}
      >
        <div className="side-dock__frame">
          {navigationItems.map((item) => (
            <DockIconButton
              key={item.id}
              item={item}
              active={activeSection === item.id}
              mouseY={mouseY}
            />
          ))}
        </div>

        <div className="side-dock__divider" />
      </motion.nav>
    </aside>
  );
}