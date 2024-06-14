import {TBaseThemeColors} from '../../../../theme/types/TAppColors.ts';
import {TextProps, TextStyle} from 'react-native';
import {SPACINGS} from '../../../../theme/spacings.ts';

export type TUITextRole =
  | 'Title1'
  | 'Title2'
  | 'Title3'
  | 'Title4'
  | 'Title5'
  | 'Title6'
  | 'Title7'
  | 'Body16'
  | 'Body14'
  | 'Body12'
  | 'Subtitle';

export type TUITextColorValue =
  | 'variant1'
  | 'variant2'
  | 'variant3'
  | 'variant4'
  | 'black_primary'
  | 'black'
  | 'blue'
  | 'grey1'
  | 'grey2'
  | 'red'
  | 'brown'
  | 'bright_lilac'
  | 'bright_teal';

export type TUITextWeight = 'regular' | 'light' | 'bold';

interface TUITextRoleConfig {
  font: string;
  lineHeight: number;
  size: number;
  letterSpacing?: number;
}
export type TUITextRoles = Record<TUITextRole, TUITextRoleConfig>;
export type TUITextWeightValue = Record<TUITextWeight, string>;

export type TUITextColors = Record<TUITextColorValue, keyof TBaseThemeColors>;

export interface TUIText {
  colors: TUITextColors;
  roles: TUITextRoles;
  weight: TUITextWeightValue;
}

export interface TUITextProps extends TextProps {
  textRole?: TUITextRole;
  textWeight?: TUITextWeight;
  color?: TUITextColorValue;
  align?: TextStyle['textAlign'];
  margin?: keyof typeof SPACINGS;
  marginLeft?: keyof typeof SPACINGS;
  marginRight?: keyof typeof SPACINGS;
  marginTop?: keyof typeof SPACINGS;
  marginBottom?: keyof typeof SPACINGS;
  marginHorizontal?: keyof typeof SPACINGS;
  marginVertical?: keyof typeof SPACINGS;
  padding?: keyof typeof SPACINGS;
  paddingLeft?: keyof typeof SPACINGS;
  paddingRight?: keyof typeof SPACINGS;
  paddingTop?: keyof typeof SPACINGS;
  paddingBottom?: keyof typeof SPACINGS;
  paddingHorizontal?: keyof typeof SPACINGS;
  paddingVertical?: keyof typeof SPACINGS;
}
