import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';
import LeagueOverviewActions from './LeagueOverviewActions';
import LeagueCompareTeamsSection from './leagueActions/LeagueCompareTeamsSection';
import AnalyticsContainer from '../../containers/AnalyticsContainer';

import backButton from '../../images/back.svg';

import styles from '../../css/components/leagueOverview.css';

const cx = classNames.bind(styles);

const LeagueOverviewSection = ({currentLeague, leagueAction, actionMode, rangeTypes, changeCurrentRange, currentRangeType}) => {
  let action = null;

  switch (actionMode) {
    case 'compareTeams':
      action = <LeagueCompareTeamsSection currentLeague={currentLeague} rangeTypes={rangeTypes} changeCurrentRange={changeCurrentRange} currentRangeType={currentRangeType} />;
      break;
    case 'tableAnalytics':
      action = <AnalyticsContainer currentLeague={currentLeague} currentRangeType={currentRangeType} />;
      break;
    case '':
      action = <LeagueOverviewActions leagueAction={leagueAction} currentLeague={currentLeague} />;
      break;
    default:
      action = <LeagueOverviewActions leagueAction={leagueAction} currentLeague={currentLeague} />;
      break;
  }

  return (
    <div>
      {action}
    </div>
  );
};

LeagueOverviewSection.propTypes = {
  currentLeague: PropTypes.object.isRequired,
  leagueAction: PropTypes.func.isRequired,
  actionMode: PropTypes.string.isRequired,
  currentRangeType: PropTypes.string.isRequired,
  rangeTypes: PropTypes.array.isRequired,
  changeCurrentRange: PropTypes.func.isRequired
};

export default LeagueOverviewSection;
