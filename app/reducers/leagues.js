import * as types from '../types';

const leagues = (
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

export default leagues;
