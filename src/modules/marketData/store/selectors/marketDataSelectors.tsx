import {createSelector} from '@reduxjs/toolkit';
import {getAllMarketDataConfigs, getMarketData} from '../reducer';
import {
  getPrice, getPriceData,
  getQuantity,
  getTimestamp
} from "../reducer/reducerMarketDataScreen";

export const selectAllMarketDataConfigs = createSelector(
  getAllMarketDataConfigs,
  getMarketData,
);

export const selectPriceData = createSelector(selectAllMarketDataConfigs, getPriceData);
export const selectPrice = createSelector(selectAllMarketDataConfigs, getPrice);
export const selectQuantity = createSelector(
  selectAllMarketDataConfigs,
  getQuantity,
);

export const selectTimestamp = createSelector(
  selectAllMarketDataConfigs,
  getTimestamp,
);
