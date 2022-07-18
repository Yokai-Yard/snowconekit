import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const DropdownIcon = sprinkles({
  marginLeft: '6',
});

export const ModalList = style([
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    paddingBottom: '2px',
    paddingTop: '16px',
    backgroundColor: 'white',
    borderRadius: '16px 16px 0 0',
  },
]);

export const ExplorerLink = style([
  {
    alignSelf: 'center',
    backgroundColor: 'white',
    height: '62px',
  },
]);

export const ExternalLink = style([{ transform: 'rotate(230deg)' }]);

export const Time = style([
  {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'right',
    opacity: 0.65,
  },
]);

export const Badge = style([
  {
    display: 'flex',
    position: 'absolute',
    bottom: -4,
    right: -5,
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '2px 2px 3px  rgba(0, 0, 0, 0.3)',
  },
]);

export const Avatar = style([
  {
    position: 'relative',
    width: 40,
    height: 34,
    borderRadius: '50%',
    border: '3px solid white',
    boxShadow: '3px 3px 4px  rgba(0, 0, 0, 0.3)',
    bottom: '9%',
  },
]);

export const BadgeImage = style([
  {
    paddingTop: '2px',
    paddingLeft: '2px',
    width: '10px',
    height: '10px',
  },
]);
