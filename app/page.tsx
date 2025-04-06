import DeviceList from "@/lib/components/device/list";
import { filterDevicesByName } from "@/lib/helpers";
import { getDevices } from "@/lib/services/device";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { search } = await searchParams;
  const devices = await getDevices();

  return (
    <DeviceList
      devices={
        search && typeof search === "string"
          ? filterDevicesByName(devices, search)
          : devices
      }
    />
  );
}
