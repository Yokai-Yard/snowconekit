import React, { useContext } from 'react';

import { AsyncBgImage } from '../AsyncImage/AsyncBgImage';
import { loadImages } from '../AsyncImage/useAsyncImage';
import { BoxProps } from '../Box/Box';
import { ThemeContext } from '../RainbowKitProvider/RainbowKitProvider';

const src = async () =>
  (await import('../../../assets/LayerShader.svg')).default;

/* const src = async () => await ColorChangingLayers('#ff66cc'); */

const darkSrc = async () =>
  (await import('../../../assets/SnowConeLayers.svg')).default;

export const preloadLoginIcon = () => loadImages(src);

type AsyncBgImageProps = {
  children: React.ReactNode;
  other?: BoxProps;
  profColor: string;
};

export const LayeredBg = ({
  profColor,
  children,
  other,
}: AsyncBgImageProps) => {
  const theme = useContext(ThemeContext);

  const isLightMode = theme?.colors?.modalBackground === '#FFFFFF';
  return (
    <AsyncBgImage
      profColor={profColor}
      src={isLightMode ? src : darkSrc}
      other={other}
    >
      {children}
    </AsyncBgImage>
  );
};

//export const modalUrl = useAsyncImage(src)
