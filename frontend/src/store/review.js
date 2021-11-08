import { csrfFetch } from './csrf';

const SET_REVIEWS = 'review/setReviews';
const REMOVE_REVIEWS = 'review/removeReviews';
const GET_USERS = 'review/getUsers';
const ADD_REVIEW = 'review/addReview';
const DELETE_REVIEW = 'review/deleteReview';


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

const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review
  };
};

//////////////////////////////////////////////////////////
const deleteReview = (review) => {
  return {
    type: DELETE_REVIEW,
    payload: review
  };
};
//////////////////////////////////////////////////////////



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


export const addUserReview = (userId, spotId, review) => async (dispatch) => {
  console.log("@@@@@@@@@@@@@@@ ", userId, spotId, review);
  const response = await csrfFetch('/api/reviews/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      spotId,
      review
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addReview(data));
    return response;
  } else {
    return ['An error occurred. Please try again.']
  }

};


//////////////////////////////////////////////////////////////  (userId, spotId, review) OR createdAt
export const deleteUserReview = (userId, spotId, review) => async (dispatch) => {
  const response = await csrfFetch('/api/reviews/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      spotId,
      review
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteReview(data));
    return response;
  } else {
    return ['An error occurred. Please try again.']
  }

};
////////////////////////////////////////////////////////////////////




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
    case GET_USERS:
      if (state.reviews) {
        newState = {...state, reviews: [...state.reviews], users: action.payload};
      } else if (!state.reviews) {
          newState = {...state, users: action.payload};
      }
      return newState;
    case ADD_REVIEW:
      newState = {...state, reviews: [...state.reviews], users: {...state.users}};
      newState.reviews.push(action.payload["NEW REVIEW"]);
      return newState;
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    case DELETE_REVIEW:
      // console.log(action.payload);
      newState = {...state, reviews: [...state.reviews], users: {...state.users}};
      for (let i = 0; i < newState.reviews.length; ++i) {
        if (newState.reviews[i].createdAt === action.payload["DELETED REVIEW"].createdAt) {
          if (i > -1) {
            newState.reviews.splice(i, 1);
            break;
          }
        }
      }
      return newState;
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    default:
      return state;
  }
};

export default reviewReducer;
