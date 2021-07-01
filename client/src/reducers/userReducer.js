import { SET_ACCESS_TOKEN, SET_USER } from '../actions/userActions';

const initState = {};

export default function reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER: {
      return { ...state, ...payload };
    }
    case SET_ACCESS_TOKEN: {
      return { ...state, token: payload };
    }
    default:
      return state;
  }
}
