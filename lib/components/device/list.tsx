"use client";

import { useState } from "react";
import { Device } from "@/lib/types";
import DeviceTable from "./table";
import DeviceGrid from "./grid";
import DeviceListActions from "./list-actions";

type View = "list" | "grid";

interface DeviceListProps {
  initialDevices: Device[];
  filteredDevices?: Device[];
}

const DeviceList = ({ initialDevices, filteredDevices }: DeviceListProps) => {
  const [devices, setDevices] = useState<Device[]>(
    filteredDevices ?? initialDevices,
  );

  const [view, setView] = useState<View>("list");

  return (
    <>
      <DeviceListActions
        devices={devices}
        setDevices={setDevices}
        initialDevices={initialDevices}
        view={view}
        setView={setView}
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
