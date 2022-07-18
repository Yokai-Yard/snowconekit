import { style } from '@vanilla-extract/css';

export const StatusBox = style([
  {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: '16px 16px 0 0',
    backgroundColor: 'white',
    width: '82%',
    bottom: 0,
    zIndex: 5,
  },
]);

export const BoxInfo = style([
  {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '280px',
    maxWidth: '280px',
    height: '100%',
    paddingInline: '20px',
  },
]);

export const PillContainer = style([
  {
    backgroundColor: 'rgba(209, 209, 209, 0.5)',
    height: '72px',
    width: '21px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
]);

export const CenterLine = style([
  {
    position: 'relative',
    top: 8,
    zIndex: 1,
    height: '50px',
    borderRight: '1px solid #A3A3A3',
  },
]);

export const TopCircle = style([
  {
    position: 'relative',
    top: -49,
    zIndex: 10,
    backgroundColor: 'rgb(16, 194, 10)',
    height: '9px',
    width: '9px',
    borderRadius: '50%',
  },
]);
export const MiddleCircle = style([
  {
    position: 'relative',
    top: -25,
    right: 0,
    zIndex: 10,
    height: '9px',
    width: '9px',
    borderRadius: '50%',
    margin: -10,
  },
]);
export const BottomCircle = style([
  {
    position: 'relative',
    top: 1,
    zIndex: 10,
    height: '9px',
    width: '9px',
    borderRadius: '50%',
  },
]);
