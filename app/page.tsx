import DeviceList from "@/lib/components/device/list";
import DeviceListActions, { View } from "@/lib/components/device/list-actions";
import Layout from "@/lib/components/layout";
import { filterDevicesByLine, filterDevicesByName } from "@/lib/helpers";
import { getDevices } from "@/lib/services/device";
import { Device, DeviceLine } from "@/lib/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { search, lines, view } = await searchParams;

  let devices = await getDevices();

  const availableLines = Array.from(
    devices
      .reduce((map, device) => {
        if (device.line && !map.has(device.line.id)) {
          map.set(device.line.id, device.line);
        }

        return map;
      }, new Map<Device["id"], DeviceLine>())
      .values(),
  );

  if (search && typeof search === "string") {
    devices = filterDevicesByName(devices, search);
  }

  if (lines && typeof lines === "string") {
    devices = filterDevicesByLine(devices, lines.split(","));
  }

  const initialView = (
    view && typeof view === "string" ? view : "list"
  ) as View;

  return (
    <Layout
      subheader={
        <DeviceListActions
          devices={devices}
          view={initialView}
          lines={availableLines}
        />
      }
      subheaderClassName="bg-white"
    >
      <DeviceList devices={devices} view={initialView} className="h-full" />
    </Layout>
  );
}
