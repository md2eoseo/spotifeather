import './App.css';
import Header from './components/Header';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import Main from './components/Main';

function App(props) {
  const store = configureStore({
    coord: { lat: 0, long: 0 },
    weather: { id: 0, main: '', description: '', icon: '', place: '', temp: 0, sunrise: 0, sunset: 0 },
    user: {},
    playlists: [],
  });

  return (
    <Provider store={store}>
      <div className="App">
        <div className="bg">
          <Header />
          <Main />
        </div>
      </div>
    </Provider>
  );
}

export default App;
