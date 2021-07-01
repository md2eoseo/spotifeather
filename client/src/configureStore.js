import { combineReducers, createStore } from 'redux';
import reducers from './reducers';

const store = initStates =>
  createStore(combineReducers(reducers), initStates, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
