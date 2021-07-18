export const SET_PLAYLISTS = 'playlists/SET_PLAYLISTS';
export const RESET_PLAYLISTS = 'playlists/RESET_PLAYLISTS';

export const setPlaylists = playlists => ({
  type: SET_PLAYLISTS,
  payload: playlists,
});

export const resetPlaylists = () => ({
  type: RESET_PLAYLISTS,
});
