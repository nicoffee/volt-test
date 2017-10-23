import axios from 'axios'
import * as types from '../types'

const requestProducts = () => ({
  type: types.FETCH_PRODUCTS_REQUEST
})

const receiveProducts = response => ({
  type: types.FETCH_PRODUCTS_SUCCESS,
  items: response.data
})

const requestCreateProduct = () => ({
  type: types.CREATE_PRODUCT_REQUEST
})

const receiveCreateProduct = data => ({
  type: types.CREATE_PRODUCT_SUCCESS,
  payload: data
})

const requestEditProduct = () => ({
  type: types.EDIT_PRODUCT_REQUEST
})

const receiveEditProduct = (id, data) => ({
  type: types.EDIT_PRODUCT_SUCCESS,
  payload: data,
  id
})

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
