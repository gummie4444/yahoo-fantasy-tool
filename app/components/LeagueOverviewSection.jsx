import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import styles from '../css/components/leagueItem.css';

const cx = classNames.bind(styles);

const LeagueOverviewSection = ({currentLeague}) => {
  return (
    <div>
      LeagueOverviewSection {currentLeague.name}

      <div>
       compareTeams
      </div>
      <div>
       statistics
      </div>
      <div>
       compareTeams
      </div>
      <div>
       compareTeams
      </div>
    </div>
  );
};

LeagueOverviewSection.propTypes = {
  currentLeague: PropTypes.object.isRequired
};

export default LeagueOverviewSection;
