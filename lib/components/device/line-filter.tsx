import Filter from "../ui/filter";
import { DeviceLine } from "@/lib/types";

interface DeviceLineFilterProps {
  lines: DeviceLine[];
}

const DeviceLineFilter = ({ lines }: DeviceLineFilterProps) => {
  return (
    <Filter
      name="lines"
      title="Product line"
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
