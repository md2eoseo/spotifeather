export const SET_COORD = 'coord/SET_COORD';
export const RESET_COORD = 'coord/RESET_COORD';

export const setCoord = coord => ({
  type: SET_COORD,
  payload: coord,
});

export const resetCoord = () => ({
  type: RESET_COORD,
});
