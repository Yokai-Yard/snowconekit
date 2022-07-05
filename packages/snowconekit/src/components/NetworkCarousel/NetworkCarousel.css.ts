import { style } from '@vanilla-extract/css';

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

export const carousel = style({
  overflow: 'hidden',
  borderRadius: '8px',
  boxShadow:
    '0px 5px 5px -3px rgb(145 158 171 / 20%), 0px 8px 10px 1px rgb(145 158 171 / 14%), 0px 3px 14px 2px rgb(145 158 171 / 12%)',
  marginTop: '13px',
});

export const backBtn = {
  margin: '5px',
  opacity: '.6',
  position: 'absolute',
  left: 8,
  top: '48%',
  zIndex: 100,
  // alignSelf: 'center',
  background: 'black',
  border: 'none',
  borderRadius: '50%',
  color: 'white',
  cursor: 'pointer',
  fontSize: '20px',
  height: 26,
  lineHeight: 1,
  // textAlign: 'center',
  width: 26,
};

export const forwardBtn = {
  margin: '5px',
  opacity: '.6',
  position: 'absolute',
  right: 8,
  top: '48%',
  zIndex: 100,
  // alignSelf: 'center',
  background: 'black',
  border: 'none',
  borderRadius: '50%',
  color: 'white',
  cursor: 'pointer',
  fontSize: '20px',
  height: 26,
  lineHeight: 1,
  // textAlign: 'center',
  width: 26,
};
