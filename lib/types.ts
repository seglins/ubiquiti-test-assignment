interface DeviceLine {
  id: string;
  name?: string;
}

interface DeviceProduct {
  abbrev?: string;
  name?: string;
}

interface DeviceImages {
  default?: string;
}

type DeviceRadios = Record<
  "string",
  {
    maxPower?: number;
    maxSpeedMegabitsPerSecond?: number;
  }
>;

interface DevicePower {
  capacity?: number;
}

interface DeviceNetwork {
  numberOfPorts?: number;
  ethernetMaxSpeedMegabitsPerSecond?: number;
  radios?: DeviceRadios;
  power?: DevicePower;
}

interface DeviceUnifi {
  network?: DeviceNetwork;
}

export interface Device {
  id: string;
  images?: DeviceImages;
  line?: DeviceLine;
  product?: DeviceProduct;
  shortnames?: string[];
  unifi?: DeviceUnifi;
}
