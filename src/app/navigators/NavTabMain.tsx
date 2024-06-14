import React from 'react';
import ProfileScreen from '../../modules/profile/screens/ProfileScreen.tsx';
import MarketDataScreen from '../../modules/marketData/screens/MarketDataScreen.tsx';
import DashboardScreen from '../../modules/dashboard/screens/DashboardScreen.tsx';
import UINavigationTabBar from '../components/UI/UINavigationTabBar.tsx';
import {useStackNavigator, useBottomTabNavigator} from './hooks.ts';

// Each navStack would contain more than one screen related to its module
const NavStackProfile: React.FC = () => {
  const Stack = useStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerTitle: 'Profile',
      }}>
      <Stack.Screen
        name={'ProfileScreen'}
        component={ProfileScreen}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};
const NavStackMarketData: React.FC = () => {
  const Stack = useStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'MarketDataScreen'}
        component={MarketDataScreen}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

const NavStackDashboard: React.FC = () => {
  const Stack = useStackNavigator();
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Group>
        <Stack.Screen name={'DashboardScreen'} component={DashboardScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const NavTabMain: React.FC = () => {
  const BottomTab = useBottomTabNavigator();

  return (
    <BottomTab.Navigator
      tabBar={props => <UINavigationTabBar {...props} />}
      screenOptions={{
        unmountOnBlur: true,
        header: () => null,
      }}>
      <BottomTab.Screen name={'Dashboard'} component={NavStackDashboard} />
      <BottomTab.Screen
        name={'MarketData'}
        component={NavStackMarketData}
        options={{unmountOnBlur: true}}
      />
      <BottomTab.Screen
        name={'Profile'}
        component={NavStackProfile}
        options={{unmountOnBlur: true}}
      />
    </BottomTab.Navigator>
  );
};

export default NavTabMain;
