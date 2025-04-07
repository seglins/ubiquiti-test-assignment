import type { Device } from "../types";

const url = process.env.NEXT_PUBLIC_UIDB_URL!;

export const getDevices = async (): Promise<Device[]> => {
  const response = await fetch(url);
  const data = await response.json();

  return data.devices ?? [];
};

export const getDevice = async (
  id: string,
): Promise<{
  device: Device | null;
  previousId: Device["id"];
  nextId: Device["id"];
}> => {
  const response = await fetch(url);
  const data = await response.json();
  const devices: Device[] = data.devices ?? [];
  const deviceIndex = devices.findIndex((device) => device.id === id);
  const device = devices[deviceIndex];
  const previousId = devices[deviceIndex - 1]?.id;
  const nextId = devices[deviceIndex + 1]?.id;

  return {
    device,
    previousId,
    nextId,
  };
};
