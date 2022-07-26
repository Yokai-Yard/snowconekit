import {
  AccentColor,
  AccentColorPreset,
  baseTheme,
  ThemeOptions,
} from './baseTheme';

const darkGrey = '#1A1B1F';

const accentColors: Record<AccentColorPreset, AccentColor> = {
  blue: {
    accentColorName: 'blue',
    accentColor: '#667fff',
    accentColorForeground: '#FFF',
  },
  green: {
    accentColorName: 'green',
    accentColor: '#66ff99',
    accentColorForeground: darkGrey,
  },
  orange: {
    accentColorName: 'orange',
    accentColor: '#ff9966',
    accentColorForeground: darkGrey,
  },
  pink: {
    accentColorName: 'pink',
    accentColor: '#ff66cc',
    accentColorForeground: '#FFF',
  },
  purple: {
    accentColorName: 'purple',
    accentColor: '#8cabcf',
    accentColorForeground: '#FFF',
  },
  red: {
    accentColorName: 'red',
    accentColor: '#ff6680',
    accentColorForeground: '#FFF',
  },
};

const defaultAccentColor = accentColors.pink;

export const darkTheme = ({
  accentColorName = defaultAccentColor.accentColorName,
  accentColor = defaultAccentColor.accentColor,
  accentColorForeground = defaultAccentColor.accentColorForeground,
  ...baseThemeOptions
}: ThemeOptions = {}) => ({
  ...baseTheme(baseThemeOptions),
  colors: {
    accentColorName,
    accentColor,
    accentColorForeground,
    actionButtonBorder: 'rgba(255, 255, 255, 0.04)',
    actionButtonBorderMobile: 'rgba(255, 255, 255, 0.08)',
    actionButtonSecondaryBackground: 'rgba(255, 255, 255, 0.08)',
    closeButton: 'rgba(224, 232, 255, 0.6)',
    closeButtonBackground: 'rgba(255, 255, 255, 0.08)',
    connectButtonBackground: darkGrey,
    connectButtonBackgroundError: '#FF494A',
    connectButtonInnerBackground:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.15))',
    connectButtonText: '#FFF',
    connectButtonTextError: '#FFF',
    connectionIndicator: '#30E000',
    error: '#FF494A',
    generalBorder: 'rgba(255, 255, 255, 0.08)',
    generalBorderDim: 'rgba(255, 255, 255, 0.04)',
    menuItemBackground: 'rgba(224, 232, 255, 0.1)',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBackground: '#1A1B1F',
    modalBorder: 'rgba(255, 255, 255, 0.08)',
    modalText: '#FFF',
    modalTextDim: 'rgba(224, 232, 255, 0.3)',
    modalTextSecondary: 'rgba(255, 255, 255, 0.6)',
    profileAction: 'rgba(224, 232, 255, 0.1)',
    profileActionHover: 'rgba(224, 232, 255, 0.2)',
    profileForeground: 'rgba(224, 232, 255, 0.05)',
    selectedOptionBorder: 'rgba(224, 232, 255, 0.1)',
    standby: '#FFD641',
  },
  shadows: {
    connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
    profileDetailsAction: '0px 2px 6px rgba(37, 41, 46, 0.04)',
    selectedOption: '0px 2px 6px rgba(0, 0, 0, 0.24)',
    selectedWallet: '0px 2px 6px rgba(0, 0, 0, 0.24)',
    walletLogo: '0px 2px 16px rgba(0, 0, 0, 0.16)',
  },
});

darkTheme.accentColors = accentColors;
