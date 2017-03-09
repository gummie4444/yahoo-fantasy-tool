import * as types from '../types';
import leagueUtilService from '../services/leagueUtilService';

const initialState = [];
const actionMode = (
  state = initialState,
  action
) => {
  // This is maby dumb to use this like this
  switch (action.type) {
    case types.NEW_RANGE_TYPE:
      if (state.length === 0) {
        return [leagueUtilService.rangeEnum[action.rangeType]];
      }
      return [...state, leagueUtilService.rangeEnum[action.rangeType]];
    case types.GO_HOME:
      return initialState;
    default:
      return state;
  }
};

export default actionMode;
