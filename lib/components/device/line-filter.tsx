import Filter from "../ui/filter";
import { Device, DeviceLine } from "@/lib/types";
import { filterDevicesByLine } from "@/lib/helpers";

interface DeviceLineFilterProps {
  initialDevices: Device[];
  onChange: (devices: Device[]) => void;
}

const DeviceLineFilter = ({
  initialDevices,
  onChange,
}: DeviceLineFilterProps) => {
  const lines = Array.from(
    initialDevices
      .reduce((map, device) => {
        if (device.line && !map.has(device.line.id)) {
          map.set(device.line.id, device.line);
        }

        return map;
      }, new Map<Device["id"], DeviceLine>())
      .values(),
  );

  const handleFilter = (values: string[]) => {
    const filteredDevices =
      values.length > 0
        ? filterDevicesByLine(initialDevices, values)
        : initialDevices;

    onChange(filteredDevices);
  };

  return (
    <Filter
      name="lines"
      title="Product line"
      onChange={handleFilter}
      options={lines?.map((line) => ({
        value: line.id,
        label: line.name ?? "",
      }))}
    >
      Filter
    </Filter>
  );
};

export default DeviceLineFilter;
