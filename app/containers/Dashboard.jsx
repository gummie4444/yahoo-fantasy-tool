import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PickLeagueSection from '../components/pickLeague/PickLeagueSection';
import LeagueOverviewSection from '../components/leagueOverview/LeagueOverviewSection';
import {pickLeague, leagueAction, extraTeamDataForLeague, fetchFantasyLeagues} from '../actions/league';

// import { somethings} from '../actions/images';
// import styles from '../css/components/vote';

injectTapEventPlugin();

// const cx = classNames.bind(styles);

class Dashboard extends Component {

  componentDidMount() {
    if (this.props.fantasyLeagues && this.props.fantasyLeagues.length === 0) {
      this.props.fetchFantasyLeagues();
    }
  }

  render() {
    let section = null;

    switch (this.props.dashboardMode) {
       case 'leagueOverview':
        section = <LeagueOverviewSection currentLeague={this.props.currentLeague} leagueAction={this.props.leagueAction} actionMode={this.props.actionMode} rangeType={this.props.rangeType} extraTeamDataForLeague={this.props.extraTeamDataForLeague} />;
        break;
      case 'pickLeague':
        section = <PickLeagueSection fantasyLeagues={this.props.fantasyLeagues} pickLeague={this.props.pickLeague} />;
        break;
      default:
        section = <PickLeagueSection fantasyLeagues={this.props.fantasyLeagues} pickLeague={this.props.pickLeague} />;
        break;
    }

    return (
      <div>
        {section}
      </div>
    );
  }
}

Dashboard.propTypes = {
  fantasyLeagues: PropTypes.array,
  dashboardMode: PropTypes.string,
  pickLeague: PropTypes.func,
  currentLeague: PropTypes.object,
  leagueAction: PropTypes.func,
  actionMode: PropTypes.string,
  rangeType: PropTypes.array,
  extraTeamDataForLeague: PropTypes.func,
  fetchFantasyLeagues: PropTypes.func
};

function mapStateToProps(state) {
  return {
    fantasyLeagues: state.leagues,
    dashboardMode: state.dashboardMode,
    currentLeague: state.currentLeague,
    actionMode: state.actionMode,
    rangeType: state.rangeType
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {pickLeague, leagueAction, extraTeamDataForLeague, fetchFantasyLeagues})(Dashboard);
