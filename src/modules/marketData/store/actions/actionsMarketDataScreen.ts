import {createAction} from '@reduxjs/toolkit';

const TAG = '[MarketDataScreen]';

const landing = createAction<void>(`${TAG} landing`);
const dismiss = createAction<void>(`${TAG} dismiss`);
const onGetWebsocketDataSuccess = createAction<{
  price: number;
  quantity: number;
  timestamp: string;
}>(`${TAG} onGetWebsocketDataSuccess`);

const actionsMarketDataScreen = {
  landing,
  dismiss,
  onGetWebsocketDataSuccess,
};

export default actionsMarketDataScreen;
