import {combineReducers} from '@reduxjs/toolkit';
import {
  default as marketDataReducer,
  TStateMarketData,
} from './reducerMarketDataScreen';
import {createMigrate, persistReducer} from 'redux-persist';
import {PersistConfig} from 'redux-persist/es/types';
import storage from '@react-native-async-storage/async-storage';

export type TStateMarketDataConfigs = {
  marketDataRed: TStateMarketData;
};

interface TStateAllMarketDataConfigurations {
  allMarketDataConfigs: TStateMarketDataConfigs;
}

export const marketDataCombinedReducer = combineReducers({
  marketDataRed: marketDataReducer,
});

export const getMarketData = (state: TStateMarketDataConfigs) =>
  state.marketDataRed;
export const getAllMarketDataConfigs = (
  state: TStateAllMarketDataConfigurations,
) => state.allMarketDataConfigs;

const marketDataConfigsReducerFactory = () => {
  const persistOnBoardingMigrate = createMigrate(
    {},
    {
      debug: false,
    },
  );
  const appConfigPersistConfig: PersistConfig<TStateMarketDataConfigs> = {
    key: 'marketData',
    storage: storage,
    whitelist: [''],
    transforms: [],
    migrate: persistOnBoardingMigrate,
  };

  return persistReducer<TStateMarketDataConfigs>(
    appConfigPersistConfig,
    marketDataCombinedReducer,
  );
};
export default marketDataConfigsReducerFactory;
