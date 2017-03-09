import * as types from '../types';

const initialState = 'leaguePick';

const dashboardMode = (
  state = initialState,
  action
) => {
  // This is maby dumb to use this like this
  switch (action.type) {
    case types.CHANGE_DASHBOARD_MODE:
      return action.mode;
    case types.GO_HOME:
      return initialState;
    default:
      return state;
  }
};

export default dashboardMode;

