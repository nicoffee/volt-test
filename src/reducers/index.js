import { combineReducers } from 'redux'
import products from './products'
import customers from './customers'

const rootReducer = combineReducers({ products, customers })

export default rootReducer
