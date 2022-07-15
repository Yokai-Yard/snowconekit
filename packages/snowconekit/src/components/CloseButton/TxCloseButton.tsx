import React from 'react';

import { increaseHitAreaForHoverTransform } from '../../css/increaseHitAreaForHoverTransform.css';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { CloseIcon } from '../Icons/Close';

export const TxCloseButton = ({
  'aria-label': ariaLabel = 'Close',
  onClose,
}: {
  'aria-label'?: string;
  'onClose': () => void;
}) => {
  const mobile = isMobile();
  return (
    <Box
      aria-label={ariaLabel}
      as="button"
      borderRadius="full"
      className={increaseHitAreaForHoverTransform.growLg}
      display="flex"
      height={mobile ? '30' : '28'}
      onClick={onClose}
      type="button"
      width={mobile ? '30' : '28'}
    >
      <Box
        alignItems="center"
        borderRadius="full"
        borderStyle="solid"
        borderWidth={mobile ? '0' : '1'}
        color="closeButton"
        display="flex"
        height="full"
        justifyContent="center"
        style={{
          willChange: 'transform',
          color: 'white',
          backgroundColor: 'transparent',
          background: 'transparent',
          borderColor: 'transparent',
        }}
        transform={{ active: 'shrinkSm', hover: 'growLg' }}
        transition="default"
        width="full"
      >
        <CloseIcon />
      </Box>
    </Box>
  );
};
