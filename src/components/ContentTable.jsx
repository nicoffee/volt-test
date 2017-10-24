import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

const ContentTable = ({ type, columns, items, onEditClick, onDeleteClick }) => (
  <Table>
    <thead>
      <tr>
        {columns.map((column, index) => <th key={index}>{column}</th>)}
        <th />
        <th />
      </tr>
    </thead>
    <tbody>
      {items.map((item, index) => (
        <tr key={index}>
          <td>{index}</td>
          <td>{item.name}</td>
          {type === 'products' && <td>{item.price}</td>}
          {type === 'customers' && [
            <td key="item_address">{item.address}</td>,
            <td key="item_phone">{item.phone}</td>
          ]}
          <td>
            <a href="#" onClick={e => onEditClick(e, item)}>
              edit
            </a>
          </td>
          <td>
            <a
              style={{ color: 'red' }}
              href="#"
              onClick={e => onDeleteClick(e, item)}>
              delete
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
)

ContentTable.propTypes = {
  type: PropTypes.string,
  columns: PropTypes.array,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  items: PropTypes.array.isRequired
}

export default ContentTable
