import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap'

const FormModal = ({
  page,
  show,
  onHide,
  title,
  onClick,
  onSubmit,
  name,
  price,
  address,
  phone,
  onChange,
  buttonCaption
}) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={onSubmit}>
        <FormGroup key="name">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            value={name}
            name="name"
            type="text"
            placeholder="Enter name"
            onChange={onChange}
          />
        </FormGroup>
        {page === 'products' && (
          <FormGroup>
            <ControlLabel>Price</ControlLabel>
            <FormControl
              value={price}
              name="price"
              type="number"
              placeholder="Enter price"
              onChange={onChange}
            />
          </FormGroup>
        )}
        {page === 'customers' && [
          <FormGroup key="address">
            <ControlLabel>Address</ControlLabel>
            <FormControl
              value={address}
              name="address"
              type="text"
              placeholder="Enter address"
              onChange={onChange}
            />
          </FormGroup>,
          <FormGroup key="phone">
            <ControlLabel>Phone</ControlLabel>
            <FormControl
              value={phone}
              name="phone"
              type="text"
              placeholder="Enter phone"
              onChange={onChange}
            />
          </FormGroup>
        ]}
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="success" onClick={onClick}>
        {buttonCaption}
      </Button>
    </Modal.Footer>
  </Modal>
)

FormModal.propTypes = {
  page: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  buttonCaption: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
}

export default FormModal
