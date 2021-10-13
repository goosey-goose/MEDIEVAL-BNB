import { csrfFetch } from './csrf';

const SET_REVIEWS = 'review/setReviews';
const REMOVE_REVIEWS = 'review/removeReviews';


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




const initialState = { reviews: null };

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
    default:
      return state;
  }
};

export default reviewReducer;
