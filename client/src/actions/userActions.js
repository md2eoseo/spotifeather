export const SET_TOKEN = 'user/SET_TOKEN';
export const RESET_USER = 'user/RESET_USER';

export const setToken = payload => ({
  type: SET_TOKEN,
  payload,
});

export const resetUser = () => ({
  type: RESET_USER,
});
