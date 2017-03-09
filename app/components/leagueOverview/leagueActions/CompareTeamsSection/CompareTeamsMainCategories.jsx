import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import styles from '../../../../css/components/leagueOverview.css';

const cx = classNames.bind(styles);

const CompareTeamsMainCategories = ({customClassName}) => {
  const pre = ['position', 'name', 'fgm', 'fga', 'fg%', 'ftm', 'fta', 'ft%', '3pm', 'pts', 'reb', 'ast', 'stl', 'blo', 'to'];

  return (
    <tr className={customClassName}>
      {pre.map(item => {
        return (
          <td key={item}>
            {item}
          </td>
        );
      })}
    </tr>
  );
};

CompareTeamsMainCategories.propTypes = {
  customClassName: PropTypes.string.isRequired
};

export default CompareTeamsMainCategories;
