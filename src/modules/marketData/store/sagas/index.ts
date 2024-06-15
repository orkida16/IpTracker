import {all} from 'redux-saga/effects';
import sagaMarketDataScreen from './sagaMarketDataScreen.ts';

export default function* sagaMarket() {
  yield all([sagaMarketDataScreen()]);
}
