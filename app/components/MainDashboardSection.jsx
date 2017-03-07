import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';

import nbaImage from '../images/nba-logo-transparent-png-logo-download.png';
import styles from '../css/components/leagueItem.css';


const cx = classNames.bind(styles);

// TODO MOVE ALL THIS TO DIFFRIENT COMPONENTS
const MainDashboardSection = ({fantasyLeagues}) => {
  return (
    // TODO move to component
    <div className={cx('leagueItemsWraper')}>
      {fantasyLeagues && fantasyLeagues !== 'error' && fantasyLeagues.map(league => {
        return (
          <div className={cx('leagueItemWraper')}>
            <div className={cx('leagueItemHeader')}>
              <h1 className={cx('leagueItemHeaderText')}>{league.name}</h1>
              <div className={cx('leagueItemImageWraper')}>
                <img className={cx('leagueItemImage')} src={nbaImage} />
              </div>
            </div>
            <div className={cx('leagueItemTextWraper')}>
              <div className={cx('leagueItemText')}>
                <p><span className={cx('leagueItemTextHeader')}>Teams</span></p>
                <span className={cx('leagueItemTextSubHeader')}>{league.num_teams}</span>
              </div>
              <div className={cx('leagueItemText')}>
                <p><span className={cx('leagueItemTextHeader')}>Type</span></p>
                <span className={cx('leagueItemTextSubHeader')}>{league.scoring_type}</span>
              </div>
              <div className={cx('leagueItemText')}>
                <p><span className={cx('leagueItemTextHeader')}>Season</span></p>
                <span className={cx('leagueItemTextSubHeader')}>{league.season}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

MainDashboardSection.propTypes = {
  fantasyLeagues: PropTypes.object.isRequired

};

export default MainDashboardSection;
