"use client";

import cn from "classnames";
import type { View } from "./list-actions";
import type { Device } from "@/lib/types";
import DeviceTable from "./table";
import DeviceGrid from "./grid";

interface DeviceListProps {
  devices: Device[];
  view: View;
  className?: string;
}

const DeviceList = ({ devices, view, className }: DeviceListProps) => {
  return (
    <section className={cn("pt-4", className)}>
      {view === "list" && (
        <DeviceTable devices={devices} className="h-full pb-8" />
      )}

      {view === "grid" && <DeviceGrid devices={devices} className="pb-8" />}
    </section>
  );
};

export default DeviceList;
