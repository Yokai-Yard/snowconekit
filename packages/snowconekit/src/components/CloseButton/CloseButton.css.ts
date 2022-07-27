/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { atoms } from '../../css/atoms';

const variant = {
  default: style([
    atoms({
      background: 'closeButtonBackground',
      color: 'closeButton',
    }),
  ]),
  glass: style([
    atoms({
      background: 'glassBackground',
      color: 'glassForeground',
    }),
  ]),
};

export type Variant = keyof typeof variant;

export const variants = recipe({
  base: style([
    atoms({
      width: 'full',
      alignItems: 'center',
      borderRadius: 'full',
      borderColor: 'actionButtonBorder',
      display: 'flex',
      height: 'full',
      justifyContent: 'center',
      transform: { active: 'shrinkSm', hover: 'growLg' },
      transition: 'default',
    }),
    style({
      willChange: 'transform',
    }),
  ]),
  variants: {
    variant,
  },
});

export type Variants = RecipeVariants<typeof variants>;
