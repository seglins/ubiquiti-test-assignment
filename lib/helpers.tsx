import { Device } from "./types";

export const filterDevicesByName = (devices: Device[], value: string) =>
  devices.filter((device) => {
    const name = device.product?.name?.toLowerCase();
    return name?.includes(value.toLowerCase());
  });

export const highlightPattern = (text: string, pattern: string) => {
  if (!pattern) return text;

  const regex = new RegExp(`(${pattern})`, "i");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="underline font-bold">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
};
