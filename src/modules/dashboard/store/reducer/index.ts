import {combineReducers} from '@reduxjs/toolkit';
import {
  default as dashboardReducer,
  TStateDashboard,
} from './reducerDashboardScreen';
import {PersistConfig} from 'redux-persist/es/types';
import {createMigrate, persistReducer} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

export type TStateDashboardConfigs = {
  dashboardRed: TStateDashboard;
};

interface TStateAllDashboardConfigurations {
  allDashboardConfigs: TStateDashboardConfigs;
}

export const dashboardCombinedReducer = combineReducers({
  dashboardRed: dashboardReducer,
});

export const getDashboard = (state: TStateDashboardConfigs) =>
  state.dashboardRed;
export const getAllDashboardConfigs = (
  state: TStateAllDashboardConfigurations,
) => state.allDashboardConfigs;

const dashboardConfigsReducerFactory = () => {
  const persistOnBoardingMigrate = createMigrate(
    {},
    {
      debug: false,
    },
  );
  const appConfigPersistConfig: PersistConfig<TStateDashboardConfigs> = {
    key: 'dashboard',
    storage: storage,
    whitelist: [''],
    transforms: [],
    migrate: persistOnBoardingMigrate,
  };

  return persistReducer<TStateDashboardConfigs>(
    appConfigPersistConfig,
    dashboardCombinedReducer,
  );
};
export default dashboardConfigsReducerFactory;
