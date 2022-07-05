import React from 'react';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import * as styles from './CarouselButton.css';

type Props = {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  currentlySelected?: boolean;
  className: string;
};

export const CarouselButton = React.forwardRef(
  (
    {
      className,
      children,
      currentlySelected = false,
      onClick,
      ...urlProps
    }: Props,
    ref: React.Ref<HTMLElement>
  ) => {
    const mobile = isMobile();

    return (
      <Box
        as="button"
        disabled={currentlySelected}
        display="flex"
        onClick={onClick}
        ref={ref}
        type="button"
      >
        <Box
          style={{ backgroundColor: 'transparent' }}
          className={mobile ? styles.unsetBackgroundOnHover : undefined}
          padding={mobile ? '8' : '6'}
          transition="default"
          width="full"
          {...(currentlySelected
            ? {
                borderRadius: 'full',

                borderColor: 'selectedOptionBorder',
              }
            : {
                background: { hover: 'menuItemBackground' },
                color: 'modalText',
                transform: { active: 'shrink' },
                transition: 'default',
              })}
          {...urlProps}
        >
          {children}
        </Box>
      </Box>
    );
  }
);

CarouselButton.displayName = 'CarouselButton';
