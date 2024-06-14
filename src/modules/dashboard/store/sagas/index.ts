import {all} from 'redux-saga/effects';
import sagaDashboardScreen from './sagaDashboardScreen.ts';

export default function* sagaHome() {
  yield all([sagaDashboardScreen()]);
}
