import { useEffect, useState } from "react";
import cn from "classnames";
import Button from "../ui/button";
import Checkbox from "../ui/checkbox";
import useUrls from "@/lib/hooks/urls";
import Popover from "./popover";

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
  const [popoverOpen, setPopoverOpen] = useState(false);

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
    <div className={cn("relative", className)}>
      <Button
        active={popoverOpen}
        onClick={() => setPopoverOpen(!popoverOpen)}
        className="relative z-10"
      >
        {children}
      </Button>

      <Popover
        open={popoverOpen}
        setOpen={setPopoverOpen}
        className="flex flex-col gap-y-4 right-0 top-8 p-4 min-w-40 max-w-[calc(100vw-var(--container-padding)*2)]"
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
      </Popover>
    </div>
  );
};

export default Filter;
