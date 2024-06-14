import {call, cancelled, put} from '@redux-saga/core/effects';
import {SagaIterator} from '@redux-saga/types';
import {actionsGetUserIp} from '../apiActions';
import {createApiCallCanceler} from '../../hooks/createApiCallCanceler';
import {getUserIp} from '../apiCalls';

export function* workerGetUserIp(): SagaIterator {
  const {cancel} = createApiCallCanceler();
  try {
    yield put(actionsGetUserIp.getUserIpRequest());
    const data = yield call(getUserIp);
    if (data.ip) {
      yield put(actionsGetUserIp.getUserIpSuccess({ip: data.ip}));
    } else {
      yield put(actionsGetUserIp.getUserIpFailure());
    }
  } catch (e) {
    yield put(actionsGetUserIp.getUserIpFailure());
    console.log('error getting User ip: ', e);
  } finally {
    if (yield cancelled()) {
      // the task was cancelled
      cancel(); // now canceling http request
      yield put(actionsGetUserIp.getUserIpCancel());
    }
  }
}
