export const SET_COORD = 'location/SET_COORD';
export const RESET_COORD = 'location/RESET_COORD';

export const setCoord = coord => ({
  type: SET_COORD,
  payload: coord,
});

export const resetCoord = () => ({
  type: RESET_COORD,
});
