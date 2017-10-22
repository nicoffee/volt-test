import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { fetchProducts } from "../actions";

class ProductsPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  render() {
    const { isFetching, products } = this.props;

    return isFetching ? (
      <span>Loading...</span>
    ) : (
      <div>
        <h1>Product list</h1>
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
