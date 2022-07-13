import React, { ReactNode } from 'react';

import { isMobile } from '../../utils/isMobile';
import { Box, BoxProps } from '../Box/Box';
//import { ModalBg } from '../Icons/ModalBg';
import * as styles from './TxDialogContent.css';

interface TxDialogContentProps {
  children: ReactNode;
  bottomSheetOnMobile?: boolean;
  padding?: BoxProps['padding'];
  marginTop?: BoxProps['marginTop'];
  wide?: boolean;
  chainIconBackground?: string;
}

export function TxDialogContent({
  bottomSheetOnMobile = false,
  children,
  marginTop,
  padding = '16',
  wide = false,
  chainIconBackground,
}: TxDialogContentProps) {
  const mobile = isMobile();

  console.log(chainIconBackground);

  return (
    <Box
      className={[
        wide
          ? mobile
            ? styles.dialogContentWideMobile
            : styles.dialogContentWideDesktop
          : styles.dialogContent,
        mobile ? styles.dialogContentMobile : null,
        mobile && bottomSheetOnMobile ? styles.bottomSheetOverrides : null,
      ].join(' ')}
      style={{
        width: mobile ? '100vw' : '360px',
        height: mobile ? '' : '360px',
        backgroundColor: `${chainIconBackground}`,
      }}
    >
      <Box padding={padding}>{children}</Box>
    </Box>
  );
}
