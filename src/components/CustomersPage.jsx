import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, PageHeader } from 'react-bootstrap'
import Loader from 'react-loader'
import FormModal from './Modals/FormModal'
import DeleteModal from './Modals/DeleteModal'
import ContentTable from './ContentTable'
import Layout from './Layout'
import {
  fetchCustomers,
  addCustomer,
  editCustomer,
  deleteCustomer
} from '../actions/customers'

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
        name: '',
        address: '',
        phone: ''
      },
      currentFormData: {
        name: '',
        address: '',
        phone: ''
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

  handleEditCLick(e, item) {
    e.preventDefault()
    this.setState({
      currentFormData: {
        name: item.name,
        address: item.address,
        phone: item.phone
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
    this.props.dispatch(addCustomer(this.state.formData))
    this.setState({
      formData: {
        name: '',
        address: '',
        phone: ''
      }
    })
    this.toggleModal()
  }

  submitDataEdit(e) {
    e.preventDefault()
    this.props.dispatch(
      editCustomer(this.state.currentId, this.state.currentFormData)
    )
    this.setState({
      currentFormData: {
        name: '',
        address: '',
        phone: ''
      }
    })
    this.toggleEditModal()
  }

  submitDataDelete(e) {
    e.preventDefault()
    this.props.dispatch(deleteCustomer(this.state.currentId))
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
      case 'address':
        this.setState({
          formData: {
            ...this.state.formData,
            address: e.target.value
          }
        })
        return
      case 'phone':
        this.setState({
          formData: {
            ...this.state.formData,
            phone: e.target.value
          }
        })
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
      case 'address':
        this.setState({
          currentFormData: {
            ...this.state.currentFormData,
            address: e.target.value
          }
        })
        return
      case 'phone':
        this.setState({
          currentFormData: {
            ...this.state.currentFormData,
            phone: e.target.value
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

    const Modals = [
      <FormModal
        key="create_modal"
        page="customers"
        show={this.state.isModalOpen}
        onHide={this.toggleModal}
        title="Create"
        onSubmit={this.submitData}
        onChange={this.handleChange}
        onClick={this.submitData}
        buttonCaption="Create"
      />,

      <FormModal
        key="edit_modal"
        page="customers"
        show={this.state.isEditModalOpen}
        onHide={this.toggleEditModal}
        title="Edit"
        onSubmit={this.submitDataEdit}
        name={this.state.currentFormData.name}
        address={this.state.currentFormData.address}
        phone={this.state.currentFormData.phone}
        onChange={this.handleEditChange}
        onClick={this.submitDataEdit}
        buttonCaption="Edit"
      />,

      <DeleteModal
        key="delete_modal"
        show={this.state.isDeleteModalOpen}
        onHide={this.toggleDeleteModal}
        onClick={this.submitDataDelete}
      />
    ]

    return (
      <Layout title="Customers">
        {isFetching ? (
          <Loader />
        ) : (
          [
            <PageHeader key="header">
              <strong>Customers list</strong>{' '}
              <Button onClick={this.toggleModal}>Create</Button>
            </PageHeader>,
            <ContentTable
              key="content"
              type="customers"
              columns={['#', 'Name', 'Address', 'Phone']}
              items={customers}
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

CustomersPage.propTypes = {
  customers: PropTypes.array,
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isFetching: state.customers.isFetching,
  customers: state.customers.items
})

export default connect(mapStateToProps)(CustomersPage)
