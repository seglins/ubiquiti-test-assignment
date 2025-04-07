import Link from "next/link";
import ProductImage, { type ProductImageProps } from "./image";

interface ProductCardProps {
  href: string;
  title: string;
  image: Omit<ProductImageProps, "width" | "height">;
  description?: string;
  badge?: string;
}

const ProductCard = ({
  href,
  title,
  image,
  description,
  badge,
}: ProductCardProps) => {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-lg border border-neutral-3 overflow-hidden"
    >
      <div className="relative p-2 bg-unifi-neutral-1 group-hover:bg-unifi-neutral-2">
        {badge && (
          <span className="absolute top-1 right-1 text-xs rounded-sm bg-unifi-neutral-0 text-primary-6 px-1 py-0.5">
            {badge}
          </span>
        )}
        <ProductImage {...image} width={100} height={100} className="mx-auto" />
      </div>
      <div className="flex flex-col h-full justify-between gap-y-2 p-2 bg-unifi-neutral-0 group-hover:bg-unifi-neutral-1">
        <h3 className="min-h-[calc(calc(var(--spacing)*10)-calc(var(--spacing)*2))]">
          {title}
        </h3>
        <p className="text-xs text-text-3">{description}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
