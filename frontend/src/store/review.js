import { csrfFetch } from './csrf';

const SET_REVIEWS = 'review/setReviews';


const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    payload: reviews,
  };
};



export const getAllReviews = () => async (dispatch) => {
  const response = await csrfFetch('/api/reviews');
  const data = await response.json();
  dispatch(setReviews(data));
  return response;
};




const initialState = { reviews: null };

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_REVIEWS:
      newState = Object.assign({}, state);
      newState.reviews = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
