import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const IndexPage = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Invoice App</a>
      </Navbar.Brand>
      <Nav bsStyle="pills">
        <LinkContainer to="/products">
          <NavItem eventKey={1}>Products</NavItem>
        </LinkContainer>
        <LinkContainer to="/customers">
          <NavItem eventKey={2}>Customers</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Header>
  </Navbar>
)

export default IndexPage
