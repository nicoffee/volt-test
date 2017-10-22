import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { fetchProducts, addProduct } from "../actions/products";
import uuid from "uuid";

class ProductsPage extends Component {
  constructor() {
    super();

    this.state = {
      isModalOpen: false,
      formData: {
        id: uuid(),
        name: null,
        price: null
      }
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.submitData = this.submitData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  submitData(e) {
    e.preventDefault();
    this.props.dispatch(addProduct(this.state.formData));
  }

  handleChange(e) {
    switch (e.target.name) {
      case 'name':
        this.setState({
          formData: {
            ...this.state.formData,
            name: e.target.value
          }
        });
        return;
      case 'price':
        this.setState({
          formData: {
            ...this.state.formData,
            price: e.target.value
          }
        });
        return;
    }
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    const { isFetching, products } = this.props;

    return isFetching ? (
      <span>Loading...</span>
    ) : (
      <div>
        <h1>Product list</h1>
        <button onClick={this.toggleModal}>Create</button>
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
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.items
});

export default connect(mapStateToProps)(ProductsPage);
