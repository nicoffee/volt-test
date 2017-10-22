import React, { Component } from 'react'
import { connect } from 'react-redux'
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
      currentId: null
    }

    this.toggleModal = this.toggleModal.bind(this)
    this.submitData = this.submitData.bind(this)
    this.submitDataEdit = this.submitDataEdit.bind(this)
    this.submitDataDelete = this.submitDataDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
    this.props.dispatch(editProduct(this.state.currentId, this.state.formData))
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

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {
    const { isFetching, products } = this.props

    return isFetching ? (
      <span>Loading...</span>
    ) : (
      <Grid>
        <PageHeader>
          <strong>Product list</strong>{' '}
          <Button onClick={this.toggleModal}>Create</Button>
        </PageHeader>

        <Modal show={this.state.isModalOpen} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitData}>
              <FormGroup>
                <ControlLabel>Working example with validation</ControlLabel>
                <FormControl
                  name="name"
                  type="text"
                  placeholder="Enter text"
                  onChange={this.handleChange}
                />
                <FormControl
                  name="price"
                  type="text"
                  placeholder="Enter price"
                  onChange={this.handleChange}
                />
                <button type="submit">Subli</button>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.toggleModal}>Close</button>
            <button onClick={this.submitData}>Create</button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.isEditModalOpen} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitData}>
              <FormGroup>
                <ControlLabel>Working example with validation</ControlLabel>
                <FormControl
                  name="name"
                  type="text"
                  placeholder="Enter text"
                  onChange={this.handleChange}
                />
                <FormControl
                  name="price"
                  type="text"
                  placeholder="Enter price"
                  onChange={this.handleChange}
                />
                <button type="submit">Subli</button>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.toggleModal}>Close</button>
            <button onClick={this.submitDataDelete}>Delete</button>
            <button onClick={this.submitDataEdit}>Edit</button>
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
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.items
})

export default connect(mapStateToProps)(ProductsPage)
