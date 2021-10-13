import { csrfFetch } from './csrf';

const SET_BOOKINGS = 'booking/setBookings';
const REMOVE_BOOKINGS = 'booking/removeBookings';


const setBookings = (bookings) => {
  return {
    type: SET_BOOKINGS,
    payload: bookings,
  };
};

const removeBookings = () => {
  return {
    type: REMOVE_BOOKINGS
  };
};



export const getUserBookings = () => async (dispatch) => {
  const response = await csrfFetch('/api/bookings');
  const data = await response.json();
  dispatch(setBookings(data));
  return response;
};



export const removeUserBookings = () => async (dispatch) => {
  dispatch(removeBookings());
  return;
};




const initialState = { bookings: null };

const bookingReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_BOOKINGS:
      newState = Object.assign({}, state);
      newState.bookings = action.payload;
      return newState;
    case REMOVE_BOOKINGS:
      newState = Object.assign({}, state);
      newState.bookings = null;
      return newState;
    default:
      return state;
  }
};

export default bookingReducer;
