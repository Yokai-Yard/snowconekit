import React, { ReactNode } from 'react';

import { isMobile } from '../../utils/isMobile';
import { Box, BoxProps } from '../Box/Box';
//import { ModalBg } from '../Icons/ModalBg';

interface TxDialogContentProps {
  children: ReactNode;
  bottomSheetOnMobile?: boolean;
  padding?: BoxProps['padding'];
  marginTop?: BoxProps['marginTop'];
  width?: string;
}

export function TxDialogContent({
  children,
  marginTop,
  padding = '16',
}: TxDialogContentProps) {
  const mobile = isMobile();
  return (
    <Box
      marginTop={marginTop}
      borderRadius={mobile ? '1' : '13'}
      style={{ backgroundImage: 'linear-gradient(to right, #c73154, #ff6680)' }}
    >
      <Box padding={padding}>{children}</Box>
    </Box>
  );
}
