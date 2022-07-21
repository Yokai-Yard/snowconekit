import { Box } from 'components/Box/Box';
import NextImage from 'next/image';
import React from 'react';
import { heroWrapper, modalWrapper } from './Hero.css';

export function Hero() {
  return (
    <Box alt="Demo Modal" position="relative">
      <Box
        backgroundColor="purple90"
        position="absolute"
        style={{
          borderRadius: '100%',
          filter: 'blur(150px)',
          height: '80%',
          left: '50%',
          top: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
          width: '50vw',
          zIndex: '1',
        }}
      />
      <Box marginX="auto" position="relative" style={{ zIndex: '2' }}>
        <Box className={heroWrapper}>
          <Box className={modalWrapper}>
            <NextImage
              alt="Demo Modal"
              height={1704}
              src="/DemoModal.svg"
              width={2352}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
