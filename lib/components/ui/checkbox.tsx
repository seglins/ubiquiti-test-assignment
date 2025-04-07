import cn from "classnames";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = ({ label, className, ...props }: CheckboxProps) => {
  return (
    <label
      className={cn(
        "relative inline-flex items-center gap-x-2 px-0.5",
        className,
      )}
    >
      <input
        type="checkbox"
        {...props}
        className="peer absolute inset-0 focus-outline rounded-sm appearance-none cursor-pointer"
      />

      <span
        className={cn(
          "inline-flex items-center justify-center size-4 rounded-sm border border-neutral-6 bg-white text-white",
          "peer-checked:bg-primary-6 peer-checked:border-primary-6",
        )}
      >
        <CheckboxIcon />
      </span>

      {label}
    </label>
  );
};

const CheckboxIcon = () => {
  return (
    <svg
      width="8"
      height="6"
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.93801 4.57502L1.17056 2.80756C0.975298 2.61231 0.65872 2.61231 0.463461 2.80756C0.268239 3.00279 0.268196 3.31929 0.463365 3.51456L1.94798 4.99999L2.00002 5.05003L2.2319 5.28191C2.62242 5.67243 3.25559 5.67243 3.64611 5.28191L7.53548 1.39254C7.73073 1.19729 7.73073 0.88074 7.53548 0.685496C7.34025 0.490268 7.02373 0.490249 6.82848 0.685454L2.93801 4.57502Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Checkbox;
