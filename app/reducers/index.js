import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from '../reducers/user';
import leagues from '../reducers/leagues';
import currentLeague from '../reducers/currentLeague';
import dashboardMode from '../reducers/dashboardMode';
import rangeType from '../reducers/rangeType';
import actionMode from '../reducers/actionMode';
import message from '../reducers/message';
import * as types from '../types';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      return true;
    case types.REQUEST_SUCCESS:
    case types.REQUEST_FAILURE:
      return false;
    default:
      return state;
  }
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching,
  leagues,
  currentLeague,
  dashboardMode,
  actionMode,
  rangeType,
  user,
  message,
  routing
});

export default rootReducer;
