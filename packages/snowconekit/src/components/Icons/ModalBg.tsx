import React from 'react';

import { AsyncBgImage } from '../AsyncImage/AsyncBgImage';
import { loadImages } from '../AsyncImage/useAsyncImage';
import { BoxProps } from '../Box/Box';

const src = async () =>
  (await import('../../../assets/AvalncheTrophy.png')).default;

export const preloadLoginIcon = () => loadImages(src);

type AsyncBgImageProps = {
  children: React.ReactNode;
  other?: BoxProps;
};

export const ModalBg = ({ children, other }: AsyncBgImageProps) => (
  <AsyncBgImage src={src} other={other}>
    {children}
  </AsyncBgImage>
);

//export const modalUrl = useAsyncImage(src)
