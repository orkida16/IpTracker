import {combineReducers} from 'redux';
import {dashboardCombinedReducer} from '../modules/dashboard/store/reducer';

const rootReducer = combineReducers({
  dashboard: dashboardCombinedReducer,
  // add other reducers here
});

export default rootReducer;
