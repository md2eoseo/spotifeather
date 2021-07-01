export const SET_WEATHER = 'weather/SET_WEATHER';

export const setWeather = weather => ({
  type: SET_WEATHER,
  payload: weather,
});
