import { csrfFetch } from './csrf';

const SET_REVIEWS = 'review/setReviews';
const REMOVE_REVIEWS = 'review/removeReviews';
const GET_USERS = 'review/getUsers';


// ACTION CREATORS
const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    payload: reviews,
  };
};



const removeReviews = () => {
  return {
    type: REMOVE_REVIEWS
  };
};


const getUsers = (users) => {
  return {
    type: GET_USERS,
    payload: users
  };
};



// THUNKS
export const getAllReviews = () => async (dispatch) => {
  const response = await csrfFetch('/api/reviews');
  const data = await response.json();
  dispatch(setReviews(data));
  return response;
};



export const removeAllReviews = () => async (dispatch) => {
  dispatch(removeReviews());
  return;
};



export const getAllUsers = () => async (dispatch) => {
  const response = await csrfFetch('/api/users/users');
  if (response.ok) {
    const data = await response.json();
    dispatch(getUsers(data));
    return response;
  } else {
    return ['An error occurred. Please try again.']
  }

};




// REDUCER
const initialState = { reviews: null, users: null };

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_REVIEWS:
      newState = Object.assign({}, state);
      newState.reviews = action.payload;
      return newState;
    case REMOVE_REVIEWS:
      newState = Object.assign({}, state);
      newState.reviews = null;
      return newState;
      ////////////////////////////////
    case GET_USERS:
      newState = {...state, reviews: [...state.reviews], users: action.payload};
      return newState;
      ////////////////////////////////
    default:
      return state;
  }
};

export default reviewReducer;
