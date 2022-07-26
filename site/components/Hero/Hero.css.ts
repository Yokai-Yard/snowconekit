/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';
import { responsiveStyle } from 'css/responsiveStyle';

export const MODAL_SIZE = {
  width: 900,
  height: 630,
};

export const PHONE_SIZE = {
  width: 340,
  height: 682,
};

export const heroWrapper = style([
  {
    pointerEvents: 'none',
    userSelect: 'none',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
]);

export const modalWrapper = style([
  atoms({ display: { xs: 'none', md: 'block' } }),
  {
    maxWidth: 750,
  },
]);

export const phoneWrapper = style([
  responsiveStyle({
    xs: { maxWidth: PHONE_SIZE.width / 2, marginBottom: -189 },
    md: { display: 'none' },
    lg: {
      display: 'block',
      maxWidth: 300,
      position: 'relative',
      bottom: 30,
      marginLeft: -250,
      marginBottom: 0,
    },
  }),
]);
