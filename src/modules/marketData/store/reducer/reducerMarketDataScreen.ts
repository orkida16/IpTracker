import {createReducer} from '@reduxjs/toolkit';
import {actionsMarketDataScreen} from '../actions';

export interface TStateMarketData {
  price: number | null;
  quantity: number | null;
  timestamp: string | null;
  priceData: any;
}

const INITIAL_STATE: TStateMarketData = {
  price: null,
  quantity: null,
  timestamp: null,
  priceData: [],
};

export default createReducer<TStateMarketData>(INITIAL_STATE, builder => {
  builder
    .addCase(
      actionsMarketDataScreen.onGetWebsocketDataSuccess,
      (state, action) => {
        state.price = action.payload.price;
        state.quantity = action.payload.quantity;
        state.timestamp = action.payload.timestamp;
        state.priceData =
          state.priceData.length > 20
            ? [...state.priceData.slice(1), action.payload.price]
            : [...state.priceData, action.payload.price];
      },
    )
    .addCase(actionsMarketDataScreen.dismiss, state => {
      state.price = null;
      state.quantity = null;
      state.timestamp = null;
      state.priceData = [];
    });
});

export const getPrice = (state: TStateMarketData) => state.price;
export const getQuantity = (state: TStateMarketData) => state.quantity;
export const getTimestamp = (state: TStateMarketData) => state.timestamp;
export const getPriceData = (state: TStateMarketData) => state.priceData;
