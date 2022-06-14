import React from 'react';

import {
  Box,
  BoxProps,
} from '../Box/Box';
import {
  AsyncImageSrc,
  useAsyncImage,
} from './useAsyncImage';

interface AsyncImageProps {
  src: string | AsyncImageSrc | undefined;
  children: React.ReactNode;
  other?: BoxProps;
}

export function AsyncBgImage({
  src: srcProp,
  children,
  other
}: AsyncImageProps) {
  const src = useAsyncImage(srcProp);
  //console.log('the modal image src is:', src)
  return (
    <Box
      {...other}
      style={{

        backgroundImage: src ? `url(${src})` : undefined,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        opacity: src ? 1 : 0,

        overflow: 'hidden',
      }}
      width="full"
    >
      {children}
    </Box>
  );
}
