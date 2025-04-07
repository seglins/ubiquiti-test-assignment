import DeviceList from "@/lib/components/device/list";
import { filterDevicesByLine, filterDevicesByName } from "@/lib/helpers";
import { getDevices } from "@/lib/services/device";
import { Device, DeviceLine } from "@/lib/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { search, lines } = await searchParams;

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

  return <DeviceList devices={devices} lines={availableLines} />;
}
