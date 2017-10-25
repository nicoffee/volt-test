import * as types from '../types'

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
    case types.CREATE_CUSTOMER_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.CREATE_CUSTOMER_SUCCESS:
      console.log('action', action)
      return {
        ...state,
        isFetching: false,
        items: [...state.items, action.payload]
      }
    case types.EDIT_CUSTOMER_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.EDIT_CUSTOMER_SUCCESS:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.id) {
            item = {
              ...item,
              name: action.payload.name,
              address: action.payload.address,
              phone: action.payload.phone
            }
            return item
          }
          return item
        }),
        isFetching: false
      }
    case types.DELETE_CUSTOMER_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: state.items.filter(item => item.id !== action.payload)
      }
    default:
      return state
  }
}

export default customers
