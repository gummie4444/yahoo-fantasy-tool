import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { List } from 'material-ui/List';
import _ from 'lodash';
import Dropdown from 'react-dropdown';


import styles from '../../../../css/components/leagueOverview.css';

const cx = classNames.bind(styles);

const CompareTeamsHeaderTeam = ({options, change, initValue, customClassName}) => {
  console.log(initValue,'value');
  return (
    <div className={customClassName}>
      <Dropdown style={{zIndex:'10000'}} options={options} onChange={change} value={initValue} />
    </div>
  );
};

CompareTeamsHeaderTeam.propTypes = {
  options: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  initValue: PropTypes.object.isRequired,
  customClassName: PropTypes.string.isRequired
};

export default CompareTeamsHeaderTeam;
