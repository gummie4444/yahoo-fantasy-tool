import { combineReducers } from 'redux';
import * as types from '../types';

const league = (
  state = [],
  action
) => {
  // This is maby dumb to use this like this
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    default:
      return state;
  }
};

export default league;
