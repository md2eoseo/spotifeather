import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylists } from '../actions/playlistsActions';
import Playlists from './Playlists';
import Login from './Login';
import { setAccessTokenInvalid } from '../actions/userActions';

function Main() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const weather = useSelector(state => state.weather);
  const accessTokenIsInvalid = () => dispatch(setAccessTokenInvalid());
  const setPlaylistsWithRecent = playlists => dispatch(setPlaylists(playlists));

  // 날씨에 맞는 플레이리스트 검색어 랜덤 선택
  const chooseCategoryTerm = () => {
    const prefix = weather.id % 800 === 0 ? 0 : Math.floor(weather.id / 100);
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

  // 플레이리스트 불러오기
  useEffect(() => {
    if (user.accessTokenValid) {
      if (user.accessToken) {
        const term = chooseCategoryTerm(weather);
        fetch(`https://api.spotify.com/v1/search?q=${term}&type=playlist&limit=4`, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
          .then(res => {
            if (!res.ok) {
              accessTokenIsInvalid();
            }
            return res.json();
          })
          .then(data => {
            setPlaylistsWithRecent(data?.playlists?.items);
            console.log('플레이리스트 불러오기');
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }, [weather]);

  return (
    <main>
      {!user.accessTokenValid ? (
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
