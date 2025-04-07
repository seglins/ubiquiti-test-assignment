interface DeviceInfoRow {
  label: string;
  value: string;
}

const DeviceInfoRow = ({ label, value }: DeviceInfoRow) => {
  return (
    <p className="py-1.5 flex justify-between gap-x-4">
      <span className="text-text-1 whitespace-nowrap">{label}</span>
      <span className="text-text-3 text-right">{value}</span>
    </p>
  );
};

export default DeviceInfoRow;
