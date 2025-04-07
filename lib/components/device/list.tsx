"use client";

import { Device, DeviceLine } from "@/lib/types";
import DeviceTable from "./table";
import DeviceGrid from "./grid";
import DeviceListActions, { View } from "./list-actions";

interface DeviceListProps {
  devices: Device[];
  lines: DeviceLine[];
  view: View;
}

const DeviceList = ({ devices, lines, view }: DeviceListProps) => {
  return (
    <>
      <DeviceListActions devices={devices} view={view} lines={lines} />

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
