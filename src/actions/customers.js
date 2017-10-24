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
  type: types.EDIT_PRODUCT_REQUEST
})

const receiveEditCustomer = (id, data) => ({
  type: types.EDIT_PRODUCT_SUCCESS,
  payload: data,
  id
})

export const fetchCustomers = () => dispatch => {
  dispatch(requestCustomers())
  return axios
    .get('/api/customers')
    .then(response => dispatch(receiveCustomers(response)))
}





const requestDeleteProduct = () => ({
  type: types.DELETE_PRODUCT_REQUEST
})

const receiveDeleteProduct = id => ({
  type: types.DELETE_PRODUCT_SUCCESS,
  payload: id
})

export const fetchProducts = () => dispatch => {
  dispatch(requestProducts())
  return axios
    .get('/api/products')
    .then(response => dispatch(receiveProducts(response)))
}

export const addProduct = data => dispatch => {
  dispatch(requestCreateProduct())
  return axios
    .post('/api/products', data)
    .then(response => dispatch(receiveCreateProduct(data)))
}

export const editProduct = (id, data) => dispatch => {
  dispatch(requestEditProduct())
  return axios
    .put(`/api/products/${id}`, data)
    .then(response => dispatch(receiveEditProduct(id, data)))
}

export const deleteProduct = id => dispatch => {
  dispatch(requestDeleteProduct())
  return axios.delete(`/api/products/${id}`).then(response => {
    dispatch(receiveDeleteProduct(id))
  })
}