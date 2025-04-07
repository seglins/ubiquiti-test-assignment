"use client";

import cn from "classnames";
import { Device } from "@/lib/types";
import DeviceCard from "./ui/card";
import useUrls from "@/lib/hooks/urls";

interface DeviceGridProps {
  devices: Device[];
  className?: string;
}

const DeviceGrid = ({ devices, className }: DeviceGridProps) => {
  const { getDeviceUrl } = useUrls();

  return (
    <div
      className={cn(
        "container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 w-full gap-4",
        className,
      )}
    >
      {devices.map((device) => {
        return (
          <DeviceCard
            key={device.id}
            href={getDeviceUrl(device.id)}
            title={device.product?.name ?? ""}
            description={device.shortnames?.join(", ")}
            badge={device.line?.name}
            image={{
              id: device.id,
              src: device.images?.default ?? "",
              alt: device.product?.name ?? `Device ${device.id} photo`,
            }}
          />
        );
      })}
    </div>
  );
};

export default DeviceGrid;
