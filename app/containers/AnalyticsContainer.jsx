import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import AnalyticsMenu from '../components/leagueOverview/leagueActions/LeagueAnalytics/AnalyticsMenu';
import AnalyticsTableContainer from './AnalyticsTableContainer';

import styles from '../css/components/analytics.css';

const cx = classNames.bind(styles);

class AnalyticsContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        currentLeague: props.currentLeague,
    };
  }

  componentWillReceiveProps(recievedProps) {
    if (recievedProps.currentLeague && recievedProps.currentLeague.teams) {
      this.setState({
        currentLeague: recievedProps.currentLeague,
      });
    }
  }

  render() {
    const teams = this.state.currentLeague.teams ? this.state.currentLeague.teams : [];
    return (
      <div className={cx('Analytics-Container')}>
        <div className={cx('Analytics-Header')}>
          <div className={cx('Analytics-HeaderOverlay')}>
            A N A L Y T I C S
          </div>
          <AnalyticsMenu />
        </div>
        <div className={cx('Analytics-Separator')} />
        <AnalyticsTableContainer currentRangeType={this.props.currentRangeType} teams={teams} />
      </div>
  );
  }
}

AnalyticsContainer.propTypes = {
    currentLeague: PropTypes.object.isRequired,
    currentRangeType: PropTypes.string.isRequired
};

export default AnalyticsContainer;
