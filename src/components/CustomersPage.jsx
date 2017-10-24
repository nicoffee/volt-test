import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { Button, Grid, PageHeader } from 'react-bootstrap'
import uuid from 'uuid'
import {
  fetchCustomers,
  addCustomer,
  editCustomer,
  deleteCustomer
} from '../actions/customers'
import FormModal from './Modals/FormModal'
import DeleteModal from './Modals/DeleteModal'
import ContentTable from './ContentTable'

class CustomersPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCustomers())
  }

  constructor() {
    super()

    this.state = {
      isModalOpen: false,
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      formData: {
        id: uuid(),
        name: null,
        address: null,
        phone: null
      },
      currentId: null,
      currentFormData: {
        name: '',
        address: '',
        phone: ''
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
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleEditCLick = this.handleEditCLick.bind(this)
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
    const { isFetching, customers } = this.props

    return isFetching ? (
      <span>Loading...</span>
    ) : (
      <DocumentTitle title="Products">
        <Grid>
          <PageHeader>
            <strong>Product list</strong>{' '}
            <Button onClick={this.toggleModal}>Create</Button>
          </PageHeader>
          <ContentTable
            type="customers"
            columns={['#', 'Name', 'Address', 'Phone']}
            items={customers}
            onEditClick={this.handleEditCLick}
            onDeleteClick={this.handleDeleteClick}
          />

          <FormModal
            page="customers"
            show={this.state.isModalOpen}
            onHide={this.toggleModal}
            title="Create"
            onSubmit={this.submitData}
            onChange={this.handleChange}
            onClick={this.submitData}
            buttonCaption="Create"
          />

          <FormModal
            page="customers"
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
        </Grid>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.customers.isFetching,
  customers: state.customers.items
})

export default connect(mapStateToProps)(CustomersPage)
