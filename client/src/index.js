import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './configureStore';
import { Provider } from 'react-redux';

const store = configureStore({
  coord: { lat: 0, long: 0 },
  weather: { id: 0, main: '', description: '', icon: '', place: '', temp: 0, sunrise: 0, sunset: 0 },
  user: { accessToken: null, accessTokenValid: false },
  playlists: [],
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
