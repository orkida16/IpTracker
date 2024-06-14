import React, {FC} from 'react';
import {TextStyle, Text} from 'react-native';
import {TUITextProps} from './types';
import {useAppTheme} from '../../../../theme/utils/useAppTheme.tsx';

const UIText: FC<TUITextProps> = ({
  textRole = 'Title1',
  textWeight = 'regular',
  color = 'variant1',
  style,
  align,
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
  children,
  ...rest
}) => {
  const theme = useAppTheme();
  const textColor = theme.colors[theme.UIText.colors[color]];
  const textRoleConfig = theme.UIText.roles[textRole];
  const textWeightConfig = theme.UIText.weight[textWeight];
  const textColorStyle: TextStyle = {
    fontFamily: textRoleConfig.font,
    fontSize: textRoleConfig.size,
    lineHeight: textRoleConfig.lineHeight,
    letterSpacing: textRoleConfig.letterSpacing,
    fontWeight: textWeightConfig,
    color: textColor,
    textAlign: align,
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
  };

  return (
    <Text style={[textColorStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

export default UIText;
