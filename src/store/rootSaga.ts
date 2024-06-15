import {all, call} from 'redux-saga/effects';
import sagaDashboardScreen from '../modules/dashboard/store/sagas/sagaDashboardScreen.ts';
import sagaMarketDataScreen from '../modules/marketData/store/sagas/sagaMarketDataScreen.ts';

function* logReduxSagaInitialized() {
  yield call([console, 'log'], 'redux-sagas is READY to Rock!');
}

export default function* rootSaga() {
  yield all([
    logReduxSagaInitialized(),
    sagaDashboardScreen(),
    sagaMarketDataScreen(),
  ]);
}
