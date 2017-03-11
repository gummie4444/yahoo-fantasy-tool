import _ from 'lodash';
import YahooFantasy from 'yahoo-fantasy';

import yahooScraper from './yahooScraper';
// Basic example ussage of how to create a API
import yfObject from './../yfObject';
import { yahoo } from '../../../../config/secrets';


/**
 * Get yahoo leagues that player is in
 */

// ______
/**
 * List all teams
 */

// TODO THIS IS MABY A TERIBLE WAY TODO THIS
function getOrCreateYf(user) {
  console.log('getOrCreate');
  const temp = yfObject[user.email];
  console.log(yfObject, 'obj');
  if (temp === undefined) {
      const yf = new YahooFantasy(
      yahoo.clientID,
      yahoo.clientSecret
    );
    yf.setUserToken(user.accessToken);

    yfObject[user.email] = yf;
    return yf;
  }
  return temp;
}
// TODO REFACTOR THIS INTO MULTIPLE CUSTOMIZABLE FUNCTIONS
export function getLeagues(req, res) {
    console.log('getLeagues');
    console.log(req.user, 'user');
    let yf;
    if (req.user) {
      yf = getOrCreateYf(req.user);
    } else {
      yf = '';
      console.log('userNotFound');
    }

    // LEAGUES TEAMS
    const filters = {
      is_available: 1,
      game_code: 'nba'
    };

    const subResorces = ['leagues'];
    return yf.games.user(
      filters,
      subResorces,
      (err, data) => {
        if (err) {
          console.log('err', err);
          return res.json('error');
        }
        // send this down and make the dude click one of them TODO CHECK IF DATA[0 IS ALWAYS SOMETHING]

        // HANDLE IF DATA IS NOT WHAT YOU THINK IT IS
        return res.json(data[0].leagues);
      });
}

// helper function
function getTeamsForLeague(league_key, yf) {
   return new Promise((resolve, reject) => {
     yf.league.teams(
        league_key,
        (err, data) => {
          if (err) {
            reject('error');
          }
          resolve(data);
          // do your thing
        }
      );
  });
}

export function getInitTeamDataForLeague(req, res) {
  // get all the info from request
  const leagueKey = req.params.leagueKey;
  const statType = req.params.statType || yahooScraper.statEnum.default;
  const rangeType = req.params.rangeType || yahooScraper.rangeEnum.default;

  let yf;
  if (req.user) {
    yf = getOrCreateYf(req.user);
  } else {
    yf = '';
    console.log('userNotFound');
  }

  // TODO: think about getting all stattype and rangetype data into one request so you will not have to do more requests

  return getTeamsForLeague(leagueKey, yf).then(teamsResult => {
    const actions = teamsResult.teams.map(team => {
      return yahooScraper.scrapeTeam(team.url, statType, rangeType, yf);
    });

    const results = Promise.all(actions);

    return results.then(playerData => {
      playerData.map((playerDataPerTeam, index) => {
        teamsResult.teams[index][yahooScraper.rangeEnum[rangeType]] = playerDataPerTeam;
      });

      // todo: should we only return teamsResult.team or the whole and replace the thingy
      return res.json(teamsResult);
    });
  }).catch(err => {
    return res.json(err);
  });
}

export function getExtraTeamDataForLeague(req, res) {
  console.log(req.user, 'userFromextra');
  // get all the info from request
  const leagueKey = req.params.leagueKey;
  const statType = 'default';
  const rangeType = req.params.rangeType || yahooScraper.rangeEnum.default;

  let yf;
  if (req.user) {
    yf = getOrCreateYf(req.user);
  } else {
    yf = '';
    console.log('userNotFound');
  }
  // TODO: think about getting all stattype and rangetype data into one request so you will not have to do more requests

  return getTeamsForLeague(leagueKey, yf).then(teamsResult => {
    const actions = teamsResult.teams.map(team => {
      return yahooScraper.scrapeTeam(team.url, statType, rangeType, yf);
    });

    const results = Promise.all(actions);
    const returnResult = [];
    return results.then(playerData => {
      playerData.map((playerDataPerTeam, index) => {
        returnResult.push(playerDataPerTeam);
      });

      // todo: should we only return teamsResult.team or the whole and replace the thingy
      return res.json({type: yahooScraper.rangeEnum[rangeType], data: returnResult });
    });
  }).catch(err => {
    return res.json(err);
  });
}

/**
 * List all items
 */

/**
 * List all items
 */

/**
 * List all items
 */


/**
 * List all items
 */

export default {
  getLeagues,
  getInitTeamDataForLeague,
  getExtraTeamDataForLeague
};
