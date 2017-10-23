import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import {
  Table,
  Modal,
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

import uuid from 'uuid'

class ProductsPage extends Component {
  constructor() {
    super()

    this.state = {
      isModalOpen: false,
      isEditModalOpen: false,
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
    this.submitData = this.submitData.bind(this)
    this.submitDataEdit = this.submitDataEdit.bind(this)
    this.submitDataDelete = this.submitDataDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchProducts())
  }

  submitData(e) {
    e.preventDefault()
    this.props.dispatch(addProduct(this.state.formData))
  }

  submitDataEdit(e) {
    e.preventDefault()
    console.log('this.state.currentFormData', this.state.currentFormData)
    this.props.dispatch(
      editProduct(this.state.currentId, this.state.currentFormData)
    )
  }

  submitDataDelete(e) {
    e.preventDefault()
    this.props.dispatch(deleteProduct(this.state.currentId))
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
    console.log('this.state', this.state)
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

          <Modal show={this.state.isModalOpen} onHide={this.toggleModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.submitData}>
                <FormGroup>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    name="name"
                    type="text"
                    placeholder="Enter text"
                    onChange={this.handleChange}
                  />
                  <FormGroup />
                  <ControlLabel>Price</ControlLabel>
                  <FormControl
                    name="price"
                    type="text"
                    placeholder="Enter price"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="success" onClick={this.submitData}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={this.state.isEditModalOpen}
            onHide={this.toggleEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.submitData}>
                <FormGroup>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    value={this.state.currentFormData.name}
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    onChange={this.handleEditChange}
                  />
                  <FormGroup />
                  <ControlLabel>Price</ControlLabel>
                  <FormControl
                    value={this.state.currentFormData.price}
                    name="price"
                    type="number"
                    placeholder="Enter price"
                    onChange={this.handleEditChange}
                  />
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="danger" onClick={this.submitDataDelete}>
                Delete
              </Button>
              <Button bsStyle="success" onClick={this.submitDataEdit}>
                Edit
              </Button>
            </Modal.Footer>
          </Modal>

          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
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
                      onClick={e => {
                        e.preventDefault()
                        this.setState({
                          currentFormData: {
                            name: item.name,
                            price: item.price
                          },
                          currentId: item.id,
                          isEditModalOpen: !this.state.isEditModalOpen
                        })
                      }}>
                      edit
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
