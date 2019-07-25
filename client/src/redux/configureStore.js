import { createStore, combineReducers } from 'redux';
import mainReducer from './reducers/main';

export default function configureStore() {
  const combinedReducers = combineReducers({ main: mainReducer });
  const store = createStore(combinedReducers);
  return store;
}
