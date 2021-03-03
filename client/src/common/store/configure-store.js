import { createStore, combineReducers, applyMiddleware } from 'redux';
import mainReducer from './reducers/main';
import chatWebSocketMiddleware from './middlewares/chat-web-socket';

export default function configureStore() {
  const combinedReducers = combineReducers({ main: mainReducer });
  const store = createStore(combinedReducers, applyMiddleware(chatWebSocketMiddleware));
  return store;
}
