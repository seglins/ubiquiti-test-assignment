import { Device } from "@/lib/types";
import Table from "../ui/table";
import ProductImage from "./ui/image";

interface ProductTableProps {
  devices: Device[];
  className?: string;
}

const ProductTable = ({ devices, className }: ProductTableProps) => {
  return (
    <Table
      className={className}
      columns={[
        { title: "", width: "20px" },
        { title: "Product line", width: "50%" },
        { title: "Name" },
      ]}
      rows={devices.map((device) => ({
        href: `/device/${device.id}`,
        data: [
          <ProductImage
            key={`${device.id}-image`}
            id={device.id}
            src={device.images.default}
            alt={device.product.name}
            width={20}
            height={20}
          />,
          device.line.name,
          <span className="text-text-3" key={`${device.id}-name`}>
            {device.product.name}
          </span>,
        ],
      }))}
    />
  );
};

export default ProductTable;
