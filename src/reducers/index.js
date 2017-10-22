import { combineReducers } from 'redux'
import * as types from '../types'

const products = (
  state = {
    isFetching: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        items: action.items,
        isFetching: false
      }
    case types.CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        payload: action,
        isFetching: false
      }
    case types.EDIT_PRODUCT_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.EDIT_PRODUCT_REQUEST:
      return {
        ...state,
        payload: action,
        isFetching: false
      }
    case types.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        payload: action,
        isFetching: false
      }
    default:
      return state
  }
}

const customers = (
  state = {
    isFetching: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case types.FETCH_CUSTOMERS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        items: action.items,
        isFetching: false
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({ products, customers })

export default rootReducer
