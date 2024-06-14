import {createAction} from '@reduxjs/toolkit';

const TAG = '[DashboardScreen]';

const landing = createAction<void>(`${TAG} landing`);
const dismiss = createAction<void>(`${TAG} dismiss`);
const onGetIpAddressSuccess = createAction<{
  ipAddress: string;
}>(`${TAG} onGetIpAddressSuccess`);
const onAddButtonPress = createAction<{imageUrl: string}>(
  `${TAG} onAddButtonPress`,
);

const actionsDashboardScreen = {
  landing,
  dismiss,
  onAddButtonPress,
  onGetIpAddressSuccess,
};

export default actionsDashboardScreen;
