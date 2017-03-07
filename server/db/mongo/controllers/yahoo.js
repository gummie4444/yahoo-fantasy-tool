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

export function getTeamDataForLeague(req, res) {
  // get all the info from request
  const leagueKey = req.body.leagueKey;
  const statType = req.body.statType || yahooScraper.statEnum.default;
  const rangeType = req.body.rangeType || yahooScraper.rangeEnum.default;

  console.log(leagueKey,statType,rangeType,"stuff");
  return getTeamsForLeague(leagueKey).then(teamsResult => {
    const actions = teamsResult.teams.map(team => {
      return yahooScraper.scrapeTeam(team.url, statType, rangeType);
    });

    const results = Promise.all(actions);

    return results.then(playerData => {
      playerData.map((playerDataPerTeam, index) => {
        teamsResult.teams[index].playerData = playerDataPerTeam;
      });
      console.log(teamsResult, 'result');

      return res.json(teamsResult);
    });
  }).catch(err => {
    return res.json(err);
  });
}

console.log('prump')

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
  getTeamDataForLeague
};
