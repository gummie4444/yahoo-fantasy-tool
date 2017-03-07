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

export function pickCurrentLeagueSuccesfull(currentLeague) {
  return {
    type: types.PICK_CURRENTLEAGUE_SUCCESFULL,
    currentLeague
  };
}
export function pickLeague(currentLeague) {
  console.log('pickLeague',currentLeague);
  return dispatch => {
    dispatch(leagueOverviewMode());
    dispatch(pickCurrentLeagueSuccesfull(currentLeague));
  };
}

function createDataForLeagueUrl(league, rangeType, statType) {
  return 'leagueData/' + league.league_key + '/' + rangeType + '/' + statType;
}

export function teamDataForLeague(league, rangeType = 'default', statType = 'default') {
  return dispatch => {
    const url = createDataForLeagueUrl(league, rangeType, statType);
    return makeLeagueRequest('get', league.league_key, url)
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
      })
      .catch(err => {
        console.log('err', err);
      });
  };
}
