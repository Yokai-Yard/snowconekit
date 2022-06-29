import React, { useMemo } from 'react';

import { Box, BoxProps } from '../Box/Box';
import { AsyncImageSrc, useAsyncImage } from './useAsyncImage';

interface AsyncImageProps {
  src: string | AsyncImageSrc | undefined;
  children: React.ReactNode;
  profColor?: string;
  other?: BoxProps;
}

export function AsyncBgImage({
  src: srcProp,
  children,
  profColor,
  other,
}: AsyncImageProps) {
  const src = useAsyncImage(srcProp);

  const styles = {
    backgroundColor: profColor ? profColor : null,
    backgroundImage: src ? `url(${src})` : undefined,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: src ? 1 : 0,

    overflow: 'hidden',
  };

  return (
    <Box {...other} style={styles} width="full">
      {children}
    </Box>
  );
}
export function AsyncContainBgImage({
  src: srcProp,
  children,
  other,
}: AsyncImageProps) {
  const src = useAsyncImage(srcProp);
  return (
    <Box
      {...other}
      style={{
        backgroundImage: src ? `url(${src})` : undefined,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        opacity: src ? 1 : 0,

        overflow: 'hidden',
      }}
      width="full"
    >
      {children}
    </Box>
  );
}
