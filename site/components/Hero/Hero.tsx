import { Box } from 'components/Box/Box';
import NextImage from 'next/image';
import React from 'react';
import { heroWrapper, MODAL_SIZE, modalWrapper } from './Hero.css';

export function Hero() {
  return (
    <Box position="relative">
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
              height={MODAL_SIZE.height}
              src="/DemoModal.svg"
              width={MODAL_SIZE.width}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
