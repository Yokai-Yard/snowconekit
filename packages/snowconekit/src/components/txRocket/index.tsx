import React from 'react';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { loadImages } from '../AsyncImage/useAsyncImage';

const src = async () => (await import('../../../assets/txRocket.svg')).default;

export const preloadCreateIcon = () => loadImages(src);

export const TxRocket = () => {
  <AsyncImage background="#e3a5e8" height="48" src={src} width="48" />;
};
