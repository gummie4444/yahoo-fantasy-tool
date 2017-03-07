import * as types from '../types';

const initialState = '';
const actionMode = (
  state = initialState,
  action
) => {
  // This is maby dumb to use this like this
  switch (action.type) {
    case types.CHANGE_LEAGUE_ACTION:
      return action.mode;
    case types.GO_HOME:
      return initialState;
    default:
      return state;
  }
};

export default actionMode;
