export const SET_ACCESS_TOKEN = 'user/SET_ACCESS_TOKEN';
export const SET_ACCESS_TOKEN_INVALID = 'user/SET_ACCESS_TOKEN_INVALID';

export const setAccessToken = payload => ({
  type: SET_ACCESS_TOKEN,
  payload,
});

export const setAccessTokenInvalid = () => ({
  type: SET_ACCESS_TOKEN_INVALID,
});
