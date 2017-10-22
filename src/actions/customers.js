import axios from 'axios'
import * as types from '../types'

const requestCustomers = () => ({
  type: types.FETCH_CUSTOMERS_REQUEST
})

const receiveCustomers = response => ({
  type: types.FETCH_CUSTOMERS_SUCCESS,
  items: response.data
})

export const fetchCustomers = () => dispatch => {
  dispatch(requestCustomers())
  return axios
    .get('/api/customers')
    .then(response => dispatch(receiveCustomers(response)))
}
