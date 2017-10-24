import axios from 'axios'
import * as types from '../types'

const requestCustomers = () => ({
  type: types.FETCH_CUSTOMERS_REQUEST
})

const receiveCustomers = response => ({
  type: types.FETCH_CUSTOMERS_SUCCESS,
  items: response.data
})

const requestCreateCustomer = () => ({
  type: types.CREATE_CUSTOMER_REQUEST
})

const receiveCreateCustomer = data => ({
  type: types.CREATE_CUSTOMER_SUCCESS,
  payload: data
})

const requestEditCustomer = () => ({
  type: types.EDIT_CUSTOMER_REQUEST
})

const receiveEditCustomer = (id, data) => ({
  type: types.EDIT_CUSTOMER_SUCCESS,
  payload: data,
  id
})

const requestDeleteCustomer = () => ({
  type: types.DELETE_CUSTOMER_REQUEST
})

const receiveDeleteCustomer = id => ({
  type: types.DELETE_CUSTOMER_SUCCESS,
  payload: id
})

export const fetchCustomers = () => dispatch => {
  dispatch(requestCustomers())
  return axios
    .get('/api/customers')
    .then(response => dispatch(receiveCustomers(response)))
}

export const addCustomer = data => dispatch => {
  dispatch(requestCreateCustomer())
  return axios
    .post('/api/products', data)
    .then(response => dispatch(receiveCreateCustomer(data)))
}

export const editCustomer = (id, data) => dispatch => {
  dispatch(requestEditCustomer())
  return axios
    .put(`/api/products/${id}`, data)
    .then(response => dispatch(receiveEditCustomer(id, data)))
}

export const deleteCustomer = id => dispatch => {
  dispatch(requestDeleteCustomer())
  return axios.delete(`/api/products/${id}`).then(response => {
    dispatch(receiveDeleteCustomer(id))
  })
}
