import {all, race, take, takeLeading} from 'redux-saga/effects';
import {SagaIterator} from '@redux-saga/types';
import {actionsMarketDataScreen} from '../actions';
function* workerMarketDataScreen(): SagaIterator {
  try {
    while (true) {
      const {dismiss} = yield race({
        dismiss: take(actionsMarketDataScreen.dismiss),
      });
      if (dismiss) {
        return;
      }
    }
  } catch (e) {
    console.log('Error in watchMarketDataScreenActions');
    console.error(e);
  }
}

function* watchMarketDataScreen() {
  yield takeLeading(actionsMarketDataScreen.landing, workerMarketDataScreen);
}

/* endregion:  WATCHERS */

export default function* () {
  yield all([watchMarketDataScreen()]);
}
