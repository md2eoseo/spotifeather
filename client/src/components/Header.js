import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCoord } from '../actions/coordActions';
import { resetPlaylists } from '../actions/playlistsActions';
import { setWeather } from '../actions/weatherActions';
import ReactLoading from 'react-loading';
import { resetUser } from '../actions/userActions';

function Header() {
  const dispatch = useDispatch();
  const coord = useSelector(state => state.coord);
  const weather = useSelector(state => state.weather);
  const user = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const setCoordFromDevice = (lat, long) => dispatch(setCoord({ lat, long }));
  const setCurrentWeather = weather => dispatch(setWeather(weather));
  const resetPL = () => dispatch(resetPlaylists());

  const logout = () => {
    dispatch(resetUser());
    window.location.href = '/';
  };

  const getCoord = () => {
    setLoading(true);
    resetPL();
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude.toFixed(4);
        let long = position.coords.longitude.toFixed(4);
        setCoordFromDevice(lat, long);
        console.log('좌표 불러오기');
      },
      error => {
        setLoading(false);
        console.log(error);
      }
    );
  };

  // 좌표 불러오기
  useEffect(() => {
    if (coord.lat === 0 && coord.long === 0) {
      getCoord();
    }
  }, []);

  // 날씨 불러오기
  useEffect(() => {
    if (coord.lat !== 0 || coord.long !== 0)
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.long}&appid=${process.env.REACT_APP_OPEN_WEATHER_APP_ID}&units=metric`
      )
        .then(res => res.json())
        .then(data => {
          const { id, main, description, icon } = data.weather[0];
          const {
            name: place,
            main: { temp },
            sys: { sunrise, sunset },
          } = data;
          setCurrentWeather({ id, main, description, icon, place, temp, sunrise, sunset });
          setLoading(false);
          console.log('날씨 불러오기');
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
  }, [coord]);

  return (
    <header>
      <div
        onClick={() => {
          window.location.href = '/';
        }}
      >
        Spotifeather
      </div>
      <div className="weather">
        {loading ? (
          <ReactLoading type="bubbles" color="#fff" width="100px" />
        ) : (
          <div>
            {weather?.place && `${weather.place} / `}
            {weather?.temp !== 0 && `${weather.temp}℃`}
            {weather?.icon && <img src={`http://openweathermap.org/img/wn/${weather.icon}.png`} alt={weather.main} />}
          </div>
        )}
        <button className="locationBtn" onClick={getCoord} disabled={loading}></button>
        {user.accessToken && <button className="logoutBtn" onClick={logout}></button>}
      </div>
    </header>
  );
}

export default Header;
