import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CustomersPage from './CustomersPage'
import ProductsPage from './ProductsPage'
import IndexPage from './IndexPage'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router basename="/test-volt">
      <div>
        <Route exact path="/" component={IndexPage} />
        <Route path="/customers" component={CustomersPage} />
        <Route path="/products" component={ProductsPage} />
      </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
