import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Headroom from 'react-headroom';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import { home, leagueAction } from '../actions/league';
import styles from '../css/components/navigation';
import backButton from '../images/back.svg';

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut, home, leagueAction, actionMode}) => {

    return (
      <Headroom>
        <nav className={cx('navigation')} role="navigation">
          {actionMode !== '' &&
            <div className={cx('BackButtonWrapper')}>
              <img className={cx('BackButton')} onClick={leagueAction.bind(this, '')} src={backButton} />
            </div>
          }
          <Link
            to="/"
            onClick={home}
            className={cx('item', 'logo')}
            activeClassName={cx('active')}>NBA Fantasy tool</Link>
            { user.authenticated &&
              <Link
              onClick={logOut}
              className={cx('item')} to="/">Logout</Link>
            }

          <Link to="/about" className={cx('item')} activeClassName={cx('active')}>About</Link>

          {user.profile && user.profile !== {} && <div className={cx('itemUser')}>
            <img className={cx('itemUserImage')} src={user.profile.picture} />
            <span className={cx('itemUserText')}>{user.profile.name}</span>
          </div>
          }
        </nav>
      </Headroom>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired,
  home: PropTypes.func.isRequired,
  leagueAction: PropTypes.func.isRequired,
  actionMode: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    actionMode: state.actionMode
  };
}

export default connect(mapStateToProps, { logOut, home, leagueAction })(Navigation);
