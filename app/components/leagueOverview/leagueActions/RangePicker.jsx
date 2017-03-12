import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import _ from 'lodash';
import Loading from 'react-loading';


import leagueUtilService from '../../../services/leagueUtilService';
import styles from '../../../css/components/leagueCompareTeams.css';

const cx = classNames.bind(styles);

class RangePicker extends React.Component {

  constructor(props) {
    super(props);
  }
  
  loadNewRangeData(type) {
    console.log('type', type);
    if(this.props.currentRageType === leagueUtilService.rangeEnum[type]){
      return;
    }
    this.props.changeCurrentRange(type, this.props.rangeTypes, this.props.currentLeague);
  }
  render() {
    const types = ['y2015', 'last30', 'last14', 'last7', 'current'];
    return (
      <div className={cx('compareTeamsButtons')}>
      {types.map(type => {
        return (
          <div key={type} className={cx('compareTeamsButtonsButton')} data-mode={this.props.currentRangeType === leagueUtilService.rangeEnum[type]} onClick={this.loadNewRangeData.bind(this, type)}>
            <span>
              {type}
            </span>
          </div>
        );
      })}
      </div>
    );
  }
}

RangePicker.propTypes = {
  currentRangeType: PropTypes.string.isRequired,
  rangeTypes: PropTypes.array.isRequired,
  changeCurrentRange: PropTypes.func.isRequired,
  currentLeague: PropTypes.object.isRequired
};

export default RangePicker;
