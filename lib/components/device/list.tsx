"use client";

import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Device } from "@/lib/types";
import Button from "../ui/button";
import DeviceTable from "./table";
import DeviceGrid from "./grid";
import DeviceSearch from "./search";

type View = "list" | "grid";

interface DeviceListProps {
  devices: Device[];
}

const DeviceList = ({ devices }: DeviceListProps) => {
  const [view, setView] = useState<View>("list");

  const actionBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const actionBar = actionBarRef.current;
    if (!actionBar) return;

    const updateHeight = () => {
      const height = actionBar.offsetHeight;
      document.documentElement.style.setProperty(
        "--device-list-action-bar-height",
        `${height}px`,
      );
    };

    updateHeight();

    const observer = new ResizeObserver(() => updateHeight());
    observer.observe(actionBar);

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <section
        ref={actionBarRef}
        className="sticky top-0 inset-x-0 z-50 py-4 bg-background"
      >
        <div className="container flex flex-col sm:flex-row justify-between gap-y-2">
          <div className="flex items-center justify-between gap-x-4 sm:order-2">
            <DeviceCount count={devices.length} className="sm:hidden" />

            <div className="flex items-center gap-x-2">
              <ViewToggle current={view} onClick={setView} />
              {/* TODO: Filters */}
            </div>
          </div>

          <div className="flex items-center gap-x-4 sm:order-1">
            <DeviceSearch devices={devices} className="w-full" />
            <DeviceCount count={devices.length} className="hidden sm:block" />
          </div>
        </div>
      </section>

      <section className="pt-4 h-[calc(100%-var(--device-list-action-bar-height))]">
        {view === "list" && (
          <DeviceTable devices={devices} className="h-full pb-8" />
        )}

        {view === "grid" && <DeviceGrid devices={devices} className="pb-8" />}
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

export default DeviceList;
