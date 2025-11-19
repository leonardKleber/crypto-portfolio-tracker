import React from 'react'
import '../styles/Table.css'

import { ReactComponent as CoinsIcon } from '../assets/icons/coins.svg'

export default function Table ({ table_data }) {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header-cell name-col">Name</th>
            <th className="table-header-cell">Amount</th>
            <th className="table-header-cell">Value</th>
            <th className="table-header-cell">Return</th>
            <th className="table-header-cell">Allocation</th>
          </tr>
        </thead>

        <tbody>
          {table_data.map((item, index) => (
            <tr key={index} className="table-body-row">
              <td className="table-cell">
                <CoinsIcon
                  style={{
                    width: '1rem',
                    height: '1rem',
                    fill: 'var(--accent-color-500)',
                    flexShrink: '0',
                    transform: 'translateY(3px)',
                    marginRight: '0.5rem'
                  }}
                />
                {item.name}
                </td>
              <td className="table-cell">{item.amount ? item.amount.toFixed(6) : '0'}</td>
              <td className="table-cell">{item.value ? item.value.toFixed(2) : '0'}€</td>
              <td className="table-cell">{item.unrealized_return ? item.unrealized_return.toFixed(2) : '0'}%</td>
              <td className="table-cell">{item.allocation ? item.allocation.toFixed(2) : '0'}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
