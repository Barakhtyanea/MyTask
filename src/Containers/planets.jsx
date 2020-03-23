import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '../Components/Table';
import {
  fetchFailure, fetchPlanets, fetchRequest, fetchSuccess,
} from '../Store/actions/RootActions';


const label = {
  labelName: 'Name',
  labelElementTwo: 'Climate',
  labelElementThree: 'Terrain',
  labelElementFour: 'Population',
};

const value = {
  valueOne: 'name',
  valueTwo: 'climate',
  valueThree: 'terrain',
  valueFour: 'population',
};

class Planets extends Component {
  componentDidMount() {
    this.props.fetchPlanets();
  }

  render() {
    return (
      <Table {...this.props} labels={label} values={value} />
    );
  }
};

Planets.propTypes = {
  labelName: PropTypes.string,
  labelElementTwo: PropTypes.string,
  labelElementThree: PropTypes.string,
  labelElementFour: PropTypes.string,
  valueOne: PropTypes.string,
  valueTwo: PropTypes.string,
  valueThree: PropTypes.string,
  valueFour: PropTypes.string,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest()),
  fetchSuccess: () => dispatch(fetchSuccess()),
  fetchFailure: () => dispatch(fetchFailure()),
  fetchPlanets: () => dispatch(fetchPlanets()),
}
);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Planets));
