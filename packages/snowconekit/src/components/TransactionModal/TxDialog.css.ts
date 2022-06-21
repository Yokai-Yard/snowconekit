import { keyframes, style } from '@vanilla-extract/css';

import { sprinkles } from '../../css/sprinkles.css';

const slideUp = keyframes({
  '0%': { transform: 'translateY(500px)' },
  '100%': { transform: 'translateY(150px)' },
});
const slideOut = keyframes({
  '0%': { transform: 'translateY(150px)' },
  '100%': { transform: 'translateY(-600px)' },
});

export const onEnter = style([
  sprinkles({
    position: 'absolute',
  }),
  {
    animation: `${slideUp} 750ms ease-out`,
    animationFillMode: 'forwards',
  },
]);
export const onExit = style([
  sprinkles({
    position: 'absolute',
  }),
  {
    animation: `${slideOut} 750ms ease-in`,
    animationFillMode: 'forwards',
  },
]);
