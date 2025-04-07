import { useEffect, useState } from "react";
import cn from "classnames";
import Link from "next/link";
import { Device } from "@/lib/types";
import Icon from "../ui/icon";
import { filterDevicesByName, highlightPattern } from "@/lib/helpers";
import { useSearchParams } from "next/navigation";
import useUrls from "@/lib/hooks/urls";
import Popover from "../ui/popover";

interface DeviceSearchProps {
  devices: Device[];
  className?: string;
}

const DeviceSearch = ({ devices, className }: DeviceSearchProps) => {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("search") ?? "");
  const [results, setResults] = useState<Device[]>([]);
  const [popoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    setResults(query.length > 0 ? filterDevicesByName(devices, query) : []);
  }, [devices, query]);

  return (
    <div className={cn("relative", className)}>
      <form
        className={cn(
          "relative flex items-center w-full sm:min-w-80 shrink-0 h-8 px-2 rounded-sm",
          "transition-colors bg-neutral-2 text-neutral-8 hover:bg-neutral-3",
        )}
      >
        <Icon name="search" />
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsPopoverOpen(true)}
          className="absolute inset-0 pl-8 rounded-sm placeholder:text-neutral-8"
        />
      </form>

      <Popover
        open={results.length > 0 && popoverOpen}
        setOpen={setIsPopoverOpen}
        className={cn(
          "flex flex-col left-0 top-8 py-2 overflow-y-scroll",
          "max-h-44 sm:min-w-auto sm:w-80 w-[calc(100vw-var(--container-padding)*2)]",
        )}
      >
        {results.map((device) => (
          <SearchResultItem
            key={`search-item-${device.id}`}
            device={device}
            query={query}
          />
        ))}
      </Popover>
    </div>
  );
};

interface SearchResultItemProps {
  device: Device;
  query: string;
}

const SearchResultItem = ({ device, query }: SearchResultItemProps) => {
  const { getDeviceUrl } = useUrls();

  return (
    <Link
      key={device.id}
      href={getDeviceUrl(device.id)}
      className={cn(
        "w-full flex justify-between gap-x-4 h-8 px-2 py-1.5",
        "transition-all focus-outline hover:bg-unifi-neutral-2",
      )}
    >
      <span className="truncate">
        {highlightPattern(device.product?.name ?? "", query)}
      </span>
      <span className="text-unifi-text-3 text-right flex-shrink-0">
        {device.product?.abbrev}
      </span>
    </Link>
  );
};

export default DeviceSearch;
