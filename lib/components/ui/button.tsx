import cn from "classnames";
import Icon, { type IconName } from "./icon";

type ButtonVariant = "default" | "cta" | "navigation";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  active?: boolean;
  icon?: IconName;
}

const Button = ({
  variant = "default",
  active = false,
  icon,
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        "group inline-flex items-center cursor-pointer rounded-sm focus-outline transition-colors",
        variant === "default" && [
          "p-1.5",
          "active:bg-unifi-neutral-1 active:text-primary-6",
          active
            ? "bg-unifi-neutral-1 text-primary-6"
            : "bg-transparent text-text-3 hover:bg-unifi-neutral-2",
        ],
        variant === "cta" && [
          "py-1.5 px-0.5 text-primary-6 hover:text-primary-7",
        ],
        variant === "navigation" && [
          "p-1 bg-white text-text-3",
          "filter-[drop-shadow(var(--drop-shadow-button-border))_drop-shadow(var(--drop-shadow-button))]",
        ],
        className,
      )}
    >
      {icon && (
        <Icon
          name={icon}
          className={cn({
            "text-neutral-8": !active && variant !== "cta",
            "text-primary-6 group-hover:text-primary-7": variant === "cta",
          })}
        />
      )}

      {children}
    </button>
  );
};

export default Button;
