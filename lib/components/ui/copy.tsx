import { useState } from "react";
import cn from "classnames";
import Button from "./button";

interface CopyProps {
  content: string;
  successText?: string;
}

const Copy = ({ content, successText }: CopyProps) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="inline-flex items-center gap-x-1">
      {successText && (
        <span
          className={cn(
            "text-xs text-muted transition-opacity",
            copied ? "opacity-100" : "opacity-0",
          )}
        >
          {successText}
        </span>
      )}

      <Button icon="copy" onClick={handleClick} />
    </div>
  );
};

export default Copy;
