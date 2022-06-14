import React from 'react';

import { AsyncBgImage } from '../src/components/AsyncImage/AsyncBgImage';
import { loadImages } from '../src/components/AsyncImage/useAsyncImage';

const src = async () => (await import('./ModalBg.svg')).default;

export const preloadLoginIcon = () => loadImages(src);

export const ModalBg = ({ children }: { children: React.ReactNode }) => (
  <AsyncBgImage
    src={src}
  >{children}
  </AsyncBgImage>
);

//export const modalUrl = useAsyncImage(src)
