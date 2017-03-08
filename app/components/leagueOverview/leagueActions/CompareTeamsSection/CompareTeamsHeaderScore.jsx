import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import styles from '../../../../css/components/leagueOverview.css';

const cx = classNames.bind(styles);

const CompareTeamsHeaderScore = ({leftPoints, rightPoints, customClassName}) => {
  return (
    <div className={customClassName}>
      {leftPoints + ' - ' + rightPoints}
    </div>
  );
};

CompareTeamsHeaderScore.propTypes = {
  leftPoints: PropTypes.number.isRequired,
  rightPoints: PropTypes.number.isRequired,
  customClassName: PropTypes.string.isRequired
};

export default CompareTeamsHeaderScore;
