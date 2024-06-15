import createSagaMiddleware from 'redux-saga';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
import {persistStore} from 'redux-persist';
import rootSaga from './rootSaga';
import dashboardConfigsReducerFactory from '../modules/dashboard/store/reducer';
import marketDataConfigsReducerFactory from '../modules/marketData/store/reducer';

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const reducer = combineReducers({
    ...rootReducer,
    allDashboardConfigs: dashboardConfigsReducerFactory(),
    allMarketDataConfigs: marketDataConfigsReducerFactory(),
  });
  const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        immutableCheck: true,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        thunk: false,
      }).concat(sagaMiddleware);
    },
  });

  let persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return {configuredStore: store, configuredPersistor: persistor};
};
