import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';
import RangePicker from './../RangePicker';


import styles from '../../../../css/components/analytics.css';

const cx = classNames.bind(styles);

const AnalyticsMenu = ({currentLeague, currentRangeType, changeCurrentRange, rangeTypes }) => {
  return (
    <div className={cx('Analytics-Menu')}>
      <RangePicker currentLeague={currentLeague} currentRangeType={currentRangeType} changeCurrentRange={changeCurrentRange} rangeTypes={rangeTypes} />
    </div>
  );
};

AnalyticsMenu.propTypes = {
  currentLeague: PropTypes.object.isRequired,
  currentRangeType: PropTypes.string.isRequired,
  rangeTypes: PropTypes.array.isRequired,
  changeCurrentRange: PropTypes.func.isRequired
};

export default AnalyticsMenu;
