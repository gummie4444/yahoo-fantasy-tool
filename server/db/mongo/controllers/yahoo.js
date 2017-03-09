import _ from 'lodash';
import yf from '../../../init/yahooFantasy';
import yahooScraper from './yahooScraper';

// Basic example ussage of how to create a API

/**
 * Get yahoo leagues that player is in
 */

// ______
/**
 * List all teams
 */

// TODO REFACTOR THIS INTO MULTIPLE CUSTOMIZABLE FUNCTIONS
export function getLeagues(req, res) {
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
function getTeamsForLeague(league_key) {
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

  // TODO: think about getting all stattype and rangetype data into one request so you will not have to do more requests

  return getTeamsForLeague(leagueKey).then(teamsResult => {
    const actions = teamsResult.teams.map(team => {
      return yahooScraper.scrapeTeam(team.url, statType, rangeType);
    });

    const results = Promise.all(actions);

    return results.then(playerData => {
      playerData.map((playerDataPerTeam, index) => {
        teamsResult.teams[index][yahooScraper.rangeEnum[rangeType]] = playerDataPerTeam;
      });

      //todo: should we only return teamsResult.team or the whole and replace the thingy
      return res.json(teamsResult);
    });
  }).catch(err => {
    return res.json(err);
  });
}

export function getExtraTeamDataForLeague(req, res) {
  // get all the info from request
  const leagueKey = req.params.leagueKey;
  const statType = 'default';
  const rangeType = req.params.rangeType || yahooScraper.rangeEnum.default;

  // TODO: think about getting all stattype and rangetype data into one request so you will not have to do more requests

  return getTeamsForLeague(leagueKey).then(teamsResult => {
    const actions = teamsResult.teams.map(team => {
      return yahooScraper.scrapeTeam(team.url, statType, rangeType);
    });

    const results = Promise.all(actions);
    const returnResult = [];
    return results.then(playerData => {
      playerData.map((playerDataPerTeam, index) => {
        returnResult.push(playerDataPerTeam);
      });

      //todo: should we only return teamsResult.team or the whole and replace the thingy
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
