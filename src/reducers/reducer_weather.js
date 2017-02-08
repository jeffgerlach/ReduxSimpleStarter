import { FETCH_WEATHER } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_WEATHER:
    //don't mutate state! always return new object
    return [ action.payload.data, ...state ];
  }
  return state;
}
