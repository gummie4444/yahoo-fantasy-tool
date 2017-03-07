import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import LeagueItems from './LeagueItems';

import nbaImage from '../images/nba-logo-transparent-png-logo-download.png';
import styles from '../css/components/leagueItem.css';

const cx = classNames.bind(styles);

const MainDashboardSection = ({fantasyLeagues, pickLeague}) => {
  return (
    <LeagueItems fantasyLeagues={fantasyLeagues} clickLeague={pickLeague}/>
  );
};

MainDashboardSection.propTypes = {
  fantasyLeagues: PropTypes.object.isRequired,
  pickLeague: PropTypes.func.isRequired

};

export default MainDashboardSection;
