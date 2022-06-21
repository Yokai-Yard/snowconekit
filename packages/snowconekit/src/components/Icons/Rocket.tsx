import React from 'react';

import { AsyncImage } from '../AsyncImage/AsyncImage';
import { loadImages } from '../AsyncImage/useAsyncImage';
import { Box } from '../Box/Box';
import { PushSpinner } from 'react-spinners-kit';

const src = async () => (await import('../../../assets/Rocket.png')).default;

export const preloadLoginIcon = () => loadImages(src);

export const Rocket = () => {
  return (
    <>
      <Box
        style={{
          position: 'relative',
          width: '125px',
          height: '200px',
          zIndex: '1',
        }}
      >
        <AsyncImage width="full" src={src} height="full" />
      </Box>
      <Box
        style={{
          transform: 'rotate(90deg)',
        }}
      >
        <PushSpinner color="white" />
      </Box>
    </>
  );
};
