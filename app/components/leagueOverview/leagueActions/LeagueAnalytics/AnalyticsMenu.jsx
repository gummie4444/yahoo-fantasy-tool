import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import styles from '../../../../css/components/analytics.css';

const cx = classNames.bind(styles);

const AnalyticsMenu = ({teams}) => {
  return (
    <div className={cx('Analytics-Menu')}>

    </div>
  );
};

AnalyticsMenu.propTypes = {

};

export default AnalyticsMenu;
