import { globalFontFace, globalStyle } from '@vanilla-extract/css';

import { vars } from './vars.css';

globalFontFace('CircularStd', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 400,
  src: "url('/fonts/CircularStd-Book.otf') format('opentype')",
});

globalFontFace('CircularStd', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 500,
  src: "url('/fonts/CircularStd-Book.otf') format('opentype')",
});

globalFontFace('CircularStd', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 600,
  src: "url('/fonts/CircularStd-Medium.otf') format('opentype')",
});

globalFontFace('CircularStd', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 700,
  src: "url('/fonts/CircularStd-Bold.otf') format('opentype')",
});

globalFontFace('CircularStd', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 800,
  src: "url('/fonts/CircularStd-Bold.otf') format('opentype')",
});

globalFontFace('CircularStd', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 800,
  src: "url('/fonts/CircularStd-Bold.otf') format('opentype')",
});

globalStyle('*, ::before, ::after', {
  boxSizing: 'border-box',
});

globalStyle('::selection', {
  backgroundColor: 'var(--selectionColor)',
  color: vars.colors.labelWhite,
  WebkitTextFillColor: vars.colors.labelWhite,
});

globalStyle('body', {
  backgroundColor: vars.colors.backgroundElevated,
  color: vars.colors.label,
  fontFamily:
    'CircularStd, system-ui, Helvetica Neue, Arial, Helvetica, sans-serif',
  fontSize: '100%',
  letterSpacing: 0.35,
  margin: 0,
});

globalStyle('code, pre', {
  fontFamily: 'CircularStd, ui-monospace, monospace',
  fontWeight: 400,
  MozOsxFontSmoothing: 'subpixel-antialiased',
  WebkitFontSmoothing: 'subpixel-antialiased',
});

globalStyle('button', {
  appearance: 'none',
  background: 'transparent',
});

globalStyle('svg', {
  verticalAlign: 'middle',
});

globalStyle('[data-emoji]', {
  fontFamily: 'system-ui',
  fontWeight: 400,
});
