import * as types from '../types';
import leagueUtilService from '../services/leagueUtilService';

const initialState = leagueUtilService.rangeEnum['default'];
const currentRangeType = (
  state = initialState,
  action
) => {
  // This is maby dumb to use this like this
  switch (action.type) {
    case types.CHANGE_RANGE_TYPE_SUCCESS:
      return leagueUtilService.rangeEnum[action.rangeType];
    case types.GO_HOME:
      return initialState;
    default:
      return state;
  }
};

export default currentRangeType;
