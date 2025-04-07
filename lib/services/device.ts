import type { Device } from "../types";

const url = process.env.NEXT_PUBLIC_UIDB_URL!;

export const getDevices = async (): Promise<Device[]> => {
  const response = await fetch(url);
  const data = await response.json();
  return data.devices ?? [];
};

export const getDevice = async (id: string): Promise<Device | null> => {
  const response = await fetch(url);
  const data = await response.json();
  const devices: Device[] = data.devices ?? [];
  return devices.find((device) => device.id === id) ?? null;
};
