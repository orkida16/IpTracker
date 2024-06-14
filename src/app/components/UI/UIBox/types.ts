import {ViewProps} from 'react-native';
import {SPACINGS} from '../../../../theme/spacings.ts';
import {BORDER_RADIUS} from '../../../../theme/border_radius.ts';
import {TBaseThemeColors} from '../../../../theme/types/TAppColors.ts';

export type TUIBocColorValue = 'variant1' | 'variant2' | 'variant3';
export type TUIBoxColors = Record<TUIBocColorValue, keyof TBaseThemeColors>;

export interface TUIBox {
  colors: TUIBoxColors;
}

export interface TUIBoxProps extends ViewProps {
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
  borderRadius?: keyof typeof BORDER_RADIUS;
  borderTopLeftRadius?: keyof typeof SPACINGS;
  borderTopRightRadius?: keyof typeof SPACINGS;
  borderBottomLeftRadius?: keyof typeof SPACINGS;
  borderBottomRightRadius?: keyof typeof SPACINGS;
  borderTopStartRadius?: keyof typeof SPACINGS;
  borderTopEndRadius?: keyof typeof SPACINGS;
  borderBottomStartRadius?: keyof typeof SPACINGS;
  borderBottomEndRadius?: keyof typeof SPACINGS;
  backgroundColor?: TUIBocColorValue;
  borderColor?: TUIBocColorValue;
  borderWidth?: number;
}
