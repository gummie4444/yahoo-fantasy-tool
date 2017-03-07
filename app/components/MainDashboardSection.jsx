import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import LeagueItems from './LeagueItems';

import nbaImage from '../images/nba-logo-transparent-png-logo-download.png';
import styles from '../css/components/leagueItem.css';

const cx = classNames.bind(styles);

const MainDashboardSection = ({fantasyLeagues}) => {
  return (
    <LeagueItems fantasyLeagues={fantasyLeagues}/>
  );
};

MainDashboardSection.propTypes = {
  fantasyLeagues: PropTypes.object.isRequired

};

export default MainDashboardSection;
