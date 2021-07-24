import { RESET_USER, SET_ACCESS_TOKEN, SET_ACCESS_TOKEN_INVALID } from '../actions/userActions';

const initState = { accessToken: null, accessTokenValid: false };

export default function reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ACCESS_TOKEN: {
      window.localStorage.setItem('accessToken', payload.accessToken);
      return { ...state, ...payload };
    }
    case SET_ACCESS_TOKEN_INVALID: {
      window.localStorage.removeItem('accessToken');
      return { ...state, ...payload };
    }
    case RESET_USER: {
      window.localStorage.removeItem('accessToken');
      return { ...initState };
    }
    default:
      return state;
  }
}
