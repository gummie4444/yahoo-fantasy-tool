import * as types from '../types';

const dashboardMode = (
  state = 'leaguePick',
  action
) => {
  // This is maby dumb to use this like this
  switch (action.type) {
    case types.CHANGE_DASHBOARD_MODE:
      return action.mode;
    default:
      return state;
  }
};

export default dashboardMode;
