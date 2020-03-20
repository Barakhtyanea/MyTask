import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  fetchPeople, fetchFailure, fetchRequest, fetchSuccess,
} from '../Store/actions/RootActions';
import Table from '../Components/Table';


const label = {
  labelName: 'Name',
  labelElementTwo: 'Birth year',
  labelElementThree: 'Eye color',
  labelElementFour: 'Hair color',
};

const value = {
  valueOne: 'name',
  valueTwo: 'birth_year',
  valueThree: 'eye_color',
  valueFour: 'hair_color',
};

class People extends Component {
  componentDidMount() {
    this.props.fetchPeople();
  }

  render() {
    return (
      <Table {...this.props} labels={label} values={value} />
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest()),
  fetchSuccess: () => dispatch(fetchSuccess()),
  fetchFailure: () => dispatch(fetchFailure()),
  fetchPeople: () => dispatch(fetchPeople()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(People));

People.propTypes = {
  labelName: PropTypes.string,
  labelElementTwo: PropTypes.string,
  labelElementThree: PropTypes.string,
  labelElementFour: PropTypes.string,
  valueOne: PropTypes.string,
  valueTwo: PropTypes.string,
  valueThree: PropTypes.string,
  valueFour: PropTypes.string,
};
