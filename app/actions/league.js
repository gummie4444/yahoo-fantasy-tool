import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';
import leagueUtilService from '../services/leagueUtilService';

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

export function fetchFantasyLeaguesSuccess(leagues) {
  return {
    type: types.FETCH_FANTASY_LEAGUE_SUCCESS,
    leagues
  };
}
export function fetchFantasyLeagues() {
  return dispatch => {
    return makeLeagueRequest('get', {}, '/leagues')
      .then(res => {
        return dispatch(fetchFantasyLeaguesSuccess(res.data));
      })
      .catch(err => {
        console.log('err', err);
      });
  };
}

export function pickCurrentLeagueSuccesfull(currentLeague) {
  return {
    type: types.PICK_CURRENTLEAGUE_SUCCESFULL,
    currentLeague
  };
}

function createInitDataForLeagueUrl(league, rangeType, statType) {
  return '/leagueInitData/' + league.league_key + '/' + statType + '/' + rangeType;
}

export function teamInitDataForLeagueSuccesfull(teamData) {
  return {
    type: types.TEAM_INIT_DATA_FOR_LEAGUE_SUCCESFULL,
    teamData
  };
}

export function newTeamDataRange(rangeType) {
  return {
    type: types.NEW_RANGE_TYPE,
    rangeType
  };
}

export function changeRangeTypeSuccess(rangeType) {
  return {
    type: types.CHANGE_RANGE_TYPE_SUCCESS,
    rangeType
  };
}

export function changeRangeType(rangeType, rangeTypesArray, league) {
  return dispatch => {
    // if we currently have the data
    if (rangeTypesArray.indexOf(leagueUtilService.rangeEnum[rangeType]) > -1) {
      // just change to new data
      return dispatch(changeRangeTypeSuccess(rangeType))
    }
    // fetch data and then changes
    return dispatch(extraTeamDataForLeague(league, rangeType)).then(res => {
      dispatch(newTeamDataRange(rangeType));
      return dispatch(changeRangeTypeSuccess(rangeType))
    })
  }
}

export function teamDataForLeague(league, rangeType = 'default', statType = 'default') {
  return dispatch => {
    const url = createInitDataForLeagueUrl(league, rangeType, statType);
    // dispatch(startTeamDataForLeague());
    return makeLeagueRequest('get', {}, url)
      .then(res => {
        dispatch(teamInitDataForLeagueSuccesfull(res.data));
        dispatch(newTeamDataRange(rangeType));
      })
      .catch(err => {
        // dispatch(teamDataForLeagueError(res.data));
        console.log('err', err);
      });
  };
}

export function teamExtraDataForLeagueSuccesfull(extraTeamData) {
  return {
    type: types.TEAM_EXTRA_DATA_FOR_LEAGUE_SUCCESFULL,
    extraTeamData
  };
}

function createExtraDataForLeagueUrl(league, rangeType) {
  return '/leagueExtraData/' + league.league_key + '/' + rangeType;
}

export function extraTeamDataForLeague(league, rangeType = 'default', statType = 'default') {
  console.log('extraTeamDataForLeague');
  return dispatch => {
    const url = createExtraDataForLeagueUrl(league, rangeType, statType);
    // dispatch(startTeamDataForLeague());
    return makeLeagueRequest('get', {}, url)
      .then(res => {
        return dispatch(teamExtraDataForLeagueSuccesfull(res.data));
      })
      .catch(err => {
        // dispatch(teamDataForLeagueError(res.data));
        console.log('err', err);
        return;
      });
  };
}


export function pickLeague(currentLeague) {
  return dispatch => {
    dispatch(teamDataForLeague(currentLeague));
    dispatch(pickCurrentLeagueSuccesfull(currentLeague));
    dispatch(leagueOverviewMode());
  };
}
