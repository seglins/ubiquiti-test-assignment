"use client";

import type { View } from "./list-actions";
import type { Device } from "@/lib/types";
import DeviceTable from "./table";
import DeviceGrid from "./grid";

interface DeviceListProps {
  devices: Device[];
  view: View;
}

const DeviceList = ({ devices, view }: DeviceListProps) => {
  return (
    <section className="">
      {view === "list" && (
        <DeviceTable devices={devices} className="h-full pb-8" />
      )}

      {view === "grid" && <DeviceGrid devices={devices} className="pb-8" />}
    </section>
  );
};

export default DeviceList;
