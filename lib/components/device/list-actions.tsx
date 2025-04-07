"use client";

import { useEffect, useRef } from "react";
import cn from "classnames";
import { Device, DeviceLine } from "@/lib/types";
import Button from "../ui/button";
import DeviceSearch from "./search";
import DeviceLineFilter from "./line-filter";
import useUrls from "@/lib/hooks/urls";

export type View = "list" | "grid";

interface DeviceListActionsProps {
  devices: Device[];
  lines: DeviceLine[];
  view: View;
}

const DeviceListActions = ({
  devices,
  lines,
  view,
}: DeviceListActionsProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const updateHeight = () => {
      const height = container.offsetHeight;
      document.documentElement.style.setProperty(
        "--device-list-action-bar-height",
        `${height}px`,
      );
    };

    updateHeight();

    const observer = new ResizeObserver(() => updateHeight());
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={ref}
        className="sticky top-0 inset-x-0 z-50 py-4 bg-background"
      >
        <div className="container flex flex-col sm:flex-row justify-between gap-y-2">
          <div className="flex items-center justify-between gap-x-4 sm:order-2">
            <DeviceCount count={devices.length} className="sm:hidden" />

            <div className="flex items-center gap-x-2">
              <ViewToggle current={view} />
              <DeviceLineFilter lines={lines} />
            </div>
          </div>

          <div className="flex items-center gap-x-4 sm:order-1">
            <DeviceSearch devices={devices} className="w-full" />
            <DeviceCount count={devices.length} className="hidden sm:block" />
          </div>
        </div>
      </section>
    </>
  );
};

interface DeviceCountProps {
  count: number;
  className?: string;
}

const DeviceCount = ({ count, className }: DeviceCountProps) => {
  return (
    <p className={cn("text-muted text-xs whitespace-nowrap", className)}>
      {count} Devices
    </p>
  );
};

interface ViewToggleProps {
  current: View;
}

const ViewToggle = ({ current }: ViewToggleProps) => {
  const param = "view";
  const { updateSearchParam } = useUrls();

  return (
    <div className="flex">
      <Button
        icon="list"
        active={current === "list"}
        onClick={() => updateSearchParam(param, "list")}
      />

      <Button
        icon="grid"
        active={current === "grid"}
        onClick={() => updateSearchParam(param, "grid")}
      />
    </div>
  );
};

export default DeviceListActions;
