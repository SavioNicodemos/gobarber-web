import { useState } from 'react';

import placeholderImage from '../../assets/no-image.png';

export const Image = ({ src, height, alt }: Props) => {
  const [imageSrc, setImageSrc] = useState(src || placeholderImage);

  const handleImageError = () => {
    setImageSrc(placeholderImage);
  };

  return (
    <img
      height={String(height)}
      alt={alt}
      src={imageSrc}
      onError={handleImageError}
      onErrorCapture={handleImageError}
    />
  );
};

type Props = {
  src: string;
  height?: number;
  alt: string;
};
