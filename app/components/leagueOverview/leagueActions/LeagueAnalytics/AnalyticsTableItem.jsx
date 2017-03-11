import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import styles from '../../../../css/components/analytics.css';

const cx = classNames.bind(styles);

const AnalyticsTableItem = ({team, teamAvg}) => {
  return (
    <div className={cx('Analytics-TableItem')}>
      <div className={cx('Analytics-TeamLogoContainer')}>
        <img src={team.team_logos[0].url} alt="http://i.cdn.turner.com/nba/nba/assets/logos/teams/primary/web/CLE.svg" />
      </div>
      <div className={cx('Analytics-TableItemName')}>{team.name}</div>
      <div className={cx('Analytics-TableItemStats')}>
        <div className={cx('Analytics-TableStat')}>{teamAvg.pts}</div>
        <div className={cx('Analytics-TableStat')}>{teamAvg.reb}</div>
        <div className={cx('Analytics-TableStat')}>{teamAvg.ass}</div>
        <div className={cx('Analytics-TableStat')}>{teamAvg.stl}</div>
        <div className={cx('Analytics-TableStat')}>{teamAvg.blo}</div>
        <div className={cx('Analytics-TableStat')}>{teamAvg['3pm']}</div>
        <div className={cx('Analytics-TableStat')}>{teamAvg['fg%']}</div>
        <div className={cx('Analytics-TableStat')}>{teamAvg['ft%']}</div>
        <div className={cx('Analytics-TableStat')}>{teamAvg.to}</div>
      </div>
    </div>
  );
};

AnalyticsTableItem.propTypes = {
    team: PropTypes.object.isRequired,
    teamAvg: PropTypes.object.isRequired,
};

export default AnalyticsTableItem;
