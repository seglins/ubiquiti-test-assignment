"use client";

import { useState } from "react";
import { Device } from "@/lib/types";
import DeviceImage from "./ui/image";
import DeviceInfoRow from "./ui/info-row";
import Button from "../ui/button";
import Copy from "../ui/copy";

interface DeviceInfoProps {
  device: Device;
}

const DeviceInfo = ({ device }: DeviceInfoProps) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const details = JSON.stringify(device, null, 2);
  const maxPower = device.unifi?.network?.power?.capacity;
  const maxSpeed = device.unifi?.network?.ethernetMaxSpeedMegabitsPerSecond;

  return (
    <section className="container space-y-4 py-4">
      <div className="relative flex flex-col sm:flex-row gap-8 w-full max-w-md sm:max-w-3xl mx-auto">
        {device.images?.default && (
          <DeviceImage
            id={device.id}
            src={device.images.default}
            alt={device.product?.name ?? `Device ${device.id} photo`}
            width={292}
            height={292}
            className="w-full sm:max-w-[292px] sm:max-h-[292px] p-4 rounded-lg bg-unifi-neutral-1"
          />
        )}

        <div className="w-full space-y-4">
          <div className="space-y-1">
            <h1 className="text-xl font-bold">{device.product?.name}</h1>
            <p className="text-text-3">{device.line?.name}</p>
          </div>

          <div className="">
            <DeviceInfoRow
              label="Product Line"
              value={device.line?.name ?? ""}
            />
            <DeviceInfoRow label="ID" value={device.line?.id ?? ""} />
            <DeviceInfoRow label="Name" value={device.product?.name ?? ""} />
            <DeviceInfoRow
              label="Short Name"
              value={device.shortnames?.[0] ?? "-"}
            />

            <DeviceInfoRow
              label="Max Power"
              value={maxPower ? `${maxPower} W` : "-"}
            />
            <DeviceInfoRow
              label="Speed"
              value={maxSpeed ? `${maxSpeed} Mbps` : "-"}
            />
            <DeviceInfoRow
              label="Number of Ports"
              value={`${device.unifi?.network?.numberOfPorts ?? "-"}`}
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="cta"
              onClick={() => setDetailsVisible(!detailsVisible)}
            >
              {detailsVisible ? "Hide Details" : "See All Details as JSON"}
            </Button>

            {detailsVisible && (
              <Copy content={details} successText="Details copied" />
            )}
          </div>
        </div>
      </div>

      {detailsVisible && (
        <div className="w-full max-w-md sm:max-w-3xl mx-auto overflow-scroll p-4 bg-unifi-neutral-1 rounded-lg">
          <pre className="font-mono sm:whitespace-pre-wrap">{details}</pre>
        </div>
      )}
    </section>
  );
};

export default DeviceInfo;
