import Link from "next/link";
import DeviceImage, { type DeviceImageProps } from "./image";

interface DeviceCardProps {
  href: string;
  title: string;
  image: Omit<DeviceImageProps, "width" | "height">;
  description?: string;
  badge?: string;
}

const DeviceCard = ({
  href,
  title,
  image,
  description,
  badge,
}: DeviceCardProps) => {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-lg border border-neutral-3 overflow-hidden focus-outline"
    >
      <div className="relative p-2 bg-unifi-neutral-1 group-hover:bg-unifi-neutral-2 transition-colors">
        {badge && (
          <span className="absolute top-1 right-1 text-xs rounded-sm bg-unifi-neutral-0 text-primary-6 px-1 py-0.5">
            {badge}
          </span>
        )}
        <DeviceImage {...image} width={100} height={100} className="mx-auto" />
      </div>
      <div className="flex flex-col h-full justify-between gap-y-2 p-2 bg-unifi-neutral-0 group-hover:bg-unifi-neutral-1 transition-colors">
        <h3 className="min-h-[calc(calc(var(--spacing)*10)-calc(var(--spacing)*2))]">
          {title}
        </h3>
        <p className="text-xs text-text-3">{description}</p>
      </div>
    </Link>
  );
};

export default DeviceCard;
