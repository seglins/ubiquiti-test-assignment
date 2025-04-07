import cn from "classnames";
import { useCallback, useEffect, useRef } from "react";

interface PopoverProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
  children?: React.ReactNode;
}

export const Popover = ({
  open,
  setOpen,
  className,
  children,
}: PopoverProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const hide = useCallback(() => setOpen(false), [setOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        hide();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        hide();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hide]);

  if (!open) return null;

  return (
    <>
      <div className="fixed overflow-hidden z-[1] inset-0" onClick={hide} />

      <div
        className={cn(
          "absolute z-10 rounded-lg bg-background drop-shadow-dropdown",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Popover;
