import cn from "classnames";
import { Device } from "@/lib/types";
import ProductCard from "./ui/card";

interface ProductGridProps {
  devices: Device[];
  className?: string;
}

const ProductGrid = ({ devices, className }: ProductGridProps) => {
  return (
    <div
      className={cn(
        "container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 w-full gap-4",
        className,
      )}
    >
      {devices.map((device) => {
        return (
          <ProductCard
            key={device.id}
            href={`/device/${device.id}`}
            title={device.product.name}
            description={device.shortnames.join(", ")}
            badge={device.line.name}
            image={{
              id: device.id,
              src: device.images.default,
              alt: device.product.name,
            }}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
