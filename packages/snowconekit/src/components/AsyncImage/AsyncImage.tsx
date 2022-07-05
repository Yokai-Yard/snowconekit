import React, { useReducer } from 'react';

import { Box, BoxProps } from '../Box/Box';
import { AsyncImageSrc, useAsyncImage } from './useAsyncImage';
import { SpinnerIcon } from '../Icons/Spinner';

type CustomBorderColor = {
  custom: string;
};
interface AsyncImageProps {
  alt?: string;
  src: string | AsyncImageSrc | undefined;
  width: BoxProps['width'] | number;
  height: BoxProps['height'] | number;
  background?: string;
  borderRadius?: BoxProps['borderRadius'];
  borderColor?: BoxProps['borderColor'] | CustomBorderColor;
  boxShadow?: BoxProps['boxShadow'];
  loading?: boolean;
}

export function AsyncImage({
  alt,
  background,
  borderColor,
  borderRadius,
  boxShadow,
  height,
  src: srcProp,
  width,
  loading,
}: AsyncImageProps) {
  const src = useAsyncImage(srcProp);
  const isRemoteImage = src && /^http/.test(src);
  const [isRemoteImageLoaded, setRemoteImageLoaded] = useReducer(
    () => true,
    false
  );

  return (
    <Box
      aria-label={alt}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      height={typeof height === 'string' ? height : undefined}
      overflow="hidden"
      position="relative"
      style={{
        background,
        height: typeof height === 'number' ? height : undefined,
        width: typeof width === 'number' ? width : undefined,
      }}
      width={typeof width === 'string' ? width : undefined}
    >
      <Box
        {...(isRemoteImage
          ? {
              'aria-hidden': true,
              'as': 'img',
              'onLoad': setRemoteImageLoaded,
              'src': src,
            }
          : {
              backgroundSize: 'cover',
            })}
        height="full"
        position="absolute"
        style={{
          touchCallout: 'none',
          transition: 'opacity .15s linear',
          userSelect: 'none',
          ...(isRemoteImage
            ? {
                opacity: isRemoteImageLoaded ? 1 : 0,
              }
            : {
                backgroundImage: src ? `url(${src})` : undefined,
                backgroundRepeat: 'no-repeat',
                opacity: src ? 1 : 0,
              }),
        }}
        width="full"
      />
      {borderColor ? (
        <Box
          {...(typeof borderColor === 'object' && 'custom' in borderColor
            ? { style: { borderColor: borderColor.custom } }
            : { borderColor })}
          borderRadius={borderRadius}
          borderStyle="solid"
          borderWidth="1"
          height="full"
          position="relative"
          width="full"
        />
      ) : null}
      {typeof loading === 'boolean' && (
        <Box
          display="flex"
          position="absolute"
          height={typeof height === 'string' ? height : undefined}
          width={typeof width === 'string' ? width : undefined}
          style={{
            color: 'hotPink',

            zIndex: 100,
            opacity: loading ? 1 : 0,
            transition: loading ? '0.6s ease' : '0.2s ease',
            transitionDelay: loading ? '.05s' : undefined,
          }}
        >
          <SpinnerIcon height="100%" width="100%" />
        </Box>
      )}
    </Box>
  );
}
