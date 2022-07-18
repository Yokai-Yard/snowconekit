import { style } from '@vanilla-extract/css';

export const GlassCard = style([
  {
    'background':
      'linear-gradient(112deg, rgba(255, 255, 255,0.2) 0%, rgba(255, 255, 255,0.0) 100%)',
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
  left: 4,
  top: '48%',
  zIndex: 100,
  background: 'black',
  border: 'none',
  borderRadius: '50%',
  color: 'white',
  cursor: 'pointer',
  fontSize: '20px',
  height: 26,
  lineHeight: 1,
  width: 26,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const forwardBtn = {
  margin: '5px',
  opacity: '.6',
  position: 'absolute',
  right: 4,
  top: '48%',
  zIndex: 100,
  background: 'black',
  border: 'none',
  borderRadius: '50%',
  color: 'white',
  cursor: 'pointer',
  fontSize: '20px',
  height: 26,
  lineHeight: 1,
  width: 26,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const CarouselAvatar = style([
  {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: '25%',
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(120deg, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
  },
]);
