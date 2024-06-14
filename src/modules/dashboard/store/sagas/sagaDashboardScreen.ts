import {
  all,
  race,
  take,
  takeLeading,
  fork,
  select,
  cancel,
} from 'redux-saga/effects';
import {SagaIterator} from '@redux-saga/types';
import {actionsDashboardScreen} from '../actions';
import {navigate} from '../../../../app/utils/navigation';
import {workerGetIpInfos} from '../../../../app/api/apiSaga/sagaGetIpInfos';
import {selectInfos, selectMyIp} from '../selectors/dashboardSelectors';
import {workerGetUserIp} from '../../../../app/api/apiSaga/sagaGetUserIp.ts';
import {actionsGetUserIp} from '../../../../app/api/apiActions';

function* workerDashboardScreen(): SagaIterator {
  try {
    let getUserIpRef = yield fork(workerGetUserIp);
    while (true) {
      const {
        onAddButtonPress,
        dismiss,
        onGetIpAddressSuccess,
        onGetUserIpSuccess,
      } = yield race({
        onAddButtonPress: take(actionsDashboardScreen.onAddButtonPress),
        onGetIpAddressSuccess: take(
          actionsDashboardScreen.onGetIpAddressSuccess,
        ),
        dismiss: take(actionsDashboardScreen.dismiss),
        onGetUserIpSuccess: take(actionsGetUserIp.getUserIpSuccess),
      });

      if (onAddButtonPress) {
        navigate('Profile');
      } else if (onGetUserIpSuccess) {
        let ipAddress = yield select(selectMyIp);
        yield fork(workerGetIpInfos, ipAddress);
      } else if (onGetIpAddressSuccess) {
        yield fork(workerGetIpInfos, onGetIpAddressSuccess.payload.ipAddress);
      } else if (dismiss) {
        if (getUserIpRef) {
          yield cancel(getUserIpRef);
        }
        return;
      }
    }
  } catch (e) {
    console.log('Error in watchDashboardScreenActions');
    console.error(e);
  }
}

function* watchDashboardScreen() {
  yield takeLeading(actionsDashboardScreen.landing, workerDashboardScreen);
}

/* endregion:  WATCHERS */

export default function* () {
  yield all([watchDashboardScreen()]);
}
