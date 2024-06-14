import {call, cancelled, put} from '@redux-saga/core/effects';
import {SagaIterator} from '@redux-saga/types';

import {actionsGetIpInfos} from '../apiActions';
import {createApiCallCanceler} from '../../hooks/createApiCallCanceler';
import {getIpInfos} from '../apiCalls';
import {toTransformedIpInfo} from '../transformers/transformGetIpInfos.ts';

export function* workerGetIpInfos(ipAddress: string): SagaIterator {
  const {cancel} = createApiCallCanceler();
  try {
    yield put(actionsGetIpInfos.getAllRequest());
    const data = yield call(getIpInfos, ipAddress);
    if (data.success) {
      let transformedData = toTransformedIpInfo(data);
      yield put(actionsGetIpInfos.getAllSuccess(transformedData));
    } else {
      yield put(actionsGetIpInfos.getAllFailure({reason: data.message}));
    }
  } catch (e) {
    yield put(
      actionsGetIpInfos.getAllFailure({reason: 'Something went wrong'}),
    );
    console.log('error getting All: ', e);
  } finally {
    if (yield cancelled()) {
      // the task was cancelled
      cancel(); // now canceling http request
      yield put(actionsGetIpInfos.getAllCancel());
    }
  }
}
