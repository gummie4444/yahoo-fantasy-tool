import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';
import LeagueOverviewActions from './LeagueOverviewActions';
import LeagueCompareTeamsSection from './leagueActions/LeagueCompareTeamsSection';
import LeagueTableAnalyticsSection from './leagueActions/LeagueTableAnalyticsSection';

import backButton from '../../images/back.svg';

import styles from '../../css/components/leagueOverview.css';

const cx = classNames.bind(styles);

const LeagueOverviewSection = ({currentLeague, leagueAction, actionMode, rangeType, extraTeamDataForLeague}) => {
  let action = null;

  switch (actionMode) {
    case 'compareTeams':
      action = <LeagueCompareTeamsSection currentLeague={currentLeague} rangeType={rangeType} extraTeamDataForLeague={extraTeamDataForLeague} />;
      break;
    case 'tableAnalytics':
      action = <LeagueTableAnalyticsSection currentLeague={currentLeague} />;
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
      {actionMode !== '' &&
        <div className={cx('leagueOverviewBackButtonWrapper')}>
          <img className={cx('leagueOverviewBackButton')} onClick={leagueAction.bind(this, '')} src={backButton} />
        </div>
      }
      {action}
    </div>
  );
};

LeagueOverviewSection.propTypes = {
  currentLeague: PropTypes.object.isRequired,
  leagueAction: PropTypes.func.isRequired,
  actionMode: PropTypes.string.isRequired,
  rangeType: PropTypes.array.isRequired,
  extraTeamDataForLeague: PropTypes.func.isRequired
};

export default LeagueOverviewSection;
