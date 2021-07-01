import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCoord } from '../actions/coordActions';
import { setWeather } from '../actions/weatherActions';

function Header() {
  const dispatch = useDispatch();
  const coord = useSelector(state => state.coord);
  const weather = useSelector(state => state.weather);
  const setCoordFromDevice = (lat, long) => dispatch(setCoord({ lat, long }));
  const setCurrentWeather = weather => dispatch(setWeather(weather));

  // 좌표 불러오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude.toFixed(4);
      let long = position.coords.longitude.toFixed(4);
      setCoordFromDevice(lat, long);
      console.log('좌표 불러오기');
    });
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
          console.log('날씨 불러오기');
        });
  }, [coord]);

  return (
    <header className="header">
      <div>Spotifeather</div>
      <div className="weather">
        {weather?.place && `${weather.place}`}
        {weather?.place && weather?.temp && ` / `}
        {weather?.temp && `${weather.temp}℃`}
        {weather?.icon && <img src={`http://openweathermap.org/img/wn/${weather.icon}.png`} alt={weather.main} />}
      </div>
    </header>
  );
}

export default Header;
