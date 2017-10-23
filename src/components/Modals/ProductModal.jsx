import React, { Component } from 'react'
import {
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap'

const ProductModal = ({
  show,
  onHide,
  title,
  onClick,
  onSubmit,
  name,
  price,
  onChange,
  buttonCaption
}) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl
            value={name}
            name="name"
            type="text"
            placeholder="Enter name"
            onChange={onChange}
          />
          <FormGroup />
          <ControlLabel>Price</ControlLabel>
          <FormControl
            value={price}
            name="price"
            type="number"
            placeholder="Enter price"
            onChange={onChange}
          />
        </FormGroup>
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="success" onClick={onClick}>
        {buttonCaption}
      </Button>
    </Modal.Footer>
  </Modal>
)

export default ProductModal
