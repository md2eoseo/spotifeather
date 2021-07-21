import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAccessToken } from './actions/userActions';
import qs from 'querystring';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const { search } = useLocation();
  const { accessToken } = qs.parse(search.substr(1));
  const dispatch = useDispatch();
  const setAccessTokenWithCurrentUser = payload => dispatch(setAccessToken(payload));

  useEffect(() => {
    if (accessToken) {
      setAccessTokenWithCurrentUser({ accessToken, accessTokenValid: true });
    } else {
      const localStorageAccessToken = window.localStorage.getItem('accessToken');
      if (localStorageAccessToken) {
        setAccessTokenWithCurrentUser({ accessToken: localStorageAccessToken, accessTokenValid: true });
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
