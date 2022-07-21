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
        'linear-gradient(12deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.2) 100%)',
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
      'linear-gradient(112deg, rgba(0, 0, 0,0.2) 0%, rgba(0, 0, 0,0.0) 100%)',
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
    'overflow': 'hidden',
    'marginTop': '13px',
  },
]);

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

export const NetworkSwitchAlert = style([
  {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgb(256,244,226)',
    marginTop: '18px',
    borderRadius: '8px',
    padding: '16px',
  },
]);

export const ConnectedToAvatar = style([
  {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    border: '3px solid white',
    boxShadow: '2px 2px 4px 2px  rgba(0, 0, 0, 0.3)',
  },
]);
