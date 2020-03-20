import axios from 'axios';

import {
  FETCH_FAILURE, FETCH_SUCCESS, FETCH_REQUEST, REMOVE_ELEMENTS, ADD_NEW_ELEMENT, EDIT_ELEMENT
} from '../../Constants/ActionTypes';

export const removeElements = (keys) => ({
  type: REMOVE_ELEMENTS,
  keysToDelete: keys,
});

export const editElement = (editedObject) => ({
  type: EDIT_ELEMENT,
  changedObject: editedObject,
});

export const addNewElement = (newAddedObject) => ({
  type: ADD_NEW_ELEMENT,
  addedObject: newAddedObject,
});

// export const editNewElement = (editedNewObject) => ({
//   type: EDIT_NEW_ELEMENT,
//   changedNewObject: editedNewObject,
// });

export const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

export const fetchSuccess = (res) => ({
  type: FETCH_SUCCESS,
  payload: res,
}
);

export const fetchFailure = (error) => ({
  type: FETCH_FAILURE,
  payload: error,
});

const PeopleUrl = new URL('/https://swapi.co/api/people', 'https://cors-anywhere.herokuapp.com');

const PlanetUrl = new URL('/https://swapi.co/api/planets', 'https://cors-anywhere.herokuapp.com');

export const fetchPeople = () => (dispatch) => {
  dispatch(fetchRequest());
  axios.get(PeopleUrl)
    .then((response) => {
      dispatch(fetchSuccess(response.data.results));
    })
    .catch((error) => {
      dispatch(fetchFailure(error.message));
    });
};

export const fetchPlanets = () => (dispatch) => {
  dispatch(fetchRequest());
  axios.get(PlanetUrl)
    .then((response) => {
      dispatch(fetchSuccess(response.data.results));
    })
    .catch((error) => {
      dispatch(fetchFailure(error.message));
    });
};
