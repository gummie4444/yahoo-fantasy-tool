import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import _ from 'lodash';
import CompareTeamsHeaderTeam from './CompareTeamsSection/CompareTeamsHeaderTeam';
import CompareTeamsHeaderScore from './CompareTeamsSection/CompareTeamsHeaderScore';
import CompareTeamsCompareStatsCategories from './CompareTeamsSection/CompareTeamsCompareStatsCategories';
import CompareTeamsCompareStatsTeam from './CompareTeamsSection/CompareTeamsCompareStatsTeam';
import CompareTeamsMainCategories from './CompareTeamsSection/CompareTeamsMainCategories';
import CompareTeamsMainPlayer from './CompareTeamsSection/CompareTeamsMainPlayer';

import leagueUtilService from '../../../services/leagueUtilService';
import styles from '../../../css/components/leagueCompareTeams.css';

const cx = classNames.bind(styles);

class LeagueCompareTeamsSection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loadInitData: false,
      teamLeftIndex: '',
      teamRightIndex: '',
      sumDataTeamLeft: {},
      sumDataTeamRight: {},
      teamLeftPoints: 0,
      teamRightPoints: 0,
      dropDownOptions: {}
    };
  }

  componentDidMount() {
    if (this.props.currentLeague && this.props.currentLeague.teams && !this.state.loadInitData) {
      this.loadInitData(this.props.currentLeague.teams);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentLeague && nextProps.currentLeague.teams && !this.state.loadInitData) {
      this.loadInitData(nextProps.currentLeague.teams);
    }
  }

  loadInitData(teams) {
    const numberTeams = teams.length;
    const teamLeftIndex = leagueUtilService.findLeagueOwnerTeamIndex(teams);
    const teamRightIndex = teamLeftIndex + 1 !== numberTeams ? teamLeftIndex + 1 : teamLeftIndex - 1;

    const dropDownOptions = teams.map((team, index) => {
      return {
        value: index,
        label: team.name
      };
     });
     this.setState({
       dropDownOptions
     });

    this.updateData(teamLeftIndex, teamRightIndex, teams);
  }

  updateData(teamLeftIndex, teamRightIndex, teams = false) {
    const currentTeams = teams !== false ? teams : this.props.currentLeague.teams;
    const sumDataTeamLeft = leagueUtilService.sumAverageData(currentTeams[teamLeftIndex].data_AS_AS_2016);
    const sumDataTeamRight = leagueUtilService.sumAverageData(currentTeams[teamRightIndex].data_AS_AS_2016);

    let teamLeftPoints = 0;
    let teamRightPoints = 0;
     _(sumDataTeamLeft).each((value, key) => {
       if (key === 'to') {
        if (sumDataTeamLeft[key] === sumDataTeamRight[key]) {
          teamLeftPoints += 0.5;
          teamRightPoints += 0.5;
        } else {
          sumDataTeamLeft[key] < sumDataTeamRight[key] ? teamLeftPoints++ : teamRightPoints++;
        }
       } else if (sumDataTeamLeft[key] === sumDataTeamRight[key]) {
          teamLeftPoints += 0.5;
          teamRightPoints += 0.5;
        } else {
          sumDataTeamLeft[key] > sumDataTeamRight[key] ? teamLeftPoints++ : teamRightPoints++;
        }
     });

    this.setState({
      teamLeftIndex,
      teamRightIndex,
      sumDataTeamLeft,
      sumDataTeamRight,
      loadInitData: true,
      teamLeftPoints,
      teamRightPoints
    });
  }
  onSelectRightDropDown(item) {
    this.updateData(this.state.teamLeftIndex, item.value);
  }

  onSelectLeftDropDown(item) {
    this.updateData(item.value, this.state.teamRightIndex);
  }

  render() {
    // todo move to components
    const currentLeague = this.props.currentLeague;
              // {currentLeague.teams[0].name}
              // {currentLeague.teams[0].team_logo[0].url}
              // {currentLeague.teams[0].managers[0].nickname}
    return (
      <div className={cx('compareTeamsWrapper')}>
        {currentLeague && currentLeague.teams && this.state.loadInitData &&
        <div>
          <div className={cx('compareTeamsHeaderWraper')}>
            <CompareTeamsHeaderTeam customClassName={cx('compareTeamsHeaderLeftTeam')} options={this.state.dropDownOptions} change={this.onSelectLeftDropDown.bind(this)} initValue={this.state.dropDownOptions[this.state.teamLeftIndex]} />
            <CompareTeamsHeaderScore customClassName={cx('compareTeamsHeaderScore')} leftPoints={this.state.teamLeftPoints} rightPoints={this.state.teamRightPoints} />
            <CompareTeamsHeaderTeam customClassName={cx('compareTeamsHeaderRightTeam')} options={this.state.dropDownOptions} change={this.onSelectRightDropDown.bind(this)} initValue={this.state.dropDownOptions[this.state.teamRightIndex]} />
          </div>
          <div className={cx('compareTeamsCompareStatsWraper')}>
            <table>
              <tbody>
                <CompareTeamsCompareStatsCategories customClassName={cx('compareTeamsCompareStatsCategories')} />
                <CompareTeamsCompareStatsTeam team={this.state.sumDataTeamLeft} customClassName={cx('compareTeamsCompareStatsLeftTeam')} />
                <CompareTeamsCompareStatsTeam team={this.state.sumDataTeamRight} customClassName={cx('compareTeamsCompareStatsRightTeam')} />
              </tbody>
            </table>
          </div>
          <div className={cx('compareTeamsMainWraper')}>
            <div className={cx('compareTeamsMainTeamStats')}>
              <table>
                <tbody>
                  <CompareTeamsMainCategories customClassName={cx('compareTeamsMainTeamStatsCategories')} />
                  {currentLeague.teams[this.state.teamLeftIndex].data_AS_AS_2016.map(player => {
                    return (<CompareTeamsMainPlayer player={player} />);
                  })}
                </tbody>

              </table>
            </div>
            <div className={cx('compareTeamsMainTeamStats')}>
              <table>
                <tbody>
                  <CompareTeamsMainCategories customClassName={cx('compareTeamsMainTeamStatsCategories')} />
                  {currentLeague.teams[this.state.teamRightIndex].data_AS_AS_2016.map(player => {
                    return (<CompareTeamsMainPlayer player={player} />);
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

LeagueCompareTeamsSection.propTypes = {
  currentLeague: PropTypes.object.isRequired
};

export default LeagueCompareTeamsSection;
