

import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import styles from '../../../../css/components/leagueOverview.css';

const cx = classNames.bind(styles);

const CompareTeamsMainPlayer = ({player}) => {
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
};

CompareTeamsMainPlayer.propTypes = {
  player: PropTypes.object.isRequired
};

export default CompareTeamsMainPlayer;
