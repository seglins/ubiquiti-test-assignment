interface DeviceLine {
  id: string;
  name: string;
}

interface DeviceProduct {
  abbrev: string;
  name: string;
}

interface DeviceImages {
  default: string;
}

type DeviceUnifiRadios = Record<
  "na" | "ng",
  {
    maxPower: number;
    maxSpeedMegabitsPerSecond: number;
  }
>;

interface DeviceUnifi {
  numberOfPorts: number;
  radios: DeviceUnifiRadios;
}

export interface Device {
  id: string;
  images: DeviceImages;
  line: DeviceLine;
  product: DeviceProduct;
  shortnames: string[];
  unifi?: DeviceUnifi;
}
