"use client";

import { useState } from "react";
import { Device, DeviceLine } from "@/lib/types";
import DeviceTable from "./table";
import DeviceGrid from "./grid";
import DeviceListActions from "./list-actions";

type View = "list" | "grid";

interface DeviceListProps {
  devices: Device[];
  lines: DeviceLine[];
}

const DeviceList = ({ devices, lines }: DeviceListProps) => {
  const [view, setView] = useState<View>("list");

  return (
    <>
      <DeviceListActions
        devices={devices}
        view={view}
        setView={setView}
        lines={lines}
      />

      <section className="pt-4 h-[calc(100%-var(--device-list-action-bar-height))]">
        {view === "list" && (
          <DeviceTable devices={devices} className="h-full pb-8" />
        )}

        {view === "grid" && <DeviceGrid devices={devices} className="pb-8" />}
      </section>
    </>
  );
};

export default DeviceList;
