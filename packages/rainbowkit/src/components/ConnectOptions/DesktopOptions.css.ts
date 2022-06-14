import { style } from '@vanilla-extract/css';

import {
  largeScreenMinWidth,
  sprinkles,
} from '../../css/sprinkles.css';

export const QRCodeBackgroundClassName = style([
  {
    background: 'white',
  },
]);



export const ScrollClassName = style([

  sprinkles({
    paddingX: '18',
  }),
  {
    maxHeight: 454,
    overflowY: 'auto',
  },
]);

export const sidebar = style({
  background: 'white',
  marginRight: '-10px',
  paddingTop: '18px',
  '@media': {
    [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
      minWidth: '187px',
    },
  },
  'minWidth': '146px',
});
export const waves = style({
  background: 'transparent',
  marginRight: '0px',
  boxShadow: 'none',
  paddingTop: '0px',
  '@media': {
    [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
      minWidth: '80px',
    },
  },
  'minWidth': '100px',
});

export const avaxContainer = style({
  boxShadow: '0 8px 16px 0 rgb(219 24 57 / 90%)',
  background: '#fe003d',
  transform: 'translateY(-15px)',
  borderRadius: 6,
  padding: 5,
  border: '2px solid black',
  marginRight: '-10px',
  marginLeft: '-10px',


});

export const overlayStyle = style({
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
});
