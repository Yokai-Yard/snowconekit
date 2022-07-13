import { style } from '@vanilla-extract/css';

import { largeScreenMinWidth, sprinkles } from '../../css/sprinkles.css';

export const dialogContent = style([
  sprinkles({
    borderColor: 'modalBorder',
    borderRadius: 'modal',
    borderStyle: 'solid',
    borderWidth: '0',
    boxShadow: 'dialog',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  }),
  {
    '@media': {
      [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
        width: '360px',
      },
    },
    'boxSizing': 'content-box',
    'maxWidth': '100vw',
    'width': '360px',
    // '&.avax': {
    'backgroundImage':
      'linear-gradient(to right, rgba(255,255,255,0), rgba(0,0,0,.2))',
    // },
  },
]);

export const dialogContentWideMobile = style([
  dialogContent,
  { width: '100vw' },

  {
    '@media': {
      [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
        width: '480px',
      },
    },
  },
]);

export const dialogContentWideDesktop = style([
  dialogContent,
  {
    width: largeScreenMinWidth,
  },
  {
    '@media': {
      [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
        width: '720px',
      },
    },
  },
]);

export const dialogContentMobile = style([
  sprinkles({
    borderRadius: 'modalMobile',
  }),
  {
    borderWidth: '0px',
    boxSizing: 'border-box',
    width: '100vw',
  },
]);

const bleed = 200;
export const bottomSheetOverrides = style({
  '@media': {
    [`screen and (max-width: ${largeScreenMinWidth - 1}px)`]: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      marginTop: -bleed,
      paddingBottom: bleed,
      top: bleed,
    },
  },
});
