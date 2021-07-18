import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylists } from '../actions/playlistsActions';
import { setAccessToken } from '../actions/userActions';
import qs from 'querystring';
import { useLocation } from 'react-router-dom';
import Playlists from './Playlists';
import Login from './Login';

function Main() {
  const location = useLocation();
  const { access_token: accessToken } = qs.decode(location.search.substr(1));
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const weather = useSelector(state => state.weather);
  const setAccessTokenWithCurrentUser = token => dispatch(setAccessToken(token));
  const setPlaylistsWithRecent = playlists => dispatch(setPlaylists(playlists));

  useEffect(() => {
    if (accessToken) setAccessTokenWithCurrentUser(accessToken);
  }, []);

  // 플레이리스트 불러오기
  useEffect(() => {
    if (user.token) {
      var headers = new Headers();
      headers.append('Authorization', `Bearer ${user.token}`);
      fetch(`https://api.spotify.com/v1/search?q=${weather.main}&type=playlist&limit=4`, { headers })
        .then(res => res.json())
        .then(data => setPlaylistsWithRecent(data?.playlists?.items));
      console.log('플레이리스트 불러오기');
    }
  }, [weather]);

  return (
    <main className="main">
      {!user.token ? (
        <div className="notLoggedIn">
          <p>Get playlists that fit with current weather!</p>
          <Login />
        </div>
      ) : (
        <Playlists />
      )}
    </main>
  );
}

export default Main;
