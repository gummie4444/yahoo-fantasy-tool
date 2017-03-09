import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import styles from '../../../../css/components/leagueOverview.css';

const cx = classNames.bind(styles);

const CompareTeamsCompareStatsCategories = ({customClassName}) => {
      const preCat = ['team', 'fg%', 'ft%', '3pm', 'pts', 'reb', 'ass', 'stl', 'blo', 'to'];

  return (
    <tr className={customClassName}>
      {preCat.map(item => {
        return (
          <td key={item}>
            {item}
          </td>
        );
      })
      }
    </tr>
  );
};

CompareTeamsCompareStatsCategories.propTypes = {
  customClassName: PropTypes.string.isRequired
};

export default CompareTeamsCompareStatsCategories;
