import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <LinkContainer to="/">
          <span>Invoice App</span>
        </LinkContainer>
      </Navbar.Brand>
      <Nav bsStyle="pills">
        <LinkContainer to="/products">
          <NavItem>Products</NavItem>
        </LinkContainer>
        <LinkContainer to="/customers">
          <NavItem>Customers</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Header>
  </Navbar>
)

export default Header
