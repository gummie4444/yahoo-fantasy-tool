import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import _ from 'lodash';
import Loading from 'react-loading';

import CompareTeamsHeaderTeam from './CompareTeamsSection/CompareTeamsHeaderTeam';
import CompareTeamsHeaderScore from './CompareTeamsSection/CompareTeamsHeaderScore';
import CompareTeamsCompareStatsCategories from './CompareTeamsSection/CompareTeamsCompareStatsCategories';
import CompareTeamsCompareStatsTeam from './CompareTeamsSection/CompareTeamsCompareStatsTeam';
import CompareTeamsMainCategories from './CompareTeamsSection/CompareTeamsMainCategories';
import CompareTeamsMainPlayer from './CompareTeamsSection/CompareTeamsMainPlayer';
import RangePicker from './RangePicker'

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
      dropDownOptions: {},
      loading: true
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

    if(nextProps.currentRangeType !== this.props.currentRangeType){
      this.updateData(this.state.teamLeftIndex, this.state.teamRightIndex);
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
       dropDownOptions,
       loadInitData:true
     });

    this.updateData(teamLeftIndex, teamRightIndex, teams);
  }

  updateData(teamLeftIndex, teamRightIndex, teams = false) {
    const currentTeams = teams !== false ? teams : this.props.currentLeague.teams;
    const sumDataTeamLeft = leagueUtilService.sumAverageData(currentTeams[teamLeftIndex][this.props.currentRangeType]);
    const sumDataTeamRight = leagueUtilService.sumAverageData(currentTeams[teamRightIndex][this.props.currentRangeType]);

    console.log('rangeType',this.props.currentRangeType);
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
      teamLeftPoints,
      teamRightPoints,
      loading: false
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
    const types = ['y2015', 'last30', 'last14', 'last7', 'current'];


    return (
      <div className={cx('compareTeamsWrapper')}>
        {this.state.loading && <div className={cx('compareTeamsLoading')}> WE ARE LOADING SOME DATA </div>}
        {currentLeague && currentLeague.teams && this.state.loadInitData &&
        <div>
          <RangePicker currentLeague={this.props.currentLeague} currentRangeType={this.props.currentRangeType} changeCurrentRange={this.props.changeCurrentRange} rangeTypes={this.props.rangeTypes} />
          <div className={cx('compareTeamsHeaderWraper')}>
            <CompareTeamsHeaderTeam customClassName={cx('compareTeamsHeaderLeftTeam')} options={this.state.dropDownOptions} change={this.onSelectLeftDropDown.bind(this)} initValue={this.state.dropDownOptions[this.state.teamLeftIndex]} />
            <CompareTeamsHeaderScore customClassName={cx('compareTeamsHeaderScore')} leftPoints={this.state.teamLeftPoints} rightPoints={this.state.teamRightPoints} />
            <CompareTeamsHeaderTeam customClassName={cx('compareTeamsHeaderRightTeam')} options={this.state.dropDownOptions} change={this.onSelectRightDropDown.bind(this)} initValue={this.state.dropDownOptions[this.state.teamRightIndex]} />
          </div>
          <div className={cx('compareTeamsCompareStatsWraper')}>
            <table>
              <tbody>
                <CompareTeamsCompareStatsCategories customClassName={cx('compareTeamsCompareStatsCategories')} />
                <CompareTeamsCompareStatsTeam teamName={currentLeague.teams[this.state.teamLeftIndex].name} team={this.state.sumDataTeamLeft} customClassName={cx('compareTeamsCompareStatsLeftTeam')} />
                <CompareTeamsCompareStatsTeam teamName={currentLeague.teams[this.state.teamRightIndex].name} team={this.state.sumDataTeamRight} customClassName={cx('compareTeamsCompareStatsRightTeam')} />
              </tbody>
            </table>
          </div>
          <div className={cx('compareTeamsMainWraper')}>
            <div className={cx('compareTeamsMainTeamStats')}>
              <table>
                <tbody>
                  <CompareTeamsMainCategories customClassName={cx('compareTeamsMainTeamStatsCategories')} />
                  {currentLeague.teams[this.state.teamLeftIndex][this.props.currentRangeType].map(player => {
                    return (<CompareTeamsMainPlayer player={player} />);
                  })}
                </tbody>

              </table>
            </div>
            <div className={cx('compareTeamsMainTeamStats')}>
              <table>
                <tbody>
                  <CompareTeamsMainCategories customClassName={cx('compareTeamsMainTeamStatsCategories')} />
                  {currentLeague.teams[this.state.teamRightIndex][this.props.currentRangeType].map(player => {
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
  currentLeague: PropTypes.object.isRequired,
  currentRangeType: PropTypes.string.isRequired,
  rangeTypes: PropTypes.array.isRequired,
  changeCurrentRange: PropTypes.func.isRequired
};

export default LeagueCompareTeamsSection;
