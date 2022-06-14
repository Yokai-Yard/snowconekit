import React from 'react';

import { AsyncBgImage } from '../AsyncImage/AsyncBgImage';
import { loadImages } from '../AsyncImage/useAsyncImage';

const src = async () => (await import('./ModalBg.svg')).default;

export const preloadLoginIcon = () => loadImages(src);

export const ModalBg = ({ children }: { children: React.ReactNode }) => (
  <AsyncBgImage
    src={src}
  >{children}
  </AsyncBgImage>
);

//export const modalUrl = useAsyncImage(src)
