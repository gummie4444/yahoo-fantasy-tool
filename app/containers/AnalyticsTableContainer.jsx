import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import AnalyticsTable from '../components/leagueOverview/leagueActions/LeagueAnalytics/AnalyticsTable';
import styles from '../css/components/analytics.css';

const cx = classNames.bind(styles);

class AnalyticsTableContainer extends React.Component {

  constructor(props) {
    super(props);

    this.handleSortClick = this.handleSortClick.bind(this);

    this.state = {
      teams: props.teams
    };
  }

  componentWillReceiveProps(recievedProps) {
    if (recievedProps.teams) {
      this.setState({
        teams: recievedProps.teams
      });
    }
  }

  handleSortClick() {
    this.sortTeams('reb');
  }

  sortTeams(statType) {
    const teamsCopy = this.state.teams;
    teamsCopy.forEach(team => {
      console.log(team.team_id);
    });
    teamsCopy.sort(this.dynamicSort(statType));
    console.log("blablabla");
    teamsCopy.forEach(team => {
      console.log(team.team_id);
    });
    this.setState({teams: teamsCopy});
  }

  dynamicSort(key) {
    return (a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }

  render() {
    return (
      <div className={cx('Analytics-TableContainer')}>
        <AnalyticsTable currentRangeType={this.props.currentRangeType} teams={this.state.teams} onSortClick={this.handleSortClick} />
      </div>
  );
  }
}

AnalyticsTableContainer.propTypes = {
    teams: PropTypes.array.isRequired,
    currentRangeType: PropTypes.string.isRequired
};

export default AnalyticsTableContainer;
