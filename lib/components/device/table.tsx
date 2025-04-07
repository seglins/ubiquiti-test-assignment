"use client";

import { Device } from "@/lib/types";
import Table from "../ui/table";
import DeviceImage from "./ui/image";
import useUrls from "@/lib/hooks/urls";

interface DeviceTableProps {
  devices: Device[];
  className?: string;
}

const DeviceTable = ({ devices, className }: DeviceTableProps) => {
  const { getDeviceUrl } = useUrls();

  return (
    <Table
      className={className}
      columns={[
        { title: "", width: "20px" },
        { title: "Product Line", width: "50%" },
        { title: "Name" },
      ]}
      rows={devices.map((device) => ({
        href: getDeviceUrl(device.id),
        data: [
          <DeviceImage
            key={`${device.id}-image`}
            id={device.id}
            src={device.images?.default ?? ""}
            alt={device.product?.name ?? `Device ${device.id} image`}
            width={20}
            height={20}
          />,
          device.line?.name,
          <span className="text-text-3" key={`${device.id}-name`}>
            {device.product?.name}
          </span>,
        ],
      }))}
    />
  );
};

export default DeviceTable;
