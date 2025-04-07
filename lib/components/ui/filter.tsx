import { useEffect, useState } from "react";
import cn from "classnames";
import useDropdown from "@/lib/hooks/dropdown";
import Button from "../ui/button";
import Checkbox from "../ui/checkbox";
import useUrls from "@/lib/hooks/urls";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterProps {
  name: string;
  title: string;
  options: FilterOption[];
  children: string;
  onChange?: (values: string[]) => void;
  className?: string;
}

const Filter = ({
  name,
  title,
  options,
  children,
  onChange,
  className,
}: FilterProps) => {
  const { searchParams, updateSearchParam } = useUrls();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { ref, open, show, hide } = useDropdown();

  useEffect(() => {
    const filterParam = searchParams.get(name);

    if (!filterParam) {
      return setActiveFilters([]);
    }

    setActiveFilters(filterParam.split(","));
  }, [name, searchParams]);

  const handleChange = (id: string) => {
    const updatedFilters = activeFilters.includes(id)
      ? activeFilters.filter((value) => value !== id)
      : [...activeFilters, id];

    updateSearchParam(name, updatedFilters.join(","));
    setActiveFilters(updatedFilters);
    onChange?.(updatedFilters);
  };

  const handleReset = () => {
    updateSearchParam(name, "");
    setActiveFilters([]);
    onChange?.([]);
  };

  return (
    <div className={cn("relative", className)} ref={ref}>
      <Button active={open} onClick={() => (open ? hide() : show())}>
        {children}
      </Button>

      {open && (
        <div
          className={cn(
            "absolute z-10 flex flex-col gap-y-4 right-0 top-8 rounded-lg bg-background p-4 drop-shadow-dropdown",
            "min-w-40 max-w-[calc(100vw-var(--container-padding)*2)]",
          )}
        >
          <h5 className="font-bold">{title}</h5>
          <div className="flex flex-col gap-y-2 max-h-[50vh] overflow-y-scroll">
            {options.map((option) => (
              <Checkbox
                key={`filter-option-${option.value}`}
                value={option.value}
                label={option.label}
                checked={activeFilters.includes(option.value)}
                onChange={() => handleChange(option.value)}
              />
            ))}
          </div>

          <Button
            disabled={!activeFilters.length}
            variant="destructive"
            className="self-start"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default Filter;
