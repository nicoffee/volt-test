import React from 'react'
import Header from './Header'
import DocumentTitle from 'react-document-title'
import { Grid } from 'react-bootstrap'

const Layout = ({ title, children }) => [
  <Header key="header" />,
  <DocumentTitle key="title" title={title}>
    <Grid>{children}</Grid>
  </DocumentTitle>
]

export default Layout
