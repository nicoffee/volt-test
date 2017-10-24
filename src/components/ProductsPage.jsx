import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import {
  Table,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Grid,
  Row,
  PageHeader
} from 'react-bootstrap'
import {
  fetchProducts,
  addProduct,
  editProduct,
  deleteProduct
} from '../actions/products'
import ProductModal from './Modals/ProductModal'
import DeleteModal from './Modals/DeleteModal'

import uuid from 'uuid'

class ProductsPage extends Component {
  constructor() {
    super()

    this.state = {
      isModalOpen: false,
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      formData: {
        id: uuid(),
        name: null,
        price: null
      },
      currentId: null,
      currentFormData: {
        name: '',
        price: ''
      }
    }

    this.toggleModal = this.toggleModal.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.submitData = this.submitData.bind(this)
    this.submitDataEdit = this.submitDataEdit.bind(this)
    this.submitDataDelete = this.submitDataDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
  }

  onEditClick(e) {
      e.preventDefault()
      this.setState({
        currentFormData: {
          name: item.name,
          price: item.price
        },
        currentId: item.id,
        isEditModalOpen: !this.state.isEditModalOpen
      })
  }

  componentDidMount() {
    this.props.dispatch(fetchProducts())
  }

  submitData(e) {
    e.preventDefault()
    this.props.dispatch(addProduct(this.state.formData))
    this.toggleModal()
  }

  submitDataEdit(e) {
    e.preventDefault()
    this.props.dispatch(
      editProduct(this.state.currentId, this.state.currentFormData)
    )
    this.toggleEditModal()
  }

  submitDataDelete(e) {
    e.preventDefault()
    this.props.dispatch(deleteProduct(this.state.currentId))
    this.toggleDeleteModal()
  }

  handleChange(e) {
    switch (e.target.name) {
      case 'name':
        this.setState({
          formData: {
            ...this.state.formData,
            name: e.target.value
          }
        })
        return
      case 'price':
        this.setState({
          formData: {
            ...this.state.formData,
            price: e.target.value
          }
        })
        return
    }
  }

  handleEditChange(e) {
    switch (e.target.name) {
      case 'name':
        this.setState({
          currentFormData: {
            ...this.state.currentFormData,
            name: e.target.value
          }
        })
        return
      case 'price':
        this.setState({
          currentFormData: {
            ...this.state.currentFormData,
            price: e.target.value
          }
        })
        return
    }
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  toggleEditModal() {
    this.setState({
      isEditModalOpen: !this.state.isEditModalOpen
    })
  }

  toggleDeleteModal() {
    this.setState({
      isDeleteModalOpen: !this.state.isDeleteModalOpen
    })
  }

  render() {
    const { isFetching, products } = this.props

    return isFetching ? (
      <span>Loading...</span>
    ) : (
      <DocumentTitle title="Products">
        <Grid>
          <PageHeader>
            <strong>Product list</strong>{' '}
            <Button onClick={this.toggleModal}>Create</Button>
          </PageHeader>

          <ProductModal
            show={this.state.isModalOpen}
            onHide={this.toggleModal}
            title="Create"
            onSubmit={this.submitData}
            onChange={this.handleChange}
            onClick={this.submitData}
            buttonCaption="Create"
          />

          <ProductModal
            show={this.state.isEditModalOpen}
            onHide={this.toggleEditModal}
            title="Edit"
            onSubmit={this.submitDataEdit}
            name={this.state.currentFormData.name}
            price={this.state.currentFormData.price}
            onChange={this.handleEditChange}
            onClick={this.submitDataEdit}
            buttonCaption="Edit"
          />

          <DeleteModal
            show={this.state.isDeleteModalOpen}
            onHide={this.toggleDeleteModal}
            onClick={this.submitDataDelete}
          />

          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <a
                      href="#"
                      onClick={this.onEditCLick}>
                      edit
                    </a>
                  </td>
                  <td>
                    <a
                      style={{ color: 'red' }}
                      href="#"
                      onClick={e => {
                        e.preventDefault()
                        this.setState({
                          currentId: item.id,
                          isDeleteModalOpen: !this.state.isDeleteModalOpen
                        })
                      }}>
                      delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Grid>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.items
})

export default connect(mapStateToProps)(ProductsPage)
