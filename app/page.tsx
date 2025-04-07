import DeviceList from "@/lib/components/device/list";
import { filterDevicesByLine, filterDevicesByName } from "@/lib/helpers";
import { getDevices } from "@/lib/services/device";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { search, lines } = await searchParams;

  const devices = await getDevices();

  let filteredDevices = devices;

  if (search && typeof search === "string") {
    filteredDevices = filterDevicesByName(filteredDevices, search);
  }

  if (lines && typeof lines === "string") {
    filteredDevices = filterDevicesByLine(filteredDevices, lines.split(","));
  }

  return (
    <DeviceList initialDevices={devices} filteredDevices={filteredDevices} />
  );
}
