import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import styles from '../css/components/main-section';

//TODO MOVE ALL THIS TO DIFFRIENT COMPONENTS
const MainDashboardSection = ({fantasyData}) => {
  const pre = ['position', 'name', 'preseson rank', 'current rank', '% own', 'min/game', 'fgm', 'fga', 'fg%', 'ftm', 'fta', 'ft%', '3pm', 'pts', 'reb', 'ast', 'stl', 'blo', 'to'];

  const sumAll = (items) => {
   const test = _(items).reduce((acc, obj) => {
      _(obj).each((value, key) => { acc[key] = (acc[key] ? acc[key] : 0) + Number(value); });
      return acc;
    }, {});
        console.log(test);

    return test;
  };

  const formatNumber = (number) => {
    return Number(number).toFixed(2);
  };

  const sumAllRow = (items) => {
    const sumPlayer = sumAll(items);
    return (<tr>
      <td>
        {sumPlayer.position}
      </td>
      <td>
        {sumPlayer.name}
      </td>
      <td>
        {sumPlayer['pre-rank']}
      </td>
      <td>
        {sumPlayer['curr-rank']}
      </td>
      <td>
        {sumPlayer['%own']}
      </td>
      <td>
        {sumPlayer.min}
      </td>
      <td>
        {formatNumber(sumPlayer.fgm)}
      </td>
      <td>
        {formatNumber(sumPlayer.fga)}
      </td>
      <td>
        {formatNumber((sumPlayer.fgm / 13) / (sumPlayer.fga / 13))}
      </td>
      <td>
        {formatNumber(sumPlayer.ftm)}
      </td>
      <td>
        {formatNumber(sumPlayer.fta)}
      </td>
      <td>
        {formatNumber((sumPlayer.ftm / 13) / (sumPlayer.fta / 13))}
      </td>
      <td>
        {formatNumber(sumPlayer['3pm'])}
      </td>
      <td>
        {formatNumber(sumPlayer.pts)}
      </td>
      <td>
        {formatNumber(sumPlayer.reb)}
      </td>
      <td>
        {formatNumber(sumPlayer.ass)}
      </td>
      <td>
        {formatNumber(sumPlayer.stl)}
      </td>
      <td>
        {formatNumber(sumPlayer.blo)}
      </td>
      <td>
        {formatNumber(sumPlayer.to)}
      </td>
    </tr>
    );
  };


  return (
    <div >
      <List>
        {fantasyData !== 'error' && <div>
          <a href={fantasyData.url} >
            <h1>Deild: {fantasyData.name}</h1>
          </a>

          {fantasyData.teams.map(team => {
            return (<ul>
              <h2>{team.name}</h2>
              <table>
                <tr>
                  {pre.map(item => {
                 return (
                   <td>
                     {item}
                   </td>
                 );
                })}
                </tr>
                {team.playerData.map(player => {
                return (
                  <tr>
                    <td>
                      {player.position}
                    </td>
                    <td>
                      {player.name}
                    </td>
                    <td>
                      {player['pre-rank']}
                    </td>
                    <td>
                      {player['curr-rank']}
                    </td>
                    <td>
                      {player['%own']}
                    </td>
                    <td>
                      {player.min}
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
                  </tr>);
              })}

                {sumAllRow(team.playerData)}
            }

              </table>
            </ul>
            );
        })}
        </div>
        }
      </List>
    </div>
  );
};

MainDashboardSection.propTypes = {
  fantasyData: PropTypes.object.isRequired

};

export default MainDashboardSection;
