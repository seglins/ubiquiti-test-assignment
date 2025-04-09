"use client";

import cn from "classnames";
import { useEffect, useRef } from "react";

interface SubheaderProps {
  children: React.ReactNode;
  className?: string;
  onReady?: (state: boolean) => void;
}

const Subheader = ({ children, className, onReady }: SubheaderProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const updateCSSHeightVariable = () => {
      const height = container.offsetHeight;
      document.documentElement.style.setProperty(
        "--subheader-height",
        `${height}px`,
      );
    };

    updateCSSHeightVariable();
    onReady?.(true);

    const observer = new ResizeObserver(() => updateCSSHeightVariable());
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={cn(
        "fixed inset-x-0 z-50 top-[var(--header-height)]",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default Subheader;
