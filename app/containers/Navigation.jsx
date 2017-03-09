import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import { home } from '../actions/league';
import styles from '../css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut, home}) => {

    return (
      <nav className={cx('navigation')} role="navigation">
        <Link
          to="/"
          onClick={home}
          className={cx('item', 'logo')}
          activeClassName={cx('active')}>fantasy analyser gummar</Link>
          { user.authenticated &&
            <Link
             onClick={logOut}
             className={cx('item')} to="/">Logout</Link>
          }

        <Link to="/about" className={cx('item')} activeClassName={cx('active')}>About</Link>
      </nav>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired,
  home: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut, home })(Navigation);
