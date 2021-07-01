import { SET_WEATHER } from '../actions/weatherActions';

const initState = { id: 0, main: '', description: '', icon: '', place: '', temp: 0, sunrise: 0, sunset: 0 };

export default function reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_WEATHER: {
      return payload;
    }
    default:
      return state;
  }
}
