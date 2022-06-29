import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const DropdownIconClassName = sprinkles({
  marginLeft: '6',
});

export const GlassNav = style([
  {
    'padding': '4px 16px',

    'boxShadow': '0 2px 8px 0 rgba( 31, 38, 135, 0.37 )',
    'backdropFilter': 'blur( 8px )',
    'WebkitBackdropFilter': 'blur( 8px )',
    'minHeight': '44px',
    'display': 'flex',
    'flexDirection': 'row',
    'alignItems': 'center',
    'justifyContent': 'flex-end',
    '::before': {
      background:
        'linear-gradient(12deg, rgba(191,77,153,0) 0%, rgba(191,77,153,0.4) 100%)',
      content: "''",
      backdropFilter: 'blur( 8px )',
      WebkitBackdropFilter: 'blur( 8px )',
      position: 'absolute',
      inset: '0px',
      zIndex: '-1',
    },
  },
]);

export const GlassCard = style([
  {
    'background':
      'linear-gradient(112deg, rgba(255, 255, 255,0.2) 0%, rgba(255, 255, 255,0.0) 100%)',
    //background: "rgba( 255, 255, 255, 0.25 )",
    'boxShadow': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    'backdropFilter': 'blur( 18px )',
    'WebkitBackdropFilter': 'blur( 18px )',
    'borderRadius': '10px',
    'border': '1px solid rgba( 255, 255, 255, 0.68 )',
    '::before': {
      content: "''",
      backdropFilter: 'blur(12px )',
      WebkitBackdropFilter: 'blur(12px )',
      position: 'absolute',
      inset: '0px',
      zIndex: '-1',
    },
  },
]);

/*  '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, ) 0%, rgba(255, 255, 255, 0.5) 100%)',
                      backdropFilter: 'blur(4px)',
                      zIndex: -1,
                    }, */
export const GlassAvatar = style([
  {
    'width': '60px',
    'height': '60px',
    'borderRadius': '50%',
    'inset': 0,
    'position': 'relative',
    '::before': {
      background:
        'linear-gradient(112deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)',
      content: "''",
      borderRadius: '50%',
      position: 'absolute',
      inset: '0px',
      zIndex: '11',
    },
  },
]);
