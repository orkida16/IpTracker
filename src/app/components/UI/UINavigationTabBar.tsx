import React from 'react';
import {
  ColorValue,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IconDashboard, IconHomeProfile, IconList} from '../icons';
import {UIText} from './UIText';
import {COLORS} from '../../../theme/colors.ts';

interface UITabBarProps extends BottomTabBarProps {}
type TTabNames = 'Dashboard' | 'MarketData' | 'Profile';
const tabList: TTabNames[] = ['Dashboard', 'MarketData', 'Profile'];

const UINavigationTabBar: React.FC<UITabBarProps> = ({state, navigation}) => {
  const {bottom, left, right} = useSafeAreaInsets();
  const {width} = Dimensions.get('screen');
  const tabWidth = (width - left - right) / tabList.length;

  const styleTabBar: ViewStyle = {
    left: left,
    right: right,
    paddingBottom: bottom || 20,
    paddingTop: 10,
    backgroundColor: 'white',
    borderTopColor: 'white',
    borderTopWidth: 1,
  };

  const tabStyle: ViewStyle = {
    width: tabWidth,
  };

  const renderComponent = (
    tabName: TTabNames,
    color: ColorValue,
  ): JSX.Element | null => {
    switch (tabName) {
      case 'Dashboard':
        return <IconDashboard color={color} style={styles.icons} />;
      case 'MarketData':
        return <IconList color={color} style={styles.icons} />;

      case 'Profile':
        return <IconHomeProfile color={color} style={styles.icons} />;
      default:
        return null;
    }
  };

  const renderComponentTitle = (tabName: TTabNames): string => {
    switch (tabName) {
      case 'Dashboard':
        return 'Dashboard';
      case 'MarketData':
        return 'Market Data';
      case 'Profile':
        return 'Profile';
      default:
        return '';
    }
  };

  return (
    <View style={[styles.container, styleTabBar]}>
      {tabList.map(tab => {
        const route = state.routes.find(r => r.name === tab);
        const index = state.routes.findIndex(r => r.name === tab);
        if (route) {
          const isFocused = state.index === index;
          const iconColor = isFocused ? COLORS.BASE_BLUE : COLORS.BASE_BLACK;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <Pressable
              key={route.name}
              onPress={onPress}
              style={{alignItems: 'center'}}>
              <View style={[styles.element, tabStyle]}>
                {renderComponent(tab, iconColor)}
              </View>
              <UIText
                textRole={'Body14'}
                textWeight={'bold'}
                color={isFocused ? 'blue' : 'variant2'}
                style={{textTransform: 'uppercase', paddingTop: 6}}>
                {renderComponentTitle(tab)}
              </UIText>
            </Pressable>
          );
        } else {
          console.error(`Missing route ${tab}`);
          return null;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  element: {
    alignItems: 'center',
  },
  icons: {},
});
export default UINavigationTabBar;
