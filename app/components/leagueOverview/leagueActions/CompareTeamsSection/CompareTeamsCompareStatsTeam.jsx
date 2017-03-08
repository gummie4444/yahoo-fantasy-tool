import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import styles from '../../../../css/components/leagueOverview.css';

const cx = classNames.bind(styles);

const CompareTeamsCompareStatsTeam = ({team, customClassName}) => {
  return (
    <tr className={customClassName}>
      <td>
        {team['fg%']}
      </td>
      <td>
        {team['ft%'] }
      </td>
      <td>
        {team['3pm']}
      </td>
      <td>
        {team.pts}
      </td>
      <td>
        {team.reb}
      </td>
      <td>
        {team.ass}
      </td>
      <td>
        {team.stl}
      </td>
      <td>
        {team.blo}
      </td>
      <td>
        {team.to}
      </td>
    </tr>
  );
};

CompareTeamsCompareStatsTeam.propTypes = {
  team: PropTypes.object.isRequired,
  customClassName: PropTypes.string.isRequired
};

export default CompareTeamsCompareStatsTeam;
