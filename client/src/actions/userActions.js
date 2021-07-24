export const SET_ACCESS_TOKEN = 'user/SET_ACCESS_TOKEN';
export const SET_ACCESS_TOKEN_INVALID = 'user/SET_ACCESS_TOKEN_INVALID';
export const RESET_USER = 'user/RESET_USER';

export const setAccessToken = payload => ({
  type: SET_ACCESS_TOKEN,
  payload,
});

export const setAccessTokenInvalid = () => ({
  type: SET_ACCESS_TOKEN_INVALID,
});

export const resetUser = () => ({
  type: RESET_USER,
});
