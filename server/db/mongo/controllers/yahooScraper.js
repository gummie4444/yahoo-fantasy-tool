import request from 'request';
import cheerio from 'cheerio';

export const statEnum = {
  totalStat: 'S',
  averageStat: 'AS',
  projectedStat: 'P',
  default: 'AS'
};

export const rangeEnum = {
  current: 'AS_2016',
  y2015: 'AS_2015',
  last30: 'AL30',
  last14: 'AL14',
  last7: 'AL7',
  default: 'AS_2016'
};

export function createScrapeUrl(statType, range) {
  let url = '?' + 'stat1=' + statEnum[statType];

  if (range && range !== '') {
    url += '&stat2=' + rangeEnum[range];
  }

  return url;
}

export function scrapeTeam(url, statType, range, yf) {

  const scrapeUrl = createScrapeUrl(statType, range);

 const accessKey = yf.yahooUserToken || '';
   return new Promise((resolve, reject) => {
      request.get(url + scrapeUrl, {
      auth: {
        bearer: accessKey
      },
      headers: {
         'User-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:2.0.1) Gecko/20110506 Firefox/4.0.1'
      }
    }, (err, response, html) => {    
      if (err) {
        console.log(err, 'err');
        return reject(err);
      }
      const $ = cheerio.load(html);
      const playerStats = [];
      $('tbody tr').each((i, element) => {
        const playerStat = {
          position: '',
          name: '',
          'pre-rank': '9999',
          'curr-rank': '9999',
          '%own': '0',
          min: '0',
          fgm: '0',
          fga: '0',
          ftm: '0',
          fta: '0',
          '3pm': '0',
          pts: '0',
          reb: '0',
          ass: '0',
          stl: '0',
          blo: '0',
          to: '0'
        };
         if ($(element).children('td').length !== 22) return;
         $(element).children('td').each((s, td) => {
          switch (s) {
            case 0:
              playerStat.position = td.children[0].children[0].children[0].data;
              break; // Pos
            case 1:
              playerStat.name = td.children[0].children[1].children[3].children[0].children[0].data;
              break; // name
            case 6:
              playerStat['pre-rank'] = td.children[0].children[0].data;
              break; // pre rank
            case 7:
              playerStat['curr-rank'] = td.children[0].children[0].data;
              break;  // curr rank
            case 8:
              playerStat['%own'] = td.children[0].children[0].data;
              break; // %owned
            case 9:
              playerStat.min = td.children[0].children[0].data;
              break; // min/game
            case 10:
              const fgaANDfgm = td.children[0].children[0].children[0].data.split('/');
              playerStat.fgm = fgaANDfgm[0];
              playerStat.fga = fgaANDfgm[1];
              break;
            case 12:
              const ftaANDftm = td.children[0].children[0].children[0].data.split('/');
              playerStat.ftm = ftaANDftm[0];
              playerStat.fta = ftaANDftm[1];
              break;
            case 14:
              playerStat['3pm'] = td.children[0].children[0].data;
              break; // 3pm
            case 15:
              playerStat.pts = td.children[0].children[0].data;
              break; // pts
            case 16:
              playerStat.reb = td.children[0].children[0].data;
              break; // reb
            case 17:
              playerStat.ass = td.children[0].children[0].data;
              break; // ass
            case 18:
              playerStat.stl = td.children[0].children[0].data;
              break; // stl
            case 19:
              playerStat.blo = td.children[0].children[0].data;
              break; // blo
            case 20:
              playerStat.to = td.children[0].children[0].data;
              break; // to

          }
         });

         playerStats.push(playerStat);
       });
      resolve(playerStats);
    });
   });
}

export default {
  createScrapeUrl,
  scrapeTeam,
  statEnum,
  rangeEnum
};
