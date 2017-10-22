import React, { Component } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => (
  <div>
    <h1>Invoice App</h1>
    <Link to="/products">Products</Link>
    <Link to="/customers">Customers</Link>
  </div>
);

export default IndexPage;
