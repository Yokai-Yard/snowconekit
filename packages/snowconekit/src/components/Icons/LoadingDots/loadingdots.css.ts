import { style } from '@vanilla-extract/css';

export const animation1 = style({
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '2.2pxheight',
  borderRadius: '50%',
  backgroundColor: '#14516d',
  WebkitAnimation: 'kjSQAl 1.25s linear infinite',
  animation: 'kjSQAl 1.25s linear infinite',
  WebkitAnimationDelay: '0s',
  animationDelay: '0s',
});

export const animation2 = style({
  position: 'absolute',
  top: '0px',
  left: '4.4px',
  width: '2.2px',
  height: '2.2px',
  borderRadius: '50%',
  backgroundColor: '#14516d',
  WebkitAnimation: 'kjSQAl 1.25s linear infinite',
  animation: 'kjSQAl 1.25s linear infinite',
  WebkitAnimationDelay: '0.125s',
  animationDelay: '0.125s',
});

const animation3 = style({
  position: 'absolute',
  top: '0px',
  left: '8.8px',
  width: '2.2px',
  height: '2.2px',
  borderRadius: '50%',
  backgroundColor: '#14516d',
  WebkitAnimation: 'kjSQAl 1.25s linear infinite',
  animation: 'kjSQAl 1.25s linear infinite',
  WebkitAnimationDelay: '0.25s',
  animationDelay: '0.25s',
});

export const loadingDots = style({
  position: 'relative',
  display: 'flex',
  WebkitBoxPack: 'center',
  WebkitJustifyContent: 'center',
  MsFlexPack: 'center',
  justifyContent: 'center',
  WebkitAlignItems: 'center',
  WebkitBoxAlign: 'center',
  MsFlexAlign: 'center',
  alignItems: 'center',
  width: '11px',
  height: '2.2px',
});

export const ball1 = style([
  {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '2.2px',
    height: '2.2px',
    borderRadius: '50%',
    backgroundColor: '#14516d',
    WebkitAnimation: 'kjSQAl 1.25s linear infinite',
    animation: 'kjSQAl 1.25s linear infinite',
    WebkitAnimationDelay: '0s',
    animationDelay: '0s',
  },
  animation1,
]);
export const ball2 = style([
  {
    position: 'absolute',
    top: '0px',
    left: '4.4px',
    width: '2.2px',
    height: '2.2px',
    borderRadius: '50%',
    backgroundColor: '#14516d',
    WebkitAnimation: 'kjSQAl 1.25s linear infinite',
    animation: 'kjSQAl 1.25s linear infinite',
    WebkitAnimationDelay: '0.125s',
    animationDelay: '0.125s',
  },
  animation2,
]);
export const ball3 = style([
  {
    position: 'absolute',
    top: '0px',
    left: '8.8px',
    width: '2.2px',
    height: '2.2px',
    borderRadius: '50%',
    backgroundColor: '#14516d',
    WebkitAnimation: 'kjSQAl 1.25s linear infinite',
    animation: 'kjSQAl 1.25s linear infinite',
    WebkitAnimationDelay: '0.25s',
    animationDelay: '0.25s',
  },
  animation3,
]);
