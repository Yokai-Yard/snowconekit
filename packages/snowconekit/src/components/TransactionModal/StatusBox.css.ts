import { style } from '@vanilla-extract/css';

export const StatusBox = style([
  {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'column',
    borderRadius: '16px 16px 0 0',
    backgroundColor: 'white',
    height: '120px',
    width: '82%',
    bottom: 0,
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
