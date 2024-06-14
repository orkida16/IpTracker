import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
import {TUIBoxProps} from './types';
import {useAppTheme} from '../../../../theme/utils/useAppTheme.tsx';

const UIBox: FC<TUIBoxProps> = ({
  margin,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  marginVertical,
  marginHorizontal,
  padding,
  paddingBottom,
  paddingLeft,
  paddingVertical,
  paddingHorizontal,
  paddingRight,
  paddingTop,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderTopStartRadius,
  borderTopEndRadius,
  borderBottomStartRadius,
  borderBottomEndRadius,
  backgroundColor,
  borderColor,
  borderWidth,
  children,
  style,
  ...rest
}) => {
  const theme = useAppTheme();

  const appBoxStyle: ViewStyle = {
    margin: margin ? theme.spacings[margin] : undefined,
    marginLeft: marginLeft ? theme.spacings[marginLeft] : undefined,
    marginRight: marginRight ? theme.spacings[marginRight] : undefined,
    marginTop: marginTop ? theme.spacings[marginTop] : undefined,
    marginBottom: marginBottom ? theme.spacings[marginBottom] : undefined,
    marginHorizontal: marginHorizontal
      ? theme.spacings[marginHorizontal]
      : undefined,
    marginVertical: marginVertical ? theme.spacings[marginVertical] : undefined,
    padding: padding ? theme.spacings[padding] : undefined,
    paddingLeft: paddingLeft ? theme.spacings[paddingLeft] : undefined,
    paddingRight: paddingRight ? theme.spacings[paddingRight] : undefined,
    paddingTop: paddingTop ? theme.spacings[paddingTop] : undefined,
    paddingBottom: paddingBottom ? theme.spacings[paddingBottom] : undefined,
    paddingHorizontal: paddingHorizontal
      ? theme.spacings[paddingHorizontal]
      : undefined,
    paddingVertical: paddingVertical
      ? theme.spacings[paddingVertical]
      : undefined,
    borderRadius: borderRadius ? theme.borderRadii[borderRadius] : undefined,
    borderTopLeftRadius: borderTopLeftRadius
      ? theme.borderRadii[borderTopLeftRadius]
      : undefined,
    borderTopRightRadius: borderTopRightRadius
      ? theme.borderRadii[borderTopRightRadius]
      : undefined,
    borderBottomLeftRadius: borderBottomLeftRadius
      ? theme.borderRadii[borderBottomLeftRadius]
      : undefined,
    borderBottomRightRadius: borderBottomRightRadius
      ? theme.borderRadii[borderBottomRightRadius]
      : undefined,
    borderTopStartRadius: borderTopStartRadius
      ? theme.borderRadii[borderTopStartRadius]
      : undefined,
    borderTopEndRadius: borderTopEndRadius
      ? theme.borderRadii[borderTopEndRadius]
      : undefined,
    borderBottomStartRadius: borderBottomStartRadius
      ? theme.borderRadii[borderBottomStartRadius]
      : undefined,
    borderBottomEndRadius: borderBottomEndRadius
      ? theme.borderRadii[borderBottomEndRadius]
      : undefined,
    backgroundColor: backgroundColor
      ? theme.colors[theme.UIBox.colors[backgroundColor]]
      : theme.colors[theme.UIBox.colors.transparent],
    borderColor: borderColor
      ? theme.colors[theme.UIBox.colors[borderColor]]
      : undefined,
    borderWidth: borderWidth ?? undefined,
  };

  return (
    <View style={[appBoxStyle, style]} {...rest}>
      {children}
    </View>
  );
};

export default UIBox;
