import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import _ from 'lodash';

import nbaImage from '../images/nba-logo-transparent-png-logo-download.png';
import styles from '../css/components/leagueItem.css';


const cx = classNames.bind(styles);

// TODO MOVE ALL THIS TO DIFFRIENT COMPONENTS
const LeagueItems = ({fantasyLeagues, clickLeague}) => {
  return (
    // TODO move to component
    <div className={cx('leagueItemsWraper')}>
      {fantasyLeagues && fantasyLeagues !== 'error' && fantasyLeagues.map(league => {
        return (
          <div key={league.league_key} onClick={clickLeague.bind(this, league)} className={cx('leagueItemWraper')}>
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

LeagueItems.propTypes = {
  fantasyLeagues: PropTypes.array.isRequired,
  clickLeague: PropTypes.func.isRequired

};

export default LeagueItems;
