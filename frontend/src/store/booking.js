import { csrfFetch } from './csrf';

const SET_BOOKINGS = 'booking/setBookings';


const setBookings = (bookings) => {
  return {
    type: SET_BOOKINGS,
    payload: bookings,
  };
};



export const getUserBookings = () => async (dispatch) => {
  const response = await csrfFetch('/api/bookings');
  const data = await response.json();
  dispatch(setBookings(data));
  return response;
};




const initialState = { bookings: null };

const bookingReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_BOOKINGS:
      newState = Object.assign({}, state);
      newState.bookings = action.payload;
      return newState;
    default:
      return state;
  }
};

export default bookingReducer;
