export const SET_USER = 'user/SET_USER';
export const SET_ACCESS_TOKEN = 'user/SET_ACCESS_TOKEN';

export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const setAccessToken = token => ({
  type: SET_ACCESS_TOKEN,
  payload: token,
});
