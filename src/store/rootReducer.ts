import {combineReducers} from 'redux';
import {dashboardCombinedReducer} from '../modules/dashboard/store/reducer';
import {marketDataCombinedReducer} from '../modules/marketData/store/reducer';

const rootReducer = combineReducers({
  dashboard: dashboardCombinedReducer,
  marketData: marketDataCombinedReducer,
  // add other reducers here
});

export default rootReducer;
