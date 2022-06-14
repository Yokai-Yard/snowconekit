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
  /*   const isRemoteImage = src && /^http/.test(src);
    const [isRemoteImageLoaded, setRemoteImageLoaded] = useReducer(
      () => true,
      false
    ); */
  //console.log('the modal image src is:', src)
  return (
    <Box

      style={{

        backgroundImage: src ? `url(${src})` : undefined,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        opacity: src ? 1 : 0,
        borderRadius: '16px',
        overflow: 'hidden',
      }}
      width="full"
    >
      {children}
    </Box>
  );
}
