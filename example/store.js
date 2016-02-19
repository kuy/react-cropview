import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import logger from 'redux-logger';

const list = [];
if (window && !window.__karma__) {
  list.push(logger());
}

export default createStore(
  reducer,
  applyMiddleware(...list)
);
