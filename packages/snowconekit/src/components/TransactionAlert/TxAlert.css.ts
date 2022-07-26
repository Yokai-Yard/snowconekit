import { style } from '@vanilla-extract/css';

export const AlertBox = style([
  {
    position: 'absolute',
    padding: '16px',
    bottom: 0,
    right: 10,
    width: '300px',
    height: '55px',
    borderRadius: '8px',
  },
]);
export const TxContent = style([
  {
    display: 'flex',
    flexDirection: 'row',
  },
]);
