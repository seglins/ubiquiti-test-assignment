"use client";

import { useEffect, useRef } from "react";
import cn from "classnames";
import { Device } from "@/lib/types";
import Button from "../ui/button";
import DeviceSearch from "./search";
import DeviceLineFilter from "./line-filter";

export type View = "list" | "grid";

interface DeviceListActionsProps {
  devices: Device[];
  setDevices: (devices: Device[]) => void;
  initialDevices: Device[];
  view: View;
  setView: (view: View) => void;
}

const DeviceListActions = ({
  devices,
  setDevices,
  initialDevices,
  view,
  setView,
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
              <ViewToggle current={view} onClick={setView} />
              <DeviceLineFilter
                initialDevices={initialDevices}
                onChange={setDevices}
              />
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
  onClick: (view: View) => void;
}

const ViewToggle = ({ current, onClick }: ViewToggleProps) => {
  return (
    <div className="flex">
      <Button
        icon="list"
        active={current === "list"}
        onClick={() => onClick("list")}
      />

      <Button
        icon="grid"
        active={current === "grid"}
        onClick={() => onClick("grid")}
      />
    </div>
  );
};

export default DeviceListActions;
