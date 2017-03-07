import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import styles from '../../css/components/leagueOverview.css';

const cx = classNames.bind(styles);

const LeagueOverviewActions = ({leagueAction, currentLeague}) => {
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>League overview</h1>
      <h2 style={{textAlign: 'center'}}>{currentLeague.name}</h2>
      <div className={cx('leagueOverviewItemWrapper')}>
        <div onClick={leagueAction.bind(this, 'compareTeams')} className={cx('leagueOverviewItem')} >
          <div className={cx('leagueOverviewItemTextWrapper')}>
            <span className={cx('leagueOverviewItemText')}>
              Compare teams
            </span>
          </div>
        </div>
        <div onClick={leagueAction.bind(this, 'tableAnalytics')} className={cx('leagueOverviewItem')}>
          <div className={cx('leagueOverviewItemTextWrapper')}>
            <span className={cx('leagueOverviewItemText')}>
              Table analytics
            </span>
          </div>
        </div>
        <div onClick={leagueAction.bind(this, 'todo')} className={cx('leagueOverviewItem')}>
          <div className={cx('leagueOverviewItemTextWrapper')}>
            <span className={cx('leagueOverviewItemText')}>
              Some other function 1
            </span>
          </div>
        </div>
        <div onClick={leagueAction.bind(this, 'todo')} className={cx('leagueOverviewItem')}>
          <div className={cx('leagueOverviewItemTextWrapper')}>
            <span className={cx('leagueOverviewItemText')}>
              Some other function 2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

LeagueOverviewActions.propTypes = {
  leagueAction: PropTypes.func.isRequired,
  currentLeague: PropTypes.object.isRequired
};

export default LeagueOverviewActions;
