import DeviceNavigation from "@/lib/components/device/navigation";
import DeviceInfo from "@/lib/components/device/info";
import Layout from "@/lib/components/layout";
import { getDevice } from "@/lib/services/device";

export default async function DevicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { device, previousId, nextId } = await getDevice(id);

  if (!device) {
    return null;
  }

  return (
    <Layout
      subheader={<DeviceNavigation previousId={previousId} nextId={nextId} />}
    >
      <DeviceInfo device={device} />
    </Layout>
  );
}
