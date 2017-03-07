import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LeagueOverlaySection from '../components/LeagueOverlaySection';

// import { somethings} from '../actions/images';
//import styles from '../css/components/vote';

injectTapEventPlugin();

//const cx = classNames.bind(styles);

class Dashboard extends Component {
  render() {
    const props = this.props;
    return (
      <div >
        <LeagueOverlaySection
          fantasyLeagues={props.fantasyLeagues}
         />
      </div>
    );
  }
}

Dashboard.propTypes = {
  fantasyLeagues: PropTypes.object
};

function mapStateToProps(state) {
  return {
    fantasyLeagues: state.leagues
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { })(Dashboard);
