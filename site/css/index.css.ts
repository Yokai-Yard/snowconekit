import { style } from '@vanilla-extract/css';

export const container = style([
  {
    backdropFilter: 'blur(50px)',
    background: 'rgba(255, 255, 255, 0.01)',
    borderColor: 'linear-gradient(#FFFFFFAC 0%, #ffffff 100%))',
    borderRadius: '8px',
    borderWidth: '2px',
    margin: '0 auto',
    maxWidth: '1600px',
    minHeight: '100vh',
    overflow: 'hidden',
  },
]);

export const codeBoxPosition = style([
  {
    backgroundColor: '#293A50',
    borderColor: 'linear-gradient(rgba(255, 255, 255, 1) 0%, #ffffff 100%))',
    borderRadius: '8px 0 0 8px',
    borderWidth: '2px',
    overflow: 'hidden',
    paddingBottom: '50px',
  },
]);

export const codeBoxBorder = style([
  {
    backgroundColor: '#36465b',
    height: '40px',
    padding: '15px 20px',
  },
]);

export const codeBoxNav = style([
  {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    justifyContent: 'flex-start',
  },
]);

export const redDot = style([
  {
    backgroundColor: '#ff6680',
    borderRadius: '50px',
    height: '10px',
    width: '10px',
  },
]);
export const yellowDot = style([
  {
    backgroundColor: '#ffca95',
    borderRadius: '50px',
    height: '10px',
    width: '10px',
  },
]);
export const greenDot = style([
  {
    backgroundColor: '#66ff99',
    borderRadius: '50px',
    height: '10px',
    width: '10px',
  },
]);
export const madeForDevs = style([
  {
    display: 'block',
    fontSize: '4',
    marginTop: 'auto',
    paddingLeft: '40px',
    paddingTop: '50px',
  },
]);
