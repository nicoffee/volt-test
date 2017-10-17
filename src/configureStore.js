import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import todoApp from './reducers';

const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') { // eslint-disable-line no-undef
    middlewares.push(logger);
  }

  return createStore(todoApp, applyMiddleware(...middlewares));
};

export default configureStore;