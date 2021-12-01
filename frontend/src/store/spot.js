import { csrfFetch } from './csrf';

const SET_SPOTS = 'spot/setSpots';


const setSpots = (spots) => {
  return {
    type: SET_SPOTS,
    payload: spots,
  };
};



export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  const data = await response.json();
  dispatch(setSpots(data));
  return response;
};




const initialState = { spots: null };

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_SPOTS:
      newState = Object.assign({}, state);
      newState.spots = action.payload;
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
