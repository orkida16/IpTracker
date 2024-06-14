import React, {FC} from 'react';
import {ColorValue, Image, StyleSheet, ViewStyle} from 'react-native';
import {UIBox} from '../UIBox';
import {UIText} from '../UIText';
import {useAppTheme} from '../../../../theme/utils/useAppTheme';
import {IconHomeProfile} from '../../icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface UIMainHeaderProps {
  title: string;
  color: ColorValue;
  style?: ViewStyle;
  url?: string;
}

const UIMainHeader: FC<UIMainHeaderProps> = ({title, style, color, url}) => {
  const theme = useAppTheme();
  const {top} = useSafeAreaInsets();
  const mainHeaderStyle: ViewStyle = {
    backgroundColor: color,
    paddingVertical: theme.spacings.XXL,
    paddingHorizontal: theme.spacings.M,
    paddingTop: top + theme.spacings.S,
  };

  return (
    <UIBox style={[mainHeaderStyle, style, styles.container]}>
      <UIText textRole={'Title2'}>{title}</UIText>
      {url ? (
        <Image
          source={{uri: url}}
          style={{width: 50, aspectRatio: 1, borderRadius: 25}}
        />
      ) : (
        <IconHomeProfile width={50} />
      )}
    </UIBox>
  );
};
export default UIMainHeader;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
