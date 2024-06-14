import {createAction} from '@reduxjs/toolkit';

const TAG = '[Api - GetUserIp]';

export const getUserIpRequest = createAction<void>(`${TAG}  Request`);
export const getUserIpSuccess = createAction<{ip: string}>(`${TAG}  Success`);
export const getUserIpFailure = createAction<void>(`${TAG}  Failure`);
export const getUserIpCancel = createAction<void>(`${TAG}  Cancel`);

const actionsGetIpInfos = {
  getUserIpRequest,
  getUserIpSuccess,
  getUserIpFailure,
  getUserIpCancel,
};

export default actionsGetIpInfos;
