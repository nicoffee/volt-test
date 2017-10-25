import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, PageHeader } from 'react-bootstrap'
import Loader from 'react-loader'
import {
  fetchProducts,
  addProduct,
  editProduct,
  deleteProduct
} from '../actions/products'
import FormModal from './Modals/FormModal'
import DeleteModal from './Modals/DeleteModal'
import ContentTable from './ContentTable'
import Layout from './Layout'

class ProductsPage extends Component {
  constructor() {
    super()

    this.state = {
      isModalOpen: false,
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      formData: {
        name: '',
        price: ''
      },
      currentFormData: {
        name: '',
        price: ''
      },
      currentId: null
    }

    this.toggleModal = this.toggleModal.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.submitData = this.submitData.bind(this)
    this.submitDataEdit = this.submitDataEdit.bind(this)
    this.submitDataDelete = this.submitDataDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleEditCLick = this.handleEditCLick.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchProducts())
  }

  handleEditCLick(e, item) {
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

  handleDeleteClick(e, item) {
    e.preventDefault()
    this.setState({
      currentId: item.id,
      isDeleteModalOpen: !this.state.isDeleteModalOpen
    })
  }

  submitData(e) {
    e.preventDefault()
    this.props.dispatch(
      addProduct({
        ...this.state.formData,
        price: this.state.formData.price
      })
    )
    this.setState({
      formData: {
        name: '',
        price: ''
      }
    })
    this.toggleModal()
  }

  submitDataEdit(e) {
    e.preventDefault()
    this.props.dispatch(
      editProduct(this.state.currentId, this.state.currentFormData)
    )
    this.setState({
      currentFormData: {
        name: '',
        price: ''
      }
    })
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

    const Modals = [
      <FormModal
        key="create_modal"
        page="products"
        title="Create"
        buttonCaption="Create"
        show={this.state.isModalOpen}
        onHide={this.toggleModal}
        onSubmit={this.submitData}
        onChange={this.handleChange}
        onClick={this.submitData}
      />,

      <FormModal
        key="edit_modal"
        page="products"
        title="Edit"
        buttonCaption="Edit"
        show={this.state.isEditModalOpen}
        onHide={this.toggleEditModal}
        onSubmit={this.submitDataEdit}
        name={this.state.currentFormData.name}
        price={this.state.currentFormData.price}
        onChange={this.handleEditChange}
        onClick={this.submitDataEdit}
      />,

      <DeleteModal
        key="delete_modal"
        show={this.state.isDeleteModalOpen}
        onHide={this.toggleDeleteModal}
        onClick={this.submitDataDelete}
      />
    ]

    return (
      <Layout title="Products">
        {isFetching ? (
          <Loader />
        ) : (
          [
            <PageHeader key="header">
              <strong>Product list</strong>{' '}
              <Button onClick={this.toggleModal}>Create</Button>
            </PageHeader>,
            <ContentTable
              key="content"
              type="products"
              columns={['#', 'Name', 'Price']}
              items={products}
              onEditClick={this.handleEditCLick}
              onDeleteClick={this.handleDeleteClick}
            />,
            Modals
          ]
        )}
      </Layout>
    )
  }
}

ProductsPage.propTypes = {
  products: PropTypes.array,
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: state.products.items,
  isFetching: state.products.isFetching
})

export default connect(mapStateToProps)(ProductsPage)
