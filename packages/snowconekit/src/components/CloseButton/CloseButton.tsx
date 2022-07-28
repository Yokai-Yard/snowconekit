import React from 'react';
import { increaseHitAreaForHoverTransform } from '../../css/increaseHitAreaForHoverTransform.css';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { CloseIcon } from '../Icons/Close';
import * as styles from './CloseButton.css';

export const CloseButton = React.forwardRef(
  (
    {
      'aria-label': ariaLabel = 'Close',
      variant = 'default',
      onClose,
    }: {
      'aria-label'?: string;
      'onClose': () => void;
      'variant'?: 'default' | 'glass';
    },
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const mobile = isMobile();
    return (
      <Box
        aria-label={ariaLabel}
        ref={ref}
        as="button"
        borderRadius="full"
        className={increaseHitAreaForHoverTransform.growLg}
        display="flex"
        height={mobile ? '30' : '28'}
        onClick={onClose}
        type="button"
        width={mobile ? '30' : '28'}
      >
        <Box className={styles.variants({ variant })}>
          <CloseIcon />
        </Box>
      </Box>
    );
  }
);
