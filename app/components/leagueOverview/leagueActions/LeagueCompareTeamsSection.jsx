import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import styles from '../../../css/components/leagueOverview.css';

const cx = classNames.bind(styles);

const LeagueOverviewSection = ({currentLeague}) => {

  return (
    <div>
      CompareTeams + {currentLeague.name}
    </div>
  );
};

LeagueOverviewSection.propTypes = {
  currentLeague: PropTypes.object.isRequired
};

export default LeagueOverviewSection;

