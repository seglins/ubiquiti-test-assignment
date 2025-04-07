import DeviceList from "@/lib/components/device/list";
import { getDevices } from "@/lib/services/device";

export default async function Home() {
  const devices = await getDevices();

  return <DeviceList devices={devices} />;
}
