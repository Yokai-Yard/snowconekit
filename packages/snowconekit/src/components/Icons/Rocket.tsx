import React from 'react';

import { AsyncImage } from '../AsyncImage/AsyncImage';
import { loadImages } from '../AsyncImage/useAsyncImage';

const src = async () => (await import('../../../assets/Rocket.png')).default;

export const preloadLoginIcon = () => loadImages(src);

export const Rocket = () => <AsyncImage width="full" src={src} height="full" />;
