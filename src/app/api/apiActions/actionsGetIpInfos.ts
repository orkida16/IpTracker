import {createAction} from '@reduxjs/toolkit';

const TAG = '[Api - GetIpInfos]';

export const getAllRequest = createAction<void>(`${TAG}  Request`);
export const getAllSuccess = createAction<any>(`${TAG}  Success`);
export const getAllFailure = createAction<{reason: string}>(`${TAG}  Failure`);
export const getAllCancel = createAction<void>(`${TAG}  Cancel`);

const actionsGetIpInfos = {
  getAllRequest,
  getAllSuccess,
  getAllFailure,
  getAllCancel,
};

export default actionsGetIpInfos;
