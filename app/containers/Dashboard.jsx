import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MainDashboardSection from '../components/MainDashboardSection';

// import { somethings} from '../actions/images';
//import styles from '../css/components/vote';

injectTapEventPlugin();

//const cx = classNames.bind(styles);

class Dashboard extends Component {
  render() {
    const props = this.props;
    return (
      <div >
        <MainDashboardSection
          fantasyData={props.fantasyData}
         />
      </div>
    );
  }
}

Dashboard.propTypes = {
  fantasyData: PropTypes.object
};

function mapStateToProps(state) {
  return {
    fantasyData: state.league
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { })(Dashboard);
