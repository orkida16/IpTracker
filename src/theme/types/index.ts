import {ColorValue, TextStyle} from 'react-native';

export type TFontName = string;

export interface TDictionary<T = any> {
  [key: string]: T;
}

export interface TFontFamily {
  light?: TFontName;
  regular?: TFontName;
  bold?: TFontName;
}

export interface TUITextRole
  extends Pick<TextStyle, 'letterSpacing' | 'lineHeight'> {
  /**
   * @default: false
   */
  underline: boolean;
  font: string;
  size: number;
}

export interface TBaseTheme<
  Fonts extends TDictionary<TFontFamily>,
  Colors extends TDictionary<ColorValue>,
  Spacings extends TDictionary<number>,
  BorderRadii extends TDictionary<number>,
  UITextRoles extends TDictionary<TUITextRole>,
  UITextColors extends TDictionary<keyof Colors>,
  UIBoxColors extends TDictionary<keyof Colors>,
> {
  fonts: Fonts;
  colors: Colors;
  spacings: Spacings;
  borderRadii: BorderRadii;
  UIText: {
    roles: UITextRoles;
    colors: UITextColors;
    weight: any;
  };
  UIBox: {
    colors: UIBoxColors;
  };
}
