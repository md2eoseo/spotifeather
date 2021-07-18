import { RESET_COORD, SET_COORD } from '../actions/coordActions';

const initState = { lat: 0, long: 0 };

export default function reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_COORD: {
      return payload;
    }
    case RESET_COORD: {
      return initState;
    }
    default:
      return state;
  }
}
