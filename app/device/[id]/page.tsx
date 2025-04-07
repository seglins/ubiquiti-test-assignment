import DeviceNavigation from "@/lib/components/device/navigation";
import DeviceInfo from "@/lib/components/device/info";
import { getDevice } from "@/lib/services/device";

export default async function DevicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { device, previousId, nextId } = await getDevice(id);

  if (!device) {
    // TODO: Handle 404
    return null;
  }

  return (
    <>
      <DeviceNavigation previousId={previousId} nextId={nextId} />
      <DeviceInfo device={device} />
    </>
  );
}
