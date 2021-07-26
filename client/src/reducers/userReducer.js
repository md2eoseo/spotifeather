import { RESET_USER, SET_TOKEN } from '../actions/userActions';

const initState = { accessToken: null, refreshToken: null };

export default function reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TOKEN: {
      const { accessToken, refreshToken } = payload;
      if (accessToken) {
        window.localStorage.setItem('accessToken', payload.accessToken);
      }
      if (refreshToken) {
        window.localStorage.setItem('refreshToken', payload.refreshToken);
      }
      return { ...state, ...payload };
    }
    case RESET_USER: {
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
      return { ...initState };
    }
    default:
      return state;
  }
}
