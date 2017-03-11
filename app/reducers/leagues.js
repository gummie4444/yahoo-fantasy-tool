import * as types from '../types';

const leagues = (
  state = [],
  action
) => {
  // This is maby dumb to use this like this
  switch (action.type) {
    case types.FETCH_FANTASY_LEAGUE_SUCCESS:
      if (action.leagues) return action.leagues;
      return state;
    default:
      return state;
  }
};

export default leagues;
