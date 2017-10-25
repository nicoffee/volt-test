import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './reducers'

const configureStore = () => {
  const middlewares = [ReduxThunk]
  /* eslint-disable no-undef */
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-enable */
    middlewares.push(logger)
  }

  return createStore(rootReducer, applyMiddleware(...middlewares))
}

export default configureStore
