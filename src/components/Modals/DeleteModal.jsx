import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

const DeleteModal = ({ show, onHide, onClick }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm delete</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure?</Modal.Body>
    <Modal.Footer>
      <Button bsStyle="danger" onClick={onClick}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
)

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default DeleteModal
