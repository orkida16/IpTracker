import {createSelector} from '@reduxjs/toolkit';
import {getAllDashboardConfigs, getDashboard} from '../reducer';
import {
  getLoading,
  getInfos,
  getError,
  getSelectedImage,
  getLoadingIp,
  getErrorIp,
  getMyIp,
} from '../reducer/reducerDashboardScreen';

export const selectAllDashboardConfigs = createSelector(
  getAllDashboardConfigs,
  getDashboard,
);

export const selectLoadingIp = createSelector(
  selectAllDashboardConfigs,
  getLoadingIp,
);
export const selectErrorIp = createSelector(
  selectAllDashboardConfigs,
  getErrorIp,
);
export const selectMyIp = createSelector(selectAllDashboardConfigs, getMyIp);

export const selectLoading = createSelector(
  selectAllDashboardConfigs,
  getLoading,
);
export const selectError = createSelector(selectAllDashboardConfigs, getError);
export const selectInfos = createSelector(selectAllDashboardConfigs, getInfos);
export const selectSelectedImage = createSelector(
  selectAllDashboardConfigs,
  getSelectedImage,
);
