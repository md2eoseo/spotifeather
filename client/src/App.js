import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from './actions/userActions';
import qs from 'querystring';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const { search } = useLocation();
  const { accessToken, refreshToken } = qs.parse(search.substr(1));
  const dispatch = useDispatch();
  const setUserToken = payload => dispatch(setToken(payload));

  useEffect(() => {
    if (accessToken && refreshToken) {
      setUserToken({ accessToken, refreshToken });
    } else {
      const localStorageAccessToken = window.localStorage.getItem('accessToken');
      const localStorageRefreshToken = window.localStorage.getItem('refreshToken');
      if (localStorageAccessToken && localStorageRefreshToken) {
        setUserToken({ accessToken: localStorageAccessToken, refreshToken: localStorageRefreshToken });
      }
    }
  }, []);

  return (
    <div className="App">
      <div className="bg">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
