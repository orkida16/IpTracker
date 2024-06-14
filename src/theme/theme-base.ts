import {FONTS} from './fonts';
import {Platform} from 'react-native';
import {COLORS} from './colors.ts';
import {SPACINGS} from './spacings.ts';
import {BORDER_RADIUS} from './border_radius.ts';
import {TUIText} from '../app/components/UI/UIText/types.ts';
import {TUIBox} from '../app/components/UI/UIBox/types.ts';

export const UIText: TUIText = {
  colors: {
    variant1: 'BASE_WHITE',
    variant2: 'BASE_PRIMARY',
    variant3: 'BASE_DEEP_GREEN',
    variant4: 'BASE_GREEN',
    black_primary: 'BASE_PRIMARY',
    black: 'BASE_BLACK',
    blue: 'BASE_BLUE',
    grey1: 'BASE_GREY1',
    grey2: 'BASE_GREY2',
    red: 'BASE_RED',
    bright_teal: 'BASE_BRIGHT_TEAL',
    bright_lilac: 'BASE_BRIGHT_LILAC',
    brown: 'BASE_BROWN',
  },
  roles: {
    Title1: {
      font: FONTS.Default,
      letterSpacing: 0,
      lineHeight: 42,
      size: 36,
    },
    Title2: {
      font: FONTS.Default,
      letterSpacing: 0,
      lineHeight: 34,
      size: 28,
    },
    Title3: {
      font: FONTS.Default,
      letterSpacing: 0,
      lineHeight: 30,
      size: 24,
    },
    Title4: {
      font: FONTS.Default,
      letterSpacing: 0,
      lineHeight: 26,
      size: 20,
    },
    Title5: {
      font: FONTS.Default,
      letterSpacing: 0,
      lineHeight: 22,
      size: 16,
    },
    Title6: {
      font: FONTS.Default,
      letterSpacing: 0,
      lineHeight: 20,
      size: 14,
    },
    Title7: {
      font: FONTS.Default,
      letterSpacing: 0,
      lineHeight: 16,
      size: 12,
    },
    Body16: {
      font: FONTS.Default,
      letterSpacing: 0,
      lineHeight: 22,
      size: 16,
    },
    Body14: {
      font: FONTS.Default,
      letterSpacing: 0,
      lineHeight: 20,
      size: 14,
    },
    Body12: {
      font: FONTS.Default,
      letterSpacing: 0,
      lineHeight: 16,
      size: 12,
    },
    Subtitle: {
      font: FONTS.Default,
      letterSpacing: 0,
      lineHeight: 16,
      size: 10,
    },
  },
  weight: {
    light: Platform.OS === 'ios' ? '300' : '400',
    regular: Platform.OS === 'ios' ? '500' : '700',
    bold: Platform.OS === 'ios' ? '700' : '900',
  },
} as const;

export const UIBox: TUIBox = {
  colors: {
    variant1: 'BASE_BLACK',
    variant2: 'BASE_WHITE',
    variant3: 'BASE_GREEN',
  },
};

export const THEME = {
  colors: COLORS,
  spacings: SPACINGS,
  fonts: FONTS,
  borderRadii: BORDER_RADIUS,
  UIText,
  UIBox,
};
