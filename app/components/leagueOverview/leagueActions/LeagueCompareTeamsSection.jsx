import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import _ from 'lodash';
import Dropdown from 'react-dropdown';

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
    const pre = ['position', 'name', 'fgm', 'fga', 'fg%', 'ftm', 'fta', 'ft%', '3pm', 'pts', 'reb', 'ast', 'stl', 'blo', 'to'];
    const preCat = ['fg%', 'ft%', '3pm', 'pts', 'reb', 'ass', 'stl', 'blo', 'to'];

    return (
      <div className={cx('compareTeamsWrapper')}>
        {currentLeague && currentLeague.teams && this.state.loadInitData &&
        <div>
          <div className={cx('compareTeamsHeaderWraper')}>
            <div className={cx('compareTeamsHeaderLeftTeam')}>
              <Dropdown style={{zIndex:'10000'}} options={this.state.dropDownOptions} onChange={this.onSelectLeftDropDown.bind(this)} value={this.state.dropDownOptions[this.state.teamLeftIndex]} placeholder="Select an option" />

            </div>
            <div className={cx('compareTeamsHeaderScore')}>
              {this.state.teamLeftPoints + ' - ' + this.state.teamRightPoints}
            </div>
            <div className={cx('compareTeamsHeaderRightTeam')}>
              <Dropdown style={{zIndex:'10000'}} options={this.state.dropDownOptions} onChange={this.onSelectRightDropDown.bind(this)} value={this.state.dropDownOptions[this.state.teamRightIndex]} placeholder="Select an option" />
            </div>
          </div>
          <div className={cx('compareTeamsCompareStatsWraper')}>
            <table>
              <tbody>

                <tr className={cx('compareTeamsCompareStatsCategories')}>
                  {preCat.map(item => {
                    return (
                      <td key={item}>
                        {item}
                      </td>
                    );
                  })
                  }
                </tr>
                <tr className={cx('compareTeamsCompareStatsLeftTeam')}>
                  <td>
                    {this.state.sumDataTeamLeft['fg%']}
                  </td>
                  <td>
                    {this.state.sumDataTeamLeft['ft%'] }
                  </td>
                  <td>
                    {this.state.sumDataTeamLeft['3pm']}
                  </td>
                  <td>
                    {this.state.sumDataTeamLeft.pts}
                  </td>
                  <td>
                    {this.state.sumDataTeamLeft.reb}
                  </td>
                  <td>
                    {this.state.sumDataTeamLeft.ass}
                  </td>
                  <td>
                    {this.state.sumDataTeamLeft.stl}
                  </td>
                  <td>
                    {this.state.sumDataTeamLeft.blo}
                  </td>
                  <td>
                    {this.state.sumDataTeamLeft.to}
                  </td>
                </tr>
                <tr className={cx('compareTeamsCompareStatsRightTeam')}>
                  <td>
                    {this.state.sumDataTeamRight['fg%']}
                  </td>
                  <td>
                    {this.state.sumDataTeamRight['ft%'] }
                  </td>
                  <td>
                    {this.state.sumDataTeamRight['3pm']}
                  </td>
                  <td>
                    {this.state.sumDataTeamRight.pts}
                  </td>
                  <td>
                    {this.state.sumDataTeamRight.reb}
                  </td>
                  <td>
                    {this.state.sumDataTeamRight.ass}
                  </td>
                  <td>
                    {this.state.sumDataTeamRight.stl}
                  </td>
                  <td>
                    {this.state.sumDataTeamRight.blo}
                  </td>
                  <td>
                    {this.state.sumDataTeamRight.to}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cx('compareTeamsMainWraper')}>
            <div className={cx('compareTeamsMainTeamStats')}>
              <table>
                <tbody>
                  <tr className={cx('compareTeamsMainTeamStatsCategories')}>
                    {pre.map(item => {
                      return (
                        <td key={item}>
                          {item}
                        </td>
                      );
                    })}
                  </tr>
                  {currentLeague.teams[this.state.teamLeftIndex].data_AS_AS_2016.map(player => {
                  return (
                    <tr>
                      <td>
                        {player.position}
                      </td>
                      <td>
                        {player.name}
                      </td>
                      <td>
                        {player.fgm}
                      </td>
                      <td>
                        {player.fga}
                      </td>
                      <td>
                        {parseFloat(player.fgm / player.fga).toFixed(2)}
                      </td>
                      <td>
                        {player.ftm}
                      </td>
                      <td>
                        {player.fta}
                      </td>
                      <td>
                        {parseFloat(player.ftm / player.fta).toFixed(2)}
                      </td>
                      <td>
                        {player['3pm']}
                      </td>
                      <td>
                        {player.pts}
                      </td>
                      <td>
                        {player.reb}
                      </td>
                      <td>
                        {player.ass}
                      </td>
                      <td>
                        {player.stl}
                      </td>
                      <td>
                        {player.blo}
                      </td>
                      <td>
                        {player.to}
                      </td>
                    </tr>
                  );
                })
              }
                </tbody>

              </table>
            </div>
            <div className={cx('compareTeamsMainTeamStats')}>
              <table>
                <tr className={cx('compareTeamsMainTeamStatsCategories')}>
                  {pre.map(item => {
                    return (
                      <td key={item}>
                        {item}
                      </td>
                    );
                  })}
                </tr>
                {currentLeague.teams[this.state.teamRightIndex].data_AS_AS_2016.map(player => {
                  return (
                    <tr>
                      <td>
                        {player.position}
                      </td>
                      <td>
                        {player.name}
                      </td>
                      <td>
                        {player.fgm}
                      </td>
                      <td>
                        {player.fga}
                      </td>
                      <td>
                        {parseFloat(player.fgm / player.fga).toFixed(2)}
                      </td>
                      <td>
                        {player.ftm}
                      </td>
                      <td>
                        {player.fta}
                      </td>
                      <td>
                        {parseFloat(player.ftm / player.fta).toFixed(2)}
                      </td>
                      <td>
                        {player['3pm']}
                      </td>
                      <td>
                        {player.pts}
                      </td>
                      <td>
                        {player.reb}
                      </td>
                      <td>
                        {player.ass}
                      </td>
                      <td>
                        {player.stl}
                      </td>
                      <td>
                        {player.blo}
                      </td>
                      <td>
                        {player.to}
                      </td>
                    </tr>
                  );
                })
              }
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
