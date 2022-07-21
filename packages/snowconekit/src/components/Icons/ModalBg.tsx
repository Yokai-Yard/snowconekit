import React, { useContext, useState } from 'react';
import { Box } from '../Box/Box';
import { MeshGradient } from '../MeshGradient/MeshGradient.jsx';
import { AsyncBgImage } from '../AsyncImage/AsyncBgImage';
import { loadImages } from '../AsyncImage/useAsyncImage';
import { BoxProps } from '../Box/Box';
import { ThemeContext } from '../RainbowKitProvider/RainbowKitProvider';
/* import { motion } from 'framer-motion'; */

export const gradientColors: Record<string, any> = {
  blue: [
    [158, 174, 255],
    [102, 127, 255],
    [32, 83, 203],
  ],
  purple: [
    [189, 221, 255],
    [140, 171, 207],
    [93, 124, 158],
  ],
  pink: [
    [255, 154, 255],
    [255, 102, 204],
    [201, 46, 155],
  ],
  red: [
    [255, 153, 175],
    [255, 102, 128],
    [199, 49, 84],
  ],
  orange: [
    [255, 202, 149],
    [255, 153, 102],
    [200, 106, 58],
  ],
  green: [
    [159, 255, 203],
    [102, 255, 153],
    [29, 203, 106],
  ],
};

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
  console.log(theme);
  const accent = theme.colors.accentColorName;

  const gradient = gradientColors[accent];

  const isLightMode = theme?.colors?.modalBackground === '#FFFFFF';

  const bgImage = {
    backgroundImage: `linear-gradient(136deg, rgb(${gradient[2]}) 0%, rgb(${gradient[0]}) 100%)`,
  };

  return (
    <>
      <Box
        position="absolute"
        style={{ height: '100%', width: '100%', inset: '0px 0px 0px 0px' }}
      >
        {/* <Box style={{ backgroundImage: `linear-gradient(136deg, rgb(${gradient[2]}) 0%, rgb(${gradient[0]}) 100%` }}> */}
        <div style={{ width: '100%', height: '100%', ...bgImage }}>
          <MeshGradient
            backgroundColor="#1f4fcc"
            u_c1={gradient[0]}
            u_c2={gradient[1]}
            u_c3={gradient[2]}
          />
        </div>
      </Box>
      <Box position="relative" style={{ zIndex: 10 }}>
        {children}
      </Box>
    </>
  );
};

//export const modalUrl = useAsyncImage(src)

/* 
  return (
    <Box
      position="absolute"
      style={{ height: '100%', width: '100%' }}
    >
      <Box style={{ backgroundImage: `linear-gradient(136deg, rgb(${gradient[2]}) 0%, rgb(${gradient[0]}) 100%` }}>

        <MeshGradient
          backgroundColor="#1f4fcc"
          u_c1={gradient[0]}
          u_c2={gradient[1]}
          u_c3={gradient[2]}
        />
      </Box>
      {children}
    </Box>
  ) */
