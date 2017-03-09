import _ from 'lodash';

const formatNumber = (number) => {
  return Number(number).toFixed(2);
};

const removeUnnecicarySumData = (sumData) => {
  // TODO: maby make this faster
  const pickedData = _.pick(sumData, 'fgm', 'fga', 'ftm', 'fta', '3pm', 'pts', 'reb', 'ass', 'stl', 'blo', 'to');
  const finalData = _(pickedData).each((value, key) => {
    if ((key === 'fgm' || key === 'fga') && !pickedData['fg%']) {
         pickedData['fg%'] = parseFloat(pickedData.fgm / pickedData.fga).toFixed(2);
    } else if ((key === 'ftm' || key === 'fta') && !pickedData['ft%']) {
       pickedData['ft%'] = parseFloat(pickedData.ftm / pickedData.fta).toFixed(2);
    } else {
       pickedData[key] = formatNumber(value);
    }
  });
  return _.pick(finalData, 'fg%', 'ft%', '3pm', 'pts', 'reb', 'ass', 'stl', 'blo', 'to');
};
const sumAverageData = (items) => {
  const test = _(items).reduce((category, obj) => {
      _(obj).each((value, key) => { category[key] = (category[key] ? category[key] : 0) + Number(value); });
      return category;
    }, {});
    return removeUnnecicarySumData(test);
};

const findLeagueOwnerTeamIndex = (teams) => {
  const index = _.findIndex(teams, (team) => team.is_owned_by_current_login === 1);

  return index > -1 ? index : 'error';
};

const rangeEnum = {
  current: 'AS_2016',
  y2015: 'AS_2015',
  last30: 'AL30',
  last14: 'AL14',
  last7: 'AL7',
  default: 'AS_2016'
};

const leagueUtilService = {
  sumAverageData,
  findLeagueOwnerTeamIndex,
  rangeEnum
};

export default leagueUtilService;
