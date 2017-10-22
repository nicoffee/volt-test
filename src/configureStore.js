import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './reducers'

const configureStore = () => {
  const middlewares = [ReduxThunk]

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-line no-undef
    middlewares.push(logger)
  }

  return createStore(rootReducer, applyMiddleware(...middlewares))
}

export default configureStore
