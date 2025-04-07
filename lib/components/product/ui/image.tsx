"use client";

import Image, { type ImageProps } from "next/image";

export interface ProductImageProps extends ImageProps {
  id: string;
}

const ProductImage = ({ id, alt, ...props }: ProductImageProps) => (
  <Image
    {...props}
    alt={alt}
    loader={({ src, width }) =>
      `https://images.svc.ui.com/?u=https://static.ui.com/fingerprint/ui/images/${id}/default/${src}.png&w=${width}&q=75`
    }
  />
);

export default ProductImage;
