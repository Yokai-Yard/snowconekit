import React, { useContext } from 'react';

import { AsyncBgImage } from '../AsyncImage/AsyncBgImage';
import { loadImages } from '../AsyncImage/useAsyncImage';
import { BoxProps } from '../Box/Box';
import { ThemeContext } from '../RainbowKitProvider/RainbowKitProvider';

const src = async () =>
  (await import('../../../assets/AvalncheTrophy.png')).default;

const darkSrc = async () =>
  (await import('../../../assets/AvaxDarkMode.png')).default;

export const preloadLoginIcon = () => loadImages(src);

type AsyncBgImageProps = {
  children: React.ReactNode;
  other?: BoxProps;
};

export const ModalBg = ({ children, other }: AsyncBgImageProps) => {
  const theme = useContext(ThemeContext);

  const isLightMode = theme?.colors?.modalBackground === '#FFFFFF';

  return (
    <AsyncBgImage src={isLightMode ? src : darkSrc} other={other}>
      {children}
    </AsyncBgImage>
  );
};

//export const modalUrl = useAsyncImage(src)
