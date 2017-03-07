import * as types from '../types';

const currentLeague = (
  state = {},
  action
) => {
  // This is maby dumb to use this like this
  switch (action.type) {
    case types.PICK_CURRENTLEAGUE_SUCCESFULL:
      // HANDLE CASE WHEN THIS LEAGUE EXIST AND APPENDING NEW DATA TO THAT LEAGUE
      if (action.currentLeague) return action.currentLeague;
      return state;
    default:
      return state;
  }
};

export default currentLeague;
