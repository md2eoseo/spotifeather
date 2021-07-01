import { SET_PLAYLISTS } from '../actions/playlistsActions';

const initState = [];

export default function reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PLAYLISTS: {
      return payload;
    }
    default:
      return state;
  }
}
