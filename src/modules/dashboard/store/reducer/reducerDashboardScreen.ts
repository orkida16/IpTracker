import {createReducer} from '@reduxjs/toolkit';
import {
  actionsGetIpInfos,
  actionsGetUserIp,
} from '../../../../app/api/apiActions';
import {TTransformedIpInfo} from '../../../../app/api/types/shared.ts';
import {actionsDashboardScreen} from '../actions';

export interface TStateDashboard {
  loading: boolean;
  infos: TTransformedIpInfo | null;
  error: string | null;
  selectedImage: string | null;
  myIp: string | null;
  loadingIp: boolean;
  errorIp: boolean;
}

const INITIAL_STATE: TStateDashboard = {
  loading: false,
  infos: null,
  error: null,
  selectedImage: null,
  myIp: null,
  loadingIp: false,
  errorIp: false,
};

export default createReducer<TStateDashboard>(INITIAL_STATE, builder => {
  builder
    .addCase(actionsGetUserIp.getUserIpRequest, state => {
      state.loadingIp = true;
      state.errorIp = false;
      state.myIp = null;
    })
    .addCase(actionsGetUserIp.getUserIpSuccess, (state, action) => {
      state.loadingIp = false;
      state.error = null;
      state.myIp = action.payload.ip;
    })
    .addCase(actionsGetUserIp.getUserIpFailure, (state, action) => {
      state.loadingIp = false;
      state.errorIp = true;
      state.myIp = null;
    })
    .addCase(actionsGetUserIp.getUserIpCancel, state => {
      state.loadingIp = false;
      state.errorIp = false;
      state.myIp = null;
    })
    .addCase(actionsDashboardScreen.onGetIpAddressSuccess, (state, action) => {
      state.myIp = action.payload.ipAddress;
    })
    .addCase(actionsGetIpInfos.getAllRequest, state => {
      state.loading = true;
      state.error = null;
      state.infos = null;
    })
    .addCase(actionsGetIpInfos.getAllSuccess, (state, action) => {
      state.loading = false;
      state.error = null;
      state.infos = action.payload;
    })
    .addCase(actionsGetIpInfos.getAllFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload.reason;
      state.infos = null;
    })
    .addCase(actionsGetIpInfos.getAllCancel, state => {
      state.loading = false;
      state.error = null;
      state.infos = null;
    })
    .addCase(actionsDashboardScreen.onAddButtonPress, (state, action) => {
      state.selectedImage = action.payload.imageUrl;
    });
});

export const getLoadingIp = (state: TStateDashboard) => state.loadingIp;
export const getErrorIp = (state: TStateDashboard) => state.errorIp;
export const getMyIp = (state: TStateDashboard) => state.myIp;

export const getLoading = (state: TStateDashboard) => state.loading;
export const getError = (state: TStateDashboard) => state.error;
export const getInfos = (state: TStateDashboard) => state.infos;
export const getSelectedImage = (state: TStateDashboard) => state.selectedImage;
