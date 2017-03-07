import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import * as types from '../types';

polyfill();

function makeLeagueRequest(method, data, api = '/leagues') {
  return request[method](api, data);
}


// overviews
export function leagueOverviewMode() {
    return {
    type: types.CHANGE_DASHBOARD_MODE,
    mode: 'leagueOverview'
  };
}

export function pickLeagueMode() {
    return {
    type: types.CHANGE_DASHBOARD_MODE,
    mode: 'pickLeague'
  };
}

// league actions
export function leagueActionSuccesfull(action) {
  return {
    type: types.CHANGE_LEAGUE_ACTION,
    mode: action
  };
}

export function home() {
  return {
    type: types.GO_HOME
  };
}

export function leagueAction(action) {
  return dispatch => {
    /* switch (action) {
      case 'compareTeams':
        dispatch(getCompareTeamsData());
        break;
      case 'tableAnalytics':
        dispatch(getTableAnalyticsData());
        break;
      default:
        console.log('bla');
        break;
    }*/

    dispatch(leagueActionSuccesfull(action));
  };
}

export function pickCurrentLeagueSuccesfull(currentLeague) {
  return {
    type: types.PICK_CURRENTLEAGUE_SUCCESFULL,
    currentLeague
  };
}


function createDataForLeagueUrl(league, rangeType, statType) {
  return '/leagueData/' + league.league_key + '/' + rangeType + '/' + statType;
}

export function teamDataForLeague(league, rangeType = 'default', statType = 'default') {
  return dispatch => {
    const url = createDataForLeagueUrl(league, rangeType, statType);

    const data = {
      leagueKey: league.league_key,
      rangeType,
      statType
    };

    return makeLeagueRequest('get', data, '/leagueData')
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
      })
      .catch(err => {
        console.log('err', err);
      });
  };
}


export function pickLeague(currentLeague) {
  return dispatch => {
    dispatch(teamDataForLeague(currentLeague));
    dispatch(pickCurrentLeagueSuccesfull(currentLeague));
    dispatch(leagueOverviewMode());
  };
}
