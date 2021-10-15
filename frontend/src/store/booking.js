import { csrfFetch } from './csrf';

const SET_BOOKINGS = 'booking/setBookings';
const REMOVE_BOOKINGS = 'booking/removeBookings';
const CREATE_BOOKING = 'booking/createBooking';


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

const createBooking = (booking) => {
  return {
    type: CREATE_BOOKING,
    payload: booking
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


export const createUserBooking = (spotId, userId, startDate, endDate) => async (dispatch) => {
  const response = await csrfFetch('/api/bookings/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      spotId,
      userId,
      startDate,
      endDate
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createBooking(data))
    return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors
    }
  } else {
    return ['An error occurred. Please try again.']
  }
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
    case CREATE_BOOKING:
      newState = Object.assign({}, state);
      newState.bookings[Object.keys(newState.bookings).length] = action.payload["NEW BOOKING"];
      return newState;
    default:
      return state;
  }
};

export default bookingReducer;
