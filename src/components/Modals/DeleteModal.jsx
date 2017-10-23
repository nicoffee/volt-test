import React, {Component} from 'react'
import {Modal, FormGroup,
  FormControl,
  ControlLabel,
  Button} from 'react-bootstrap'

const DeleteModal = ({show, onHide, onClick}) => (
  <Modal
    show={show}
    onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm delete</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure?
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="danger" onClick={onClick}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
)

export default DeleteModal

