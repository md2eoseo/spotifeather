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

  // 날씨에 맞는 플레이리스트 검색어 랜덤 선택
  const chooseCategoryTerm = () => {
    const prefix = weather.id % 800 === 0 ? 0 : weather.id % 100;
    const category = {
      0: ['clear sky', 'sunny day', 'blue sky day'],
      2: ['thunder', 'thunderstorm', 'lightning night', 'thunder night'],
      3: ['drizzle', 'drizzle night', 'drizzle morning'],
      5: ['raining', 'raining night', 'raining cafe', 'raining morning'],
      6: ['snowy', 'snowing night', 'snowing cafe', 'snowflake'],
      7: ['foggy', 'foggy morning'],
      8: ['cloudy morning', 'cloudy night', 'cloudy'],
    };
    const randomNum = getRandomNum(category[prefix].length);
    return category[prefix][randomNum];
  };
  const getRandomNum = max => {
    return Math.floor(Math.random() * max);
  };

  useEffect(() => {
    if (accessToken) setAccessTokenWithCurrentUser(accessToken);
  }, []);

  // 플레이리스트 불러오기
  useEffect(() => {
    if (user.token) {
      const term = chooseCategoryTerm(weather);
      console.log(term);
      var headers = new Headers();
      headers.append('Authorization', `Bearer ${user.token}`);
      fetch(`https://api.spotify.com/v1/search?q=${term}&type=playlist&limit=4`, { headers })
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
