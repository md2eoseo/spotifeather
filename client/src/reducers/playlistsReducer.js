import { SET_PLAYLISTS } from '../actions/playlistsActions';
import { RESET_PLAYLISTS } from '../actions/playlistsActions';

const initState = [];

export default function reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PLAYLISTS: {
      return payload;
    }
    case RESET_PLAYLISTS: {
      return initState;
    }
    default:
      return state;
  }
}
