"use client";

import Image, { type ImageProps } from "next/image";

export interface DeviceImageProps extends ImageProps {
  id: string;
}

const DeviceImage = ({ id, alt, ...props }: DeviceImageProps) => (
  <Image
    {...props}
    alt={alt}
    loader={({ src, width }) =>
      `https://images.svc.ui.com/?u=https://static.ui.com/fingerprint/ui/images/${id}/default/${src}.png&w=${width}&q=75`
    }
  />
);

export default DeviceImage;
