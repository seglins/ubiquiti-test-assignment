"use client";

import { useState } from "react";
import { Device } from "@/lib/types";
import Button from "../ui/button";
import DeviceTable from "./table";
import DeviceGrid from "./grid";

type View = "list" | "grid";

interface DeviceListProps {
  devices: Device[];
}

const DeviceList = ({ devices }: DeviceListProps) => {
  const [view, setView] = useState<View>("list");

  return (
    <>
      <section className="sticky top-[var(--header-height)]  inset-x-0 z-50 bg-background py-4">
        <div className="container flex justify-between">
          <div className="flex items-center gap-x-4">
            {/* TODO: Search */}
            <p className="text-muted text-xs">{devices.length} Devices</p>
          </div>

          <div className="flex items-center gap-x-2">
            <ViewToggle current={view} onClick={setView} />
            {/* TODO: Filters */}
          </div>
        </div>
      </section>

      <section className="pt-4">
        {view === "list" && (
          <DeviceTable
            devices={devices}
            className="max-h-[calc(100vh-calc(var(--spacing)*4)-var(--header-height)-var(--action-bar-height))] pb-8"
          />
        )}

        {view === "grid" && <DeviceGrid devices={devices} className="pb-8" />}
      </section>
    </>
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
