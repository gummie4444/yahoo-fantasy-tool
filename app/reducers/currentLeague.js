import * as types from '../types';
import leagueUtilService from '../services/leagueUtilService';

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
    // this asumes that we only call this function once and we have all the data we need, asumes we have currentleague asweell
    case types.TEAM_INIT_DATA_FOR_LEAGUE_SUCCESFULL:
      if (state !== {}) {
        // TODO: follow principla imutable and create a new object and pass it to the state currentleague with teamData OR ADD TEAMS TO THIS??
        return action.teamData;
      }
      // Todo: handle edge case if you get here and you did not have any currentleague?
      break;
    case types.TEAM_EXTRA_DATA_FOR_LEAGUE_SUCCESFULL:
      const teams = [];
      state.teams.map((team, index) => {
        const test = {};
        console.log(action.extraTeamData);
        test[action.extraTeamData.type] = action.extraTeamData.data[index];
        teams.push(Object.assign(team, test));
      });
      return Object.assign({}, state, {
        teams
      });
    case types.GO_HOME:
      return initialState;
    default:
      return state;
  }
};

export default currentLeague;

