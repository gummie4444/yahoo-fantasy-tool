import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import AnalyticsTableItem from './AnalyticsTableItem';

import leagueUtilService from '../../../../services/leagueUtilService.js';
import styles from '../../../../css/components/analytics.css';

const cx = classNames.bind(styles);

const AnalyticsTable = ({teams, onSortClick, currentRangeType}) => {
  return (
    teams.length > 0 ?
      <div className={cx('Analytics-Table')}>
        <div className={cx('Analytics-TableHeader')}>
          <div className={cx('Analytics-TableHeaderName')}>TEAM</div>
          <div className={cx('Analytics-TableHeaderStat')} onClick={onSortClick}>PTS</div>
          <div className={cx('Analytics-TableHeaderStat')} onClick={onSortClick}>REB</div>
          <div className={cx('Analytics-TableHeaderStat')} onClick={onSortClick}>ASS</div>
          <div className={cx('Analytics-TableHeaderStat')} onClick={onSortClick}>STL</div>
          <div className={cx('Analytics-TableHeaderStat')} onClick={onSortClick}>BLO</div>
          <div className={cx('Analytics-TableHeaderStat')} onClick={onSortClick}>3PM</div>
          <div className={cx('Analytics-TableHeaderStat')} onClick={onSortClick}>FG%</div>
          <div className={cx('Analytics-TableHeaderStat')} onClick={onSortClick}>FT%</div>
          <div className={cx('Analytics-TableHeaderStat')} onClick={onSortClick}>TO</div>
        </div>
        {teams.map((team, index) => {
          const teamAvg = leagueUtilService.sumAverageData(teams[index][currentRangeType]);
          return (
            <AnalyticsTableItem key={team.team_id} team={team} teamAvg={teamAvg} />
          );
        })}
      </div>
      :
      <div className={cx('Spinner')} />
  );
};

AnalyticsTable.propTypes = {
    teams: PropTypes.array.isRequired,
    onSortClick: PropTypes.func.isRequired,
    currentRangeType: PropTypes.string.isRequired
};

export default AnalyticsTable;
