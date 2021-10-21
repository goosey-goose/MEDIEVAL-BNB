import { csrfFetch } from './csrf';

const SET_BOOKINGS = 'booking/setBookings';
const REMOVE_BOOKINGS = 'booking/removeBookings';
const CREATE_BOOKING = 'booking/createBooking';
const SET_ALL_BOOKINGS = 'booking/setAllBookings';
const UPDATE_BOOKING = 'booking/updateBooking';
const DELETE_BOOKING = 'booking/deleteBooking';


// ACTION CREATORS
const setBookings = (bookings) => {
  return {
    type: SET_BOOKINGS,
    payload: bookings,
  };
};

const setAllBookings = (bookings) => {
  return {
    type: SET_ALL_BOOKINGS,
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

const updateBooking = (booking) => {
  return {
    type: UPDATE_BOOKING,
    payload: booking
  };
};

const deleteBooking = (booking) => {
  return {
    type: DELETE_BOOKING,
    payload: booking
  };
};



// THUNKS
export const getUserBookings = () => async (dispatch) => {
  const response = await csrfFetch('/api/bookings');
  const data = await response.json();
  // console.log("**********************************************", data);
  dispatch(setBookings(data));
  return response;
};


export const getAllUserBookings = () => async (dispatch) => {
  const response = await csrfFetch('/api/bookings/all');
  const data = await response.json();
  // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", data);
  dispatch(setAllBookings(data));
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
    if (data.Error === "Booking already exists.") {
      return 'Booking already exists.';
    } else if (data.Error === "Bookings cannot overlap.") {
      return 'Bookings cannot overlap.';
    }
      else {
      dispatch(createBooking(data));
      return null;
    }
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};




export const updateUserBooking = (spotId, userId, startDate, endDate, newStart, newEnd) => async (dispatch) => {
  const response = await csrfFetch('/api/bookings/edit', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      spotId,
      userId,
      startDate,
      endDate,
      newStart,
      newEnd
    })
  });

  if (response.ok) {
    const data = await response.json();
    if (data.Error) {
      return 'Booking already exists.';
    } else {
      dispatch(updateBooking(data));
      return null;
    }
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteUserBooking = (spotId, userId, startDate, endDate) => async (dispatch) => {
  const response = await csrfFetch('/api/bookings/delete', {
    method: 'DELETE',
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
    dispatch(deleteBooking(data));
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









const initialState = { bookings: null, allUserBookings: null };

const bookingReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {


    case SET_BOOKINGS:
      // newState = Object.assign({}, state);
      // console.log(action.payload);
      // newState = {...state, bookings: {...state.bookings}, allUserBookings: {...state.allUserBookings} };
      newState = {...state};
      // newState = {...state, bookings: [...action.payload]};
      // console.log("1111111", action.payload);
      newState.bookings = action.payload;
      return newState;


    case SET_ALL_BOOKINGS:
      newState = {...state, bookings: [...state.bookings]};
      // console.log("222222222", action.payload);
      newState.allUserBookings = action.payload;
      return newState;


    case REMOVE_BOOKINGS:
      newState = {...state};
      newState.bookings = null;
      newState.allUserBookings = null;
      return newState;


    case CREATE_BOOKING:
      // console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU", action.payload);
      // newState = {...state, bookings: {...state, ...state.bookings }, allUserBookings: [ ...state.allUserBookings ]};
      // newState = {...state, bookings: {Bookings: [...state.bookings.Bookings]}, allUserBookings: {...state.allUserBookings}};   // ORIGINAL
      newState = {...state, bookings: [...state.bookings], allUserBookings: [...state.allUserBookings]};
      // console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV", newState);
      // console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", newState);
      // console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", action.payload["NEW BOOKING"]);
      // newState.bookings.Bookings[Object.keys(newState.bookings.Bookings).length] = action.payload["NEW BOOKING"];
      // newState.bookings.Bookings.push(action.payload["NEW BOOKING"]);
      newState.bookings.push(action.payload["NEW BOOKING"]);
      // newState.allUserBookings[Object.keys(newState.allUserBookings).length] = action.payload["NEW BOOKING"];
      newState.allUserBookings.push(action.payload["NEW BOOKING"]);
      return newState;


      case UPDATE_BOOKING:
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // console.log(action.payload);
        // console.log(action.payload["ORIGINAL BOOKING:"].spotId);
        // newState = {...state, bookings: {Bookings: [...state.bookings.Bookings]}, allUserBookings: {...state.allUserBookings}};
        newState = {...state, bookings: [...state.bookings], allUserBookings: [...state.allUserBookings]};
        // console.log("&&&&&&&&&&&&&&&&&&", newState.bookings.Bookings);
        newState.bookings.forEach((booking) => {
          // console.log("######", booking);
          if (booking.spotId === action.payload["ORIGINAL BOOKING:"].spotId && booking.userId === action.payload["ORIGINAL BOOKING:"].userId && booking.startDate === action.payload["ORIGINAL BOOKING:"].startDate && booking.endDate === action.payload["ORIGINAL BOOKING:"].endDate) {
            booking.startDate = action.payload["UPDATED BOOKING"].startDate;
            booking.endDate = action.payload["UPDATED BOOKING"].endDate;
          }
        });
        newState.allUserBookings.forEach((booking) => {
          if (booking.spotId === action.payload["ORIGINAL BOOKING:"].spotId && booking.userId === action.payload["ORIGINAL BOOKING:"].userId && booking.startDate === action.payload["ORIGINAL BOOKING:"].startDate && booking.endDate === action.payload["ORIGINAL BOOKING:"].endDate) {
            booking.startDate = action.payload["UPDATED BOOKING"].startDate;
            booking.endDate = action.payload["UPDATED BOOKING"].endDate;
          }
        });
        return newState;
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


      case DELETE_BOOKING:
        newState = {...state, bookings: [...state.bookings], allUserBookings: [...state.allUserBookings]};
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        console.log(newState.bookings);
        for (let i = 0; i < newState.bookings.length; ++i) {
          if (newState.bookings[i].createdAt === action.payload["DELETED BOOKING"].createdAt && newState.bookings[i].startDate === action.payload["DELETED BOOKING"].startDate) {
            const bookingIndex = i;
            if (bookingIndex > -1) {
              newState.bookings.splice(bookingIndex, 1);
              break;
            }
          }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // newState.bookings.forEach((booking) => {
        //   if (booking.spotId === action.payload["DELETED BOOKING"].spotId && booking.userId === action.payload["DELETED BOOKING"].userId && booking.startDate === action.payload["DELETED BOOKING"].startDate && booking.endDate === action.payload["DELETED BOOKING"].endDate) {
        //     // delete booking;
        //     const i = newState.bookings.indexOf(booking);
        //     if (i > -1) {
        //       newState.bookings.splice(i, 1);
        //     }
        //   }
        // });
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        console.log(newState.allUserBookings);
        for (let i = 0; i < newState.allUserBookings.length; ++i) {
          if (newState.allUserBookings[i].createdAt === action.payload["DELETED BOOKING"].createdAt && newState.allUserBookings[i].startDate === action.payload["DELETED BOOKING"].startDate) {
            const bookingIndex = i;
            if (bookingIndex > -1) {
              newState.allUserBookings.splice(bookingIndex, 1);
              break;
            }
          }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // newState.allUserBookings.forEach((booking) => {
        //   if (booking.spotId === action.payload["DELETED BOOKING"].spotId && booking.userId === action.payload["DELETED BOOKING"].userId && booking.startDate === action.payload["DELETED BOOKING"].startDate && booking.endDate === action.payload["DELETED BOOKING"].endDate) {
        //     // delete booking;
        //     const i = newState.allUserBookings.indexOf(booking);
        //     if (i > -1) {
        //       newState.allUserBookings.splice(i, 1);
        //     }
        //   }
        // });
        return newState;

    default:
      return state;
  }
};

export default bookingReducer;
