import React from 'react';

import { AsyncContainBgImage } from '../AsyncImage/AsyncBgImage';
import { loadImages } from '../AsyncImage/useAsyncImage';
import { BoxProps } from '../Box/Box';
import { Box } from '../Box/Box';

const src = async () =>
  (await import('../../../assets/ScCreditCard.svg')).default;

export const preloadLoginIcon = () => loadImages(src);

interface AsyncBgImageProps extends BoxProps {
  children: React.ReactNode;
}

export const ProfileCreditCard = ({
  children,
  ...other
}: AsyncBgImageProps) => {
  return (
    <Box {...other}>
      <AsyncContainBgImage src={src}>{children}</AsyncContainBgImage>
    </Box>
  );
};

//export const modalUrl = useAsyncImage(src)
