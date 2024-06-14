import {useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export const useStackNavigator = <
  ParamList extends Record<string, object | undefined>,
>() => useMemo(() => createNativeStackNavigator<ParamList>(), []);

export const useBottomTabNavigator = <
  ParamList extends Record<string, object | undefined>,
>() => useMemo(() => createBottomTabNavigator<ParamList>(), []);
