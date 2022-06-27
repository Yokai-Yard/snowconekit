import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const DropdownIconClassName = sprinkles({
  marginLeft: '6',
});

export const GlassNav = style([
  {
    background:
      'linear-gradient(52deg, rgba(191,77,153,0.6) 0%, rgba(191,77,153,0.9) 100%)',
    boxShadow: '0 2px 8px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 5px )',
    WebkitBackdropFilter: 'blur( 5px )',
    minHeight: '44px',
    //add a before filter to the backdrop
  },
]);

export const GlassCard = style([
  {
    background:
      'linear-gradient(52deg, rgba(255, 255, 255,0.4) 0%, rgba(255, 255, 255,0.0) 100%)',
    //background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 9.5px )',
    WebkitBackdropFilter: 'blur( 9.5px )',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.68 )',
  },
]);
