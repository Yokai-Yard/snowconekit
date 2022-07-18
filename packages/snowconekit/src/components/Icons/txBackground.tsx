import React, { useContext } from 'react';

import { AsyncBgImage } from '../AsyncImage/AsyncBgImage';
import { loadImages } from '../AsyncImage/useAsyncImage';
import { BoxProps } from '../Box/Box';

const src = async () =>
  (await import('../../../assets/txBackground.png')).default;

export const preloadTxBg = () => loadImages(src);

type AsyncBgImageProps = {
  children: React.ReactNode;
  other?: BoxProps;
};

export const TxBg = ({ children, other }: AsyncBgImageProps) => {
  return (
    <AsyncBgImage src={src} other={other}>
      {children}
    </AsyncBgImage>
  );
};

//export const modalUrl = useAsyncImage(src)
