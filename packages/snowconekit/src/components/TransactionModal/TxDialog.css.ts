import { keyframes, style } from '@vanilla-extract/css';

import { sprinkles } from '../../css/sprinkles.css';

const slideUp = keyframes({
  '0%': { transform: 'translateY(500px)' },
  '100%': { transform: 'translateY(100px)' },
});
const slideOut = keyframes({
  '0%': { transform: 'translateY(100px)' },
  '100%': { transform: 'translateY(-600px)' },
});

export const onEnter = style([
  sprinkles({
    position: 'absolute',
  }),
  {
    animation: `${slideUp} 750ms ease-out`,
    animationFillMode: 'forwards',
    // zIndex: 1,
  },
]);
export const onExit = style([
  sprinkles({
    position: 'absolute',
  }),
  {
    animation: `${slideOut} 750ms ease-in`,
    animationFillMode: 'forwards',
    zIndex: 1,
  },
]);
