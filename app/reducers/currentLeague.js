import * as types from '../types';

const initialState = {};
const currentLeague = (
  state = initialState,
  action
) => {
  // This is maby dumb to use this like this
  switch (action.type) {
    case types.PICK_CURRENTLEAGUE_SUCCESFULL:
      // HANDLE CASE WHEN THIS LEAGUE EXIST AND APPENDING NEW DATA TO THAT LEAGUE
      if (action.currentLeague) return action.currentLeague;
      return state;
    case types.GO_HOME:
      return initialState;
    default:
      return state;
  }
};

export default currentLeague;
