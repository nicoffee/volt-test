import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomersPage from "./CustomersPage";
import ProductsPage from "./ProductsPage";

const Root = ({store}) => (
  <Provider store={store}>
    <BrowserRouter basename='/test-volt'>
      <div>
        <Route path='/customers' component={CustomersPage}/>
        <Route path='/products' component={ProductsPage}/>
      </div>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
