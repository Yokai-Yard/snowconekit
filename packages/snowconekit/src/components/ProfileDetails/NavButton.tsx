import React from 'react';

import { increaseHitAreaForHoverTransform } from '../../css/increaseHitAreaForHoverTransform.css';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';

interface NavAction {
  label: string;
  action?: () => void;
  icon: JSX.Element;
}

export const NavButton = ({ action, icon, label }: NavAction) => {
  const mobile = isMobile();
  return (
    <Box
      aria-label={label}
      as="button"
      borderRadius="full"
      className={increaseHitAreaForHoverTransform.growLg}
      display="flex"
      height={mobile ? '30' : '28'}
      onClick={action}
      type="button"
      width={mobile ? '30' : '28'}
      marginRight={mobile ? '12' : '16'}
    >
      <Box
        alignItems="center"
        background="closeButtonBackground"
        borderColor="actionButtonBorder"
        borderRadius="full"
        borderStyle="solid"
        borderWidth={mobile ? '0' : '1'}
        color="closeButton"
        display="flex"
        height="full"
        justifyContent="center"
        style={{ willChange: 'transform', color: 'white' }}
        transform={{ active: 'shrinkSm', hover: 'growLg' }}
        transition="default"
        width="full"
      >
        {icon}
      </Box>
    </Box>
  );
};
