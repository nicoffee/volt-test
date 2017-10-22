import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { fetchCustomers } from "../actions";

class CustomersPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCustomers());
  }

  render() {
    const {isFetching, customers} = this.props;

    return isFetching ? (
      <span>Loading...</span>
    ) : (
      <div>
        <h1>Customer list</h1>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.customers.isFetching,
  customers: state.customers.items
});

export default connect(mapStateToProps)(CustomersPage);
